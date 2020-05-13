import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  placeCharacter,
  removeCharacter,
  move,
  nextPlayer,
  fightComes,
  blueDead,
  redDead,
  showPossibilities,
  removeSelections
} from "../state/actions";

export function atugorElemet(cell1, cell2, board) {
  if (cell2.x !== cell1.x) {
    if (cell2.x > cell1.x) {
      let c = board[cell1.x + 1][cell1.y];
      while (c.x !== cell2.x) {
        if (c.placedNumber != null || c.isLake) {
          return true;
        }
        c = board[c.x + 1][c.y];
      }
    } else {
      let c = board[cell1.x - 1][cell1.y];
      while (c.x !== cell2.x) {
        if (c.placedNumber != null || c.isLake) {
          return true;
        }
        c = board[c.x - 1][c.y];
      }
    }
  } else {
    if (cell2.y > cell1.y) {
      let c = board[cell1.x][cell1.y + 1];
      while (c.y !== cell2.y) {
        if (c.placedNumber != null || c.isLake) {
          return true;
        }
        c = board[c.x][c.y + 1];
      }
    } else {
      let c = board[cell1.x][cell1.y - 1];
      while (c.y !== cell2.y) {
        if (c.placedNumber != null || c.isLake) {
          return true;
        }
        c = board[c.x][c.y - 1];
      }
    }
  }
  return false;
}

