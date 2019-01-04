import React from "react";

const timer = props => {
  let timeRemaining = props.timeRemaining;
  let seconds = timeRemaining % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  const minutes = ~~(timeRemaining / 60);
  return (
    <p>
      Time Left: {minutes}:{seconds}
    </p>
  );
};

export default timer;
