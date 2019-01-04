import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import fire from "./fire";
import InputBox from "./InputBox/InputBox";
import Button from "./Button/Button";
import PlayerList from "./PlayerList/PlayerList";
import GameList from "./GameList/GameList";
import Timer from "./Timer/Timer";

class App extends Component {
  state = {
    code: "",
    player: {
      id: "",
      name: ""
    },
    games: {
      AHDS: {
        started: false,
        players: [
          { id: "asda", name: "Stephen" },
          { id: "asdfd", name: "Sarah" },
          { id: "fgfsa", name: "Mike" },
          { id: "asdfdaa", name: "John" }
        ]
      },
      FAKE: {
        started: false,
        players: [
          { id: "asda", name: "Ivan" },
          { id: "asdfd", name: "Sera" },
          { id: "fgfsa", name: "Michel" },
          { id: "asdfdaa", name: "Johan" }
        ],
        timeRemaining: 480
      }
    },
    inGame: false
  };

  onNameChangeHandler = event => {
    const player = { ...this.state.player };
    player.name = event.target.value;
    this.setState({ player: player });
  };

  onCodeChangeHandler = event => {
    this.setState({ code: event.target.value.toUpperCase() });
  };

  joinGameHandler = (player, code) => {
    if (!player.name || !code) {
      return;
    }
    const games = { ...this.state.games };
    if (!games[code]) {
      games[code] = {
        started: false,
        players: []
      };
    }
    const players = games[code].players;
    players.push(player);
    this.setState({ games: games, inGame: true });
  };

  leaveGameHandler = (player, code) => {
    const games = { ...this.state.games };
    const players = games[code].players;
    players.splice(
      players.findIndex(p => {
        return p.id === player.id;
      }),
      1
    );
    if (players.length === 0) {
      this.endGameHandler(code);
      delete games[code];
    }
    this.setState({ games: games, inGame: false });
  };

  startGameHandler = code => {
    const games = { ...this.state.games };
    games[code].started = true;
    games[code].timeRemaining = 480;
    games[code].interval = setInterval(() => {
      console.log(games);
      games[code].timeRemaining--;
      this.setState({ games: games });
    }, 1000);
    console.log("Starting Game:", code);
    this.setState({ games: games });
  };

  endGameHandler = code => {
    const games = { ...this.state.games };
    games[code].started = false;
    clearInterval(games[code].interval);
    console.log("Ending Game:", code);
    this.setState({ games: games });
  };

  selectGameHandler = code => {
    this.setState({ code: code });
    this.joinGameHandler(this.state.player, code);
  };

  render() {
    let name = null;
    let code = null;
    let joinGame = null;
    let leaveGame = null;
    let players = null;
    let games = null;
    let startGame = null;
    let endGame = null;
    let timer = null;
    if (!this.state.inGame) {
      name = (
        <InputBox
          label="name"
          value={this.state.player.name}
          change={this.onNameChangeHandler}
        />
      );
      code = (
        <InputBox
          label="code"
          value={this.state.code}
          change={this.onCodeChangeHandler}
        />
      );
      joinGame = (
        <Button
          label="Join Game"
          click={() => this.joinGameHandler(this.state.player, this.state.code)}
        />
      );
      games = (
        <GameList
          code={this.state.code}
          click={this.selectGameHandler}
          games={Object.keys(this.state.games)}
        />
      );
    } else {
      name = (
        <div>
          <p>Name: </p>
          <p>{this.state.player.name}</p>
        </div>
      );
      code = (
        <div>
          <p>Code: </p>
          <p>{this.state.code}</p>
        </div>
      );
      leaveGame = (
        <Button
          label="Leave Game"
          click={() =>
            this.leaveGameHandler(this.state.player, this.state.code)
          }
        />
      );
      if (this.state.games[this.state.code]) {
        if (!this.state.games[this.state.code].started) {
          startGame = (
            <Button
              label="Start Game"
              click={() => this.startGameHandler(this.state.code)}
            />
          );
        } else {
          timer = (
            <Timer
              timeRemaining={this.state.games[this.state.code].timeRemaining}
            />
          );
          endGame = (
            <Button
              label="End Game"
              click={() => this.endGameHandler(this.state.code)}
            />
          );
        }
        players = (
          <PlayerList players={this.state.games[this.state.code].players} />
        );
      }
    }

    return (
      <div className="App">
        <img src={logo} className="spin" alt="logo" />
        {code}
        {name}
        {joinGame}
        {startGame}
        {endGame}
        {leaveGame}
        {timer}
        {players}
        {games}
      </div>
    );
  }
}

export default App;
