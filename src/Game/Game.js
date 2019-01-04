import React from "react";

const game = props => {
  return <p onClick={() => props.click(props.code)}>{props.code}</p>;
};

export default game;
