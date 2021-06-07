require("dotenv").config();
const mysql = require("mysql");
const fs = require("fs");
const util = require("util");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  multipleStatements: true,
});

const query = util.promisify(db.query).bind(db);

const createDatabase = async () => {
  db.beginTransaction();
  let dbQuery = `CREATE DATABASE IF NOT EXISTS book_collection;`;
  dbQuery += `USE book_collection;`;

  dbQuery += `CREATE TABLE IF NOT EXISTS authors(
    id int AUTO_INCREMENT NOT NULL,
    name VARCHAR(255),
    PRIMARY KEY(id));`;
  dbQuery += `CREATE TABLE IF NOT EXISTS books(
    id int AUTO_INCREMENT NOT NULL,
    author_id int NOT NULL,
    title VARCHAR(255),
    description MEDIUMTEXT,
    deleted INT(11) NOT NULL DEFAULT(0),
    PRIMARY KEY(id),
    FOREIGN KEY(author_id) REFERENCES authors(id));`;

  let jsonData = fs.readFileSync(__dirname + "/" + "books.json");
  let bookData = JSON.parse(jsonData);
  let insertQuery = "";
  bookData.forEach((data, index) => {
    insertQuery += `INSERT INTO authors(id, name) VALUES(${index + 1}, "${
      data.author
    }");`;
    insertQuery += `INSERT INTO books(author_id, title, description) VALUES(${
      index + 1
    }, "${data.title}", "${data.description}");`;
  });
  dbQuery += insertQuery;

  await query(dbQuery);
  db.commit((error) => {
    if (error) {
      return db.rollback(() => {
        throw error;
      });
    }
  });
  return true;
};

(async () => {
  try {
    process.argv.forEach((param) => {
      if (param === "reset") {
        query("DROP DATABASE IF EXISTS book_collection", (error) => {
          if (error) {
            throw error;
          }
        });
      }
    });
    await createDatabase();
  } finally {
    console.log("Database ready");
    db.end();
  }
})();
