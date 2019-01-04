import React from "react";
import Player from "../Player/Player";

const playerList = props => {
  return (
    <div>
      {props.players.map(player => {
        return <Player key={player.id} name={player.name} />;
      })}
    </div>
  );
};

export default playerList;
