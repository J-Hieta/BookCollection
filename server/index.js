const express = require("express");
const app = express();
const fs = require("fs");
require("dotenv").config();
const mysql = require("mysql");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const util = require("util");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "book_collection",
  multipleStatements: true,
});

const query = util.promisify(db.query).bind(db);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const getBookList = (res) => {
  db.query(
    "SELECT b.*, a.id AS author_id, a.name AS author FROM books b JOIN authors a ON b.author_id = a.id WHERE b.deleted = 0",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
};

app.get("/bookList", (req, res) => {
  getBookList(res);
});

app.post("/save", (req, res) => {
  if (req.body.id) {
    db.query(
      "UPDATE books SET title = ?, description = ? WHERE id = ?",
      [req.body.title, req.body.description, req.body.id],
      (error, result) => {
        if (error) throw error;
      }
    );
    db.query("UPDATE authors SET name = ? WHERE id = ?", [
      req.body.author,
      req.body.author_id,
    ]);
  }
  getBookList(res);
});

const getAuthorByName = async (name, callback) => {
  await query(
    "SELECT id FROM authors WHERE name=?",
    [name],
    (error, result) => {
      if (error) throw error;
      return callback(result);
    }
  );
};

const insertNewBook = async (values, callback) => {
  await query(
    "INSERT INTO books(title, description, author_id) VALUES(?,?,?)",
    [values[0].title, values[0].description, values[0].author_id],
    (error, result) => {
      if (error) throw error;
      return callback(result);
    }
  );
};

const insertNewAuthor = async (name, callback) => {
  await query(
    "INSERT INTO authors (name) VALUES(?)",
    [name],
    (error, result) => {
      if (error) throw error;
      return callback(result);
    }
  );
};

app.post("/saveNew", async (req, res) => {
  if (req.body) {
    await getAuthorByName(req.body.author, async (result) => {
      if (Array.isArray(result) && result.length) {
        await insertNewBook(
          [
            {
              title: req.body.title,
              description: req.body.description,
              author_id: result[0].id,
            },
          ],
          (result) => {
            res.send("ok");
          }
        );
      } else {
        await insertNewAuthor(req.body.author, (result) => {
          const values = [
            {
              title: req.body.title,
              description: req.body.description,
              author_id: result.insertId,
            },
          ];
          insertNewBook(values, (result) => {
            res.send("ok");
          });
        });
      }
    });
  }
});

app.post("/delete", (req, res) => {
  if (req.body.book_id) {
    query(
      "UPDATE books SET deleted = ? WHERE id = ?",
      [Math.floor(Date.now() / 1000), req.body.book_id],
      (error) => {
        if (error) throw error;
      }
    );
    getBookList(res);
  }
});

const server = app.listen(4000, () => {
  const port = server.address().port;
  console.log("Listening to port", port);
});
