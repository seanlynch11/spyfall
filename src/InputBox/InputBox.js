import React from "react";

const inputBox = props => {
  return (
    <div>
      <p>Enter {props.label}:</p>
      <input type="text" value={props.value} onChange={props.change} />
    </div>
  );
};

export default inputBox;
