import * as React from "react";

const AuthorBar = (props) => {
  return (
    <div className="Author-container">
      <p>Author</p>
      <input
        type="text"
        name="author"
        key={props.author}
        defaultValue={props.author || ""}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </div>
  );
};

export default AuthorBar;
