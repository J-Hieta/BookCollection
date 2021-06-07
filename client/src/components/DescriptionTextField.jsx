import * as React from "react";

const DescriptionTextField = (props) => {
  return (
    <div>
      <p>Description</p>
      <textarea
        key={props.description}
        defaultValue={props.description || ""}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </div>
  );
};

export default DescriptionTextField;