export function Board({
  numbersNeeded,
  setNumbersNeeded,
  setDisableButton,
  disableButton,
  chosenOne,
  setChosenOne,
  placedCharacterNumber,
  setPlacedCharacterNumber
}) {
  const gameState = useSelector(state => state.gameState);
  const board = useSelector(state => state.game.board);
  const activePlayer = useSelector(state => state.game.activePlayer);
  const dispatch = useDispatch();
  const [selectedForMoving, setSelectedForMoving] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  let harc = false;
  const [jelenit, setJelenit] = useState(false);
  const [goal, setGoal] = useState(null);
  const [firstFighter, setFirstFighter] = useState(-2);
  const [secondFighter, setSecondFighter] = useState(-2);
  const [winner, setWinner] = useState(null);

  // valahol fel kellene használni
  // az új board nem elérhető csak következő rerenderkor ezért nem tudom ezt vizsgálni :(
  function nemMaradtLepo() {
    for (let i = 0; i < board.length; ++i) {
      let row = board[i];
      for (let j = 0; j < row.length; ++j) {
        if (
          board[i][j].color != null &&
          board[i][j].color === activePlayer &&
          board[i][j].placedNumber !== -1 &&
          board[i][j].placedNumber !== 0
        ) {
          console.log(board[i][j]);
          return false;
        }
      }
    }

    return true;
  }

  if (nemMaradtLepo() && gameState === "IN_GAME" && !isGameOver) {
    console.log("nem maradt lépő");
    setIsGameOver(true);
    let winner = activePlayer === "red" ? "kék" : "piros";
    setWinner(winner);
    // elérhetővé válik a vissza gomb
  }

  // useEffect
  useEffect(() => {
    if (selectedForMoving) {
      setFirstFighter(selectedForMoving.placedNumber);
    }
    if (goal) {
      setSecondFighter(goal.placedNumber);
    }
  }, [jelenit, selectedForMoving, goal]);

  function calculateBackground(cell) {
    if (cell.placedNumber != null) {
      if (cell.color !== activePlayer) {
        if (cell.color === "blue") {
          return "assets/Blue.jpg";
        } else {
          return "assets/Red.jpg";
        }
      }
      if (cell.placedNumber === 10) {
        if (cell.color === "blue") {
          return "assets/pieces-1-B.jpg";
        }
        return "assets/pieces-1-R.jpg";
      } else if (cell.placedNumber === 2) {
        if (cell.color === "blue") {
          return "assets/pieces-2-B.jpg";
        }
        return "assets/pieces-2-R.jpg";
      } else if (cell.placedNumber === 3) {
        if (cell.color === "blue") {
          return "assets/pieces-3-B.jpg";
        }
        return "assets/pieces-3-R.jpg";
      } else if (cell.placedNumber === 4) {
        if (cell.color === "blue") {
          return "assets/pieces-4-B.jpg";
        }
        return "assets/pieces-4-R.jpg";
      } else if (cell.placedNumber === 5) {
        if (cell.color === "blue") {
          return "assets/pieces-5-B.jpg";
        }
        return "assets/pieces-5-R.jpg";
      } else if (cell.placedNumber === 6) {
        if (cell.color === "blue") {
          return "assets/pieces-6-B.jpg";
        }
        return "assets/pieces-6-R.jpg";
      } else if (cell.placedNumber === 7) {
        if (cell.color === "blue") {
          return "assets/pieces-7-B.jpg";
        }
        return "assets/pieces-7-R.jpg";
      } else if (cell.placedNumber === 8) {
        if (cell.color === "blue") {
          return "assets/pieces-8-B.jpg";
        }
        return "assets/pieces-8-R.jpg";
      } else if (cell.placedNumber === 9) {
        if (cell.color === "blue") {
          return "assets/pieces-9-B.jpg";
        }
        return "assets/pieces-9-R.jpg";
      } else if (cell.placedNumber === -1) {
        if (cell.color === "blue") {
          return "assets/pieces-F-B.jpg";
        }
        return "assets/pieces-F-R.jpg";
      } else if (cell.placedNumber === 1) {
        if (cell.color === "blue") {
          return "assets/pieces-S-B.jpg";
        }
        return "assets/pieces-S-R.jpg";
      } else if (cell.placedNumber === 0) {
        if (cell.color === "blue") {
          return "assets/pieces-B-B.jpg";
        }
        return "assets/pieces-B-R.jpg";
      }
    } else {
      return null;
    }
  }

  function handleTdClick(e) {
    // ha még nincs háttere akkor lehelyezzük
    if (isGameOver) {
      return;
    }
    let x = e.target.closest("tr").rowIndex;
    let y = e.target.cellIndex;
    let cell = board[x][y];
    if (chosenOne != null && cell.placedNumber == null) {
      if (cell.x < 6) {
        return;
      }
      setNumbersNeeded({
        ...numbersNeeded,
        ["" + chosenOne]: numbersNeeded["" + chosenOne] - 1
      });
      dispatch(placeCharacter(x, y, parseInt(chosenOne)));
      console.log(x, y, parseInt(chosenOne));
      setChosenOne((chosenOne = null));
      setPlacedCharacterNumber(
        (placedCharacterNumber = placedCharacterNumber + 1)
      );
      if (placedCharacterNumber === 40) {
        setDisableButton((disableButton = false));
      }
    } else if (gameState === "PREPARE_GAME") {
      console.log("levevés");
      setNumbersNeeded({
        ...numbersNeeded,
        ["" + cell.placedNumber]: numbersNeeded["" + cell.placedNumber] + 1
      });
      setPlacedCharacterNumber(
        (placedCharacterNumber = placedCharacterNumber - 1)
      );
      // TODO: gomb állítása!
      if (placedCharacterNumber < 40) {
        setDisableButton((disableButton = true));
      }
      dispatch(removeCharacter(x, y));
    } else if (gameState === "IN_GAME") {
      if (cell.color !== activePlayer && selectedForMoving == null) {
        return;
      }
      if (
        cell.placedNumber != null &&
        cell.placedNumber !== 0 &&
        cell.placedNumber !== -1 &&
        selectedForMoving == null
      ) {
        // ki fog lépni
        setSelectedForMoving(cell);
        dispatch(showPossibilities(cell));
      } else if (selectedForMoving == null) {
        return;
      } else {
        // lépjen
        if (
          cell.isLake ||
          (cell.color === selectedForMoving.color &&
            (cell.x !== selectedForMoving.x || cell.y !== selectedForMoving.y))
        ) {
          return;
        }
        if (cell.x === selectedForMoving.x && cell.y === selectedForMoving.y) {
          setSelectedForMoving(null);
          dispatch(removeSelections());
          return;
        }
        if (
          selectedForMoving.placedNumber !== 2 &&
          !(
            (cell.x === selectedForMoving.x &&
              cell.y === selectedForMoving.y - 1) ||
            (cell.x === selectedForMoving.x &&
              cell.y === selectedForMoving.y + 1) ||
            (cell.y === selectedForMoving.y &&
              cell.x === selectedForMoving.x + 1) ||
            (cell.y === selectedForMoving.y &&
              cell.x === selectedForMoving.x - 1)
          )
        ) {
          return;
        }
        // 2-es sem léphet átlóban
        if (
          selectedForMoving.placedNumber === 2 &&
          !(cell.x === selectedForMoving.x || cell.y === selectedForMoving.y)
        ) {
          return;
        }
        // 2-es nem ugorhat át elemeket
        if (
          selectedForMoving.placedNumber === 2 &&
          atugorElemet(selectedForMoving, cell, board)
        ) {
          return;
        }

        if (
          (selectedForMoving.color === "red" && cell.color === "blue") ||
          (selectedForMoving.color === "blue" && cell.color === "red")
        ) {
          harc = true;
          console.log("harc lesz");
        } else {
          harc = false;
        }
        // itt kell megjeleniteni a harcosok számát majd 3ms múlva hivni s dispatch-et
        if (harc) {
          setGoal(cell);
          setJelenit(true);
          console.log("harc van");
          let stronger = null;
          let weaker = null;
          if (cell.placedNumber === 0 && selectedForMoving.placedNumber === 3) {
            stronger = selectedForMoving;
            weaker = cell;
          } else if (
            cell.placedNumber === 0 &&
            selectedForMoving.placedNumber !== 3
          ) {
            stronger = cell;
            weaker = selectedForMoving;
          } else if (
            cell.placedNumber === 10 &&
            selectedForMoving.placedNumber === 1
          ) {
            stronger = selectedForMoving;
            weaker = cell;
          } else if (selectedForMoving.placedNumber > cell.placedNumber) {
            stronger = selectedForMoving;
            weaker = cell;
          } else if (selectedForMoving.placedNumber < cell.placedNumber) {
            stronger = cell;
            weaker = selectedForMoving;
          }
          // ha placedNumber mindenhol -1 és 0 akkor is nyert
          if (weaker && weaker.placedNumber === -1) {
            let winner = stronger.color === "red" ? "piros" : "kék";
            setTimeout(() => {
              setWinner(winner);
              setJelenit(false);
              setSelectedForMoving(null);
              setIsGameOver(true);
            }, 1000);
            // elérhetővé válik a vissza gomb
            return;
          }
          // csata az erősebbet kell megadnom
          // de lesz olyan hogy mindkettőt le kell venni, akkor egy nullos placedNumbert kell megadjak
          setTimeout(() => {
            dispatch(fightComes(selectedForMoving, cell));
            setSelectedForMoving(null);
            dispatch(nextPlayer(activePlayer));
            harc = false;
            setJelenit(false);
            // kell szólni hogy levevődött egy bábu vagy kettő
            if (stronger === null) {
              // mindkettő meghal
              if (activePlayer === "red") {
                dispatch(blueDead(cell));
                dispatch(redDead(selectedForMoving));
              } else {
                dispatch(blueDead(selectedForMoving));
                dispatch(redDead(cell));
              }
            } else {
              if (stronger.color === "red") {
                dispatch(blueDead(weaker));
              } else {
                dispatch(redDead(weaker));
              }
            }
          }, 3000);
          console.log("Harcosok");
          console.log(selectedForMoving.placedNumber);
          console.log(cell.placedNumber);
          // meg kell őket jeleníteni
        } else {
          dispatch(move(selectedForMoving, cell));
          setSelectedForMoving(null);
          dispatch(nextPlayer(activePlayer));
        }
      }
    }
  }

  let rows = board.map((row, index) => {
    let r = row.map((cell, index) => {
      return (
        <td
          style={ gameState==='PREPARE_GAME' && cell.x>=6 ? {border: "2px solid brown", borderCollapse: "collapse", margin: 0, padding: 0} : 
          gameState==='IN_GAME' && cell.border ? {backgroundColor: "#F0E68C"} : null}
          background={cell.border? {backgroundColor: "#F0E68C"} : calculateBackground(cell)}
          key={index}
          onClick={handleTdClick}
        />
      );
    });
    return <tr key={index}>{r}</tr>;
  });
  return (
    <div
      className="ui center aligned container"
      style={{ height: "572px", width: "572px" }}
    >
      <table
        background="assets/plateau.png"
        style={{ height: "572px", width: "572px",  borderCollapse: "collapse" }}
      >
        <tbody>{rows}</tbody>
      </table>
      <br />
      {selectedForMoving ? (
        <output
          style={activePlayer === "red" ? { color: "red" } : { color: "blue" }}
        >
          Lépésre választott: {selectedForMoving.placedNumber}{" "}
        </output>
      ) : null}
      <br />
      {jelenit ? (
        <p style={{ fontSize: "30px" }}>
          <b>
            {" "}
            HARC:{" "}
            <span
              style={
                activePlayer === "red" ? { color: "red" } : { color: "blue" }
              }
            >
              {firstFighter !== 0 && firstFighter !== -1
                ? firstFighter
                : firstFighter === 0
                ? "bomba"
                : "zászló"}
            </span>{" "}
            VS{" "}
            <span
              style={
                activePlayer === "red" ? { color: "blue" } : { color: "red" }
              }
            >
              {secondFighter !== 0 && secondFighter !== -1
                ? secondFighter
                : secondFighter === 0
                ? "bomba"
                : "zászló"}
            </span>{" "}
          </b>
        </p>
      ) : null}
      {winner !== null ? (
        <p
          style={
            winner === "kék"
              ? { color: "blue", fontSize: "30px", fontWeight: "bold" }
              : { color: "red", fontSize: "30px", fontWeight: "bold" }
          }
        >
          Nyert a {winner}!
        </p>
      ) : null}
    </div>
  );
}
