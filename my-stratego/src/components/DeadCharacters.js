import React from "react";
import { useSelector } from "react-redux";

export function DeadCharacters() {
  const blueDeadEnemies = useSelector(state => state.game.blueDead);
  const redDeadEnemies = useSelector(state => state.game.redDead);
  const currentPlayer = useSelector(state => state.game.currentPlayer);

  function calculateBackground(cell) {
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
  }

  function getBlueList() {
    let ps = blueDeadEnemies.map((enemy,index) => (
      <img key={enemy.id+index} src={calculateBackground(enemy)} alt="" />
    ));
    return ps;
  }

  function getRedList() {
    let ps = redDeadEnemies.map((enemy,index) => (
      <img key={enemy.id+index} src={calculateBackground(enemy)} alt="" />
    ));
    return ps;
  }

  
  if(currentPlayer==='red'){
      return (
        <> 
            <div style={{ fontSize: "30px" }}>
              <span style={{ color: "blue" }}>Kék</span> levett bábúi:
              <br />
              <br />
              {getBlueList()}
            </div>
        </>
      );
    }
    else 
      return (
        <>
        <div style={{ fontSize: "30px" }}>
          <span style={{ color: "red" }}>Piros</span> levett bábúi:
          <br />
          <br />
          {getRedList()}
        </div>
        </>
    );
}
