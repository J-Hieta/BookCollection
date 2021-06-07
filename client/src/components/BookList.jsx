import React from "react";

const BookList = (props) => {
  return (
    <div className="BookList-container">
      <ul className="BookList">
        {props.books.map((book) => {
          return (
            <li key={book.id}>
              <button
                className="BookButton"
                onClick={() => props.onClick(book)}
              >
                {book.title}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookList;
