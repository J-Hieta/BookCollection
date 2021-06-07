import "./App.css";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import { React, useEffect, useState } from "react";
import axios from "axios";
require("dotenv").config();

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [books, setBooks] = useState([
    { title: "", author: "", description: "", id: "" },
  ]);

  const [activeBook, setActiveBook] = useState({
    title: "",
    author: "",
    description: "",
    id: "",
    author_id: "",
  });

  const [bookFormTitle, setBookFormTitle] = useState(activeBook.title);
  const [bookFormAuthor, setBookFormAuthor] = useState(activeBook.author);
  const [bookFormDescription, setBookFormDescription] = useState(
    activeBook.description
  );
  const handleSaveNew = (event) => {
    event.preventDefault();
    console.log(activeBook);
    console.log(bookFormTitle);
    console.log(bookFormAuthor);
    console.log(bookFormDescription);
    axios
      .post("/saveNew", {
        title: bookFormTitle ? bookFormTitle : activeBook.title,
        author: bookFormAuthor ? bookFormAuthor : activeBook.author,
        description: bookFormDescription
          ? bookFormDescription
          : activeBook.description,
      })
      .then((res) => {
        console.log(res);
        setLoaded(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSave = (event) => {
    event.preventDefault();
    axios
      .post("/save", {
        title: bookFormTitle ? bookFormTitle : activeBook.title,
        author: bookFormAuthor ? bookFormAuthor : activeBook.author,
        description: bookFormDescription
          ? bookFormDescription
          : activeBook.description,
        id: activeBook.id,
        author_id: activeBook.author_id,
      })
      .then((result) => {
        setLoaded(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    axios
      .post("/delete", {
        book_id: activeBook.id,
      })
      .then((result) => {
        setLoaded(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickEvent = (event) => {
    switch (event.target.value) {
      case "delete":
        handleDelete(event);
        break;
      case "saveNew":
        handleSaveNew(event);
        break;
      case "save":
        handleSave(event);
        break;
    }
  };
  const handleBooklistClick = (book) => {
    setActiveBook(book);
    setBookFormTitle(book.title);
    setBookFormAuthor(book.author);
    setBookFormDescription(book.description);
  };
  useEffect(() => {
    if (!loaded) {
      fetch("/bookList")
        .then((res) => res.json())
        .then((result) => {
          setBooks(result);
          console.log(result);
          setLoaded(true);
        });
    }
  });
  return (
    <div className="App">
      <BookForm
        activeBook={activeBook}
        bookFormTitle={(bookFormTitle) => setBookFormTitle(bookFormTitle)}
        bookFormAuthor={(bookFormAuthor) => setBookFormAuthor(bookFormAuthor)}
        bookFormDescription={(bookFormDescription) =>
          setBookFormDescription(bookFormDescription)
        }
        onClick={(event) => {
          handleClickEvent(event);
        }}
      />
      <BookList books={books} onClick={(book) => handleBooklistClick(book)} />
    </div>
  );
};

export default App;
