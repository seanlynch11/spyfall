import React from "react";
import Game from "../Game/Game";

const gameList = props => {
  return (
    <div>
      <p>Game List:</p>
      {props.games.map(key => {
        if (key.includes(props.code)) {
          return <Game click={props.click} key={key} code={key} />;
        }
        return null;
      })}
    </div>
  );
};

export default gameList;
