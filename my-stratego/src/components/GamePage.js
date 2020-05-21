import React from "react";
import { DeadCharacters } from "./DeadCharacters";
import { Board } from "./Board";
import { useDispatch } from "react-redux";
import { resetBoard, changeState } from "../state/actions";
import { useSelector } from "react-redux";
import socket from "../socket";

export function GamePage() {
  const dispatch = useDispatch();
  const activePlayer = useSelector(state => state.game.activePlayer);
  const gameState = useSelector(state => state.gameState);

  socket.on('player-left', function(answer){
    console.log(answer);
    dispatch(resetBoard());
    dispatch(changeState('MAIN_PAGE'));
  });

  return (
    <>
      <div
        className="ui container"
        style={{
          width: "960px",
          height: "800px",
          backgroundColor: "rgb(242,234,212)"
        }}
      >
        <div className="ui grid">
          <div className="eleven wide column">
            <h1>Játékoldal</h1>
            <div style={{ fontSize: "30px" }}>
              {activePlayer === "blue" ? (
                <span style={{ color: "blue" }}>Kék</span>
              ) : (
                <span style={{ color: "red" }}>Piros</span>
              )}{" "}
              következik
            </div>
            <br />
            <Board state={gameState} />
          </div>
          <br />
          <div className="five wide middle aligned column">
            <DeadCharacters />
            <br />
            <button
              className="ui red basic button"
              id="vissza_fooldal"
              onClick={() => {
                socket.emit('leave-room', function(answer){
                  console.log(answer);
                });
                dispatch(resetBoard());
                dispatch(changeState('MAIN_PAGE'));
              }}
            >
              Vissza a főoldalra
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
