import React from "react";
import { useSelector } from "react-redux";

export function Characters({ chosenOne, setChosenOne, numbersNeeded }) {
  const currentPlayer = useSelector(state => state.game.currentPlayer);
  const handleClick = e => {
    setChosenOne((chosenOne = e.target.id));
  };

  return (
    <div id="karakterek">
      {numbersNeeded["1"] !== 0 ? (
        <img
          id="1"
          style={chosenOne === "1" ? { border: "2px solid black" } : null}
          src={currentPlayer==='red' ? "assets/pieces-S-R.jpg" : "assets/pieces-S-B.jpg"}
          alt="s-piros"
          onClick={handleClick}
        />
      ) : null}
      {numbersNeeded["2"] !== 0 ? (
        <img
          id="2"
          style={chosenOne === "2" ? { border: "2px solid black" } : null}
          src= {currentPlayer==='red' ? "assets/pieces-2-R.jpg" : "assets/pieces-2-B.jpg"}
          alt="2-piros"
          onClick={handleClick}
        />
      ) : null}
      {numbersNeeded["3"] !== 0 ? (
        <img
          id="3"
          style={chosenOne === "3" ? { border: "2px solid black" } : null}
          src= {currentPlayer==='red' ? "assets/pieces-3-R.jpg" : "assets/pieces-3-B.jpg"}
          alt="3-piros"
          onClick={handleClick}
        />
      ) : null}
      <br />
      {numbersNeeded["4"] !== 0 ? (
        <img
          id="4"
          style={chosenOne === "4" ? { border: "2px solid black" } : null}
          src= {currentPlayer==='red' ? "assets/pieces-4-R.jpg" : "assets/pieces-4-B.jpg"}
          alt="4-piros"
          onClick={handleClick}
        />
      ) : null}
      {numbersNeeded["5"] !== 0 ? (
        <img
          id="5"
          style={chosenOne === "5" ? { border: "2px solid black" } : null}
          src= {currentPlayer==='red' ? "assets/pieces-5-R.jpg" : "assets/pieces-5-B.jpg"}
          alt="5-piros"
          onClick={handleClick}
        />
      ) : null}
      {numbersNeeded["6"] !== 0 ? (
        <img
          id="6"
          style={chosenOne === "6" ? { border: "2px solid black" } : null}
          src= {currentPlayer==='red' ? "assets/pieces-6-R.jpg" : "assets/pieces-6-B.jpg"}
          alt="6-piros"
          onClick={handleClick}
        />
      ) : null}
      <br />
      {numbersNeeded["7"] !== 0 ? (
        <img
          id="7"
          style={chosenOne === "7" ? { border: "2px solid black" } : null}
          src= {currentPlayer==='red' ? "assets/pieces-7-R.jpg" : "assets/pieces-7-B.jpg"}
          alt="7-piros"
          onClick={handleClick}
        />
      ) : null}
      {numbersNeeded["8"] !== 0 ? (
        <img
          id="8"
          style={chosenOne === "8" ? { border: "2px solid black" } : null}
          src= {currentPlayer==='red' ? "assets/pieces-8-R.jpg" : "assets/pieces-8-B.jpg"}
          alt="8-piros"
          onClick={handleClick}
        />
      ) : null}
      {numbersNeeded["9"] !== 0 ? (
        <img
          id="9"
          style={chosenOne === "9" ? { border: "2px solid black" } : null}
          src= {currentPlayer==='red' ? "assets/pieces-9-R.jpg" : "assets/pieces-9-B.jpg"}
          alt="9-piros"
          onClick={handleClick}
        />
      ) : null}
      <br />
      {numbersNeeded["10"] !== 0 ? (
        <img
          id="10"
          style={chosenOne === "10" ? { border: "2px solid black" } : null}
          src= {currentPlayer==='red' ? "assets/pieces-1-R.jpg" : "assets/pieces-1-B.jpg"}
          alt="1-piros"
          onClick={handleClick}
        />
      ) : null}
      {numbersNeeded["0"] !== 0 ? (
        <img
          id="0"
          style={chosenOne === "0" ? { border: "2px solid black" } : null}
          src= {currentPlayer==='red' ? "assets/pieces-B-R.jpg" : "assets/pieces-B-B.jpg"}
          alt="b-piros"
          onClick={handleClick}
        />
      ) : null}
      {numbersNeeded["-1"] !== 0 ? (
        <img
          id="-1"
          style={chosenOne === "-1" ? { border: "2px solid black" } : null}
          src= {currentPlayer==='red' ? "assets/pieces-F-R.jpg" : "assets/pieces-F-B.jpg"}
          alt="f-piros"
          onClick={handleClick}
        />
      ) : null}
    </div>
  );
}
