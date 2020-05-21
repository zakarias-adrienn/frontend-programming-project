import React, { useState } from "react";
import { Characters } from "./Characters";
import { Board } from "./Board";
import { useDispatch, useSelector } from "react-redux";
import { startPlay, changeState } from "../state/actions";

export function PreparingArea({ socket}) {
  const gameState = useSelector(state => state.gameState);
  const board = useSelector(state => state.game.board);
  const room_number = useSelector(state => state.game.room_number);
  const [chosenCharacter, setChosenCharacter] = useState(null);
  const [placedCharacterNumber, setPlacedCharacterNumber] = useState(0);
  const [disableButton, setDisableButton] = useState(true);
  const dispatch = useDispatch();
  let initialNumbers = {
    "-1": 1,
    "10": 1,
    "9": 1,
    "8": 2,
    "7": 3,
    "6": 4,
    "5": 4,
    "4": 4,
    "3": 5,
    "2": 8,
    "1": 1,
    "0": 6
  };
  const [numbersNeeded, setNumbersNeeded] = useState(initialNumbers);

 

  return (
    <>
      <div
        className="ui container"
        style={{ width: "960px", backgroundColor: "rgb(242,234,212)" }}
      >
        <h1>Előkészítő szoba</h1>
        <div className="ui grid">
          <div className="ten wide middle aligned column">
            <Board
              socket={socket}
              numbersNeeded={numbersNeeded}
              setNumbersNeeded={setNumbersNeeded}
              state={gameState}
              disableButton={disableButton}
              setDisableButton={setDisableButton}
              chosenOne={chosenCharacter}
              setChosenOne={setChosenCharacter}
              placedCharacterNumber={placedCharacterNumber}
              setPlacedCharacterNumber={setPlacedCharacterNumber}
            />
          </div>
          <div className="six wide right middle aligned column">
            <h2>Helyezd fel a karaktereidet a táblára!</h2>
            <h2>
              Levevéshez kattints egy már felhelyezett karakterre a táblán.
            </h2>
            <Characters
              numbersNeeded={numbersNeeded}
              chosenOne={chosenCharacter}
              setChosenOne={setChosenCharacter}
            />
            <br />
            <button
              disabled={disableButton}
              className="ui red basic button"
              id="kesz"
              onClick={() => {
                // socket.emit('sync-state', room_number, board, true, function(answer){
                //   console.log(answer);
                // });
                // dispatch(changeState('IN_GAME'));
                // dispatch(startPlay());
              }}
            >
              Kész, kezdődhet a játék
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
