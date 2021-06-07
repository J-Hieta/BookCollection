import React from "react";

const TitleBar = (props) => {
  return (
    <div>
      <p>Title</p>
      <input
        type="text"
        name="title"
        id="title"
        key={props.title}
        defaultValue={props.title || ""}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </div>
  );
};

export default TitleBar;
