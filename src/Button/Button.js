import React from "react";

const button = props => {
  return (
    <div>
      <button onClick={props.click}>{props.label}</button>
    </div>
  );
};

export default button;
