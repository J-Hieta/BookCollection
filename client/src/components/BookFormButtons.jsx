import * as React from "react";

const BookFormButtons = (props) => {
  return (
    <div>
      <button value="saveNew" onClick={(event) => props.onClick(event)}>
        Save new
      </button>
      <button value="save" onClick={(event) => props.onClick(event)}>
        Save
      </button>
      <button value="delete" onClick={(event) => props.onClick(event)}>
        Delete
      </button>
    </div>
  );
};

export default BookFormButtons;
