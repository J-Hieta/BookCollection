import { React } from "react";
import TitleBar from "./TitleBar";
import AuthorBar from "./AuthorBar";
import DescriptionTextField from "./DescriptionTextField";
import BookFormButtons from "./BookFormButtons";

const BookForm = ({
  activeBook,
  onClick,
  bookFormTitle,
  bookFormAuthor,
  bookFormDescription,
}) => {
  return (
    <div className="BookForm">
      <form>
        <TitleBar
          title={activeBook.title}
          onChange={(value) => bookFormTitle(value)}
        />
        <AuthorBar
          author={activeBook.author}
          onChange={(value) => bookFormAuthor(value)}
        />
        <DescriptionTextField
          description={activeBook.description}
          onChange={(value) => bookFormDescription(value)}
        />
        <BookFormButtons
          activeBook={activeBook}
          bookFormTitle={bookFormTitle}
          bookFormAuthor={bookFormAuthor}
          bookFormDescription={bookFormDescription}
          onClick={(event) => onClick(event)}
        />
      </form>
    </div>
  );
};

export default BookForm;
