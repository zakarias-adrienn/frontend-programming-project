import { atugorElemet } from '../components/Board.js';

export const PLACE_CHARACTER = "PLACE_CHARACTER";
export const REMOVE_CHARACTER = "REMOVE_CHARACTER";
export const START_PLAY = "START_PLAY";
export const MOVE_CHARACTER = "MOVE_CHARACTER";
export const NEXT_PLAYER = "NEXT_PLAYER";
export const FIGHT_COMES = "FIGHT_COMES";
export const BLUE_DEAD = "BLUE_DEAD";
export const RED_DEAD = "RED_DEAD";
export const CHANGE_STATE = 'CHANGE_STATE';
export const SHOW_POSSIBILITIES = 'SHOW_POSSIBILITIES';
export const REMOVE_SELECTIONS = 'REMOVE_SELECTIONS';
export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';
export const SET_ROOM_NUMBER = 'SET_ROOM_NUMBER';

export const setRoomNumber = (number) => ({
  type: SET_ROOM_NUMBER,
  payload: number
});

export const placeCharacter = (x, y, id, color) => ({
  type: PLACE_CHARACTER,
  payload: { x, y, id, color }
});

export const setCurrentPlayer = (color) => ({
  type: SET_CURRENT_PLAYER,
  payload: color
});

export const removeSelections = () => ({
  type: REMOVE_SELECTIONS,
  payload: null
});

export const changeState = (newState) => ({
  type: CHANGE_STATE,
  payload: newState
});

export const showPossibilities = (cell) => ({
  type: SHOW_POSSIBILITIES,
  payload: cell
});

export const nextPlayer = activePlayer => ({
  type: NEXT_PLAYER,
  payload: activePlayer
});

export const removeCharacter = (x, y) => ({
  type: REMOVE_CHARACTER,
  payload: { x, y }
});

export const fightComes = (cell1, cell2) => ({
  type: FIGHT_COMES,
  payload: { cell1, cell2 }
});

export const blueDead = cell => ({
  type: BLUE_DEAD,
  payload: cell
});

export const redDead = cell => ({
  type: RED_DEAD,
  payload: cell
});

export const startPlay = () => ({
  type: START_PLAY,
  payload: null
});

export const move = (cell1, cell2) => ({
  type: MOVE_CHARACTER,
  payload: { cell1, cell2 }
});

export function setTheRoomNumber(room_number, number){
  return number;
}

export function changeTheState(gameState, newState){
  console.log(newState);
  return newState;
}

export function blueIsDead(blueDead, cell) {
  return [...blueDead, cell];
}

export function redIsDead(redDead, cell) {
  return [...redDead, cell];
}

export function nextPlayerComes(player, activePlayer) {
  let newPlayer = null;
  if (player === "red") {
    newPlayer = "blue";
  } else {
    newPlayer = "red";
  }
  return newPlayer;
}

export function removeTheSelections(board, payload) {
  let newBoard = [];
    let cell = null;
    for (let i = 0; i < board.length; ++i) {
      let r = board[i];
      let new_row = [];
      for (let j = 0; j < r.length; ++j) {
        cell =  {
          id: board[i][j].id,
          x: board[i][j].x,
          y: board[i][j].y,
          isLake: board[i][j].isLake,
          canPlace: board[i][j].canPlace,
          placedNumber: board[i][j].placedNumber,
          color: board[i][j].color,
          border: false
        };
        new_row.push(cell);
        if (new_row.length === 10) {
          newBoard.push(new_row);
        }
      }
    } 
    return newBoard;
}

export function setTheCurrentPlayer(currentPlayer, color){
  return color;
}

export function showThePossibilities(board, c) {
  console.log("borderek állítása - hova léphet");
  if(c.placedNumber!==2){
    let newBoard = [];
    let cell = null;
    for (let i = 0; i < board.length; ++i) {
      let r = board[i];
      let new_row = [];
      for (let j = 0; j < r.length; ++j) {
        if ((board[i][j].x === c.x-1 && board[i][j].y === c.y && board[i][j].color!==c.color && board[i][j].isLake===false) || 
        (board[i][j].x === c.x && board[i][j].y === c.y-1 && board[i][j].color!==c.color && board[i][j].isLake===false) || 
        (board[i][j].x === c.x+1 && board[i][j].y === c.y && board[i][j].color!==c.color && board[i][j].isLake===false) || 
        (board[i][j].x === c.x && board[i][j].y === c.y+1 && board[i][j].color!==c.color && board[i][j].isLake===false)) {
          cell = {
            id: board[i][j].id,
            x: board[i][j].x,
            y: board[i][j].y,
            isLake: board[i][j].isLake,
            canPlace: board[i][j].canPlace,
            placedNumber: board[i][j].placedNumber,
            color: board[i][j].color,
            border: true
          };
        } else {
          cell = board[i][j];
        }
        new_row.push(cell);
        if (new_row.length === 10) {
          newBoard.push(new_row);
        }
      }
    } 
    return newBoard;
  }
  else if(c.placedNumber===2){
    let newBoard = [];
    let cell = null;
    for (let i = 0; i < board.length; ++i) {
      let r = board[i];
      let new_row = [];
      for (let j = 0; j < r.length; ++j) {
        if ((board[i][j].x === c.x && board[i][j].y!==c.y && board[i][j].color!==c.color && board[i][j].isLake===false && !atugorElemet(c, board[i][j], board)) 
        || 
        (board[i][j].x !== c.x && board[i][j].y === c.y && board[i][j].color!==c.color && board[i][j].isLake===false && !atugorElemet(c, board[i][j], board))) {
            cell = {
              id: board[i][j].id,
              x: board[i][j].x,
              y: board[i][j].y,
              isLake: board[i][j].isLake,
              canPlace: board[i][j].canPlace,
              placedNumber: board[i][j].placedNumber,
              color: board[i][j].color,
              border: true
            };
        } else {
          cell = board[i][j];
        }
        new_row.push(cell);
        if (new_row.length === 10) {
          newBoard.push(new_row);
        }
      }
    }
    return newBoard;
  }
  else {
    return board;
  }

}

export function afterFight(board, { cell1, cell2 }) {
  let newBoard = [];
  let cell = null;
  let stronger = null;
  if (cell2.placedNumber === 0 && cell1.placedNumber === 3) {
    stronger = cell1;
  } else if (cell2.placedNumber === 0 && cell1.placedNumber !== 3) {
    stronger = cell2;
  } else if (cell2.placedNumber === 10 && cell1.placedNumber === 1) {
    stronger = cell1;
  } else if (cell1.placedNumber > cell2.placedNumber) {
    stronger = cell1;
  } else if (cell1.placedNumber < cell2.placedNumber) {
    stronger = cell2;
  }
  for (let i = 0; i < board.length; ++i) {
    let r = board[i];
    let new_row = [];
    for (let j = 0; j < r.length; ++j) {
      if (board[i][j].x === cell1.x && board[i][j].y === cell1.y) {
        cell = {
          id: board[i][j].id,
          x: i,
          y: j,
          isLake: false,
          canPlace: true, //?
          placedNumber: null,
          color: null,
          border: false
        };
      } else if (board[i][j].x === cell2.x && board[i][j].y === cell2.y) {
        if (stronger == null) {
          cell = {
            id: board[i][j].id,
            x: i,
            y: j,
            isLake: false,
            canPlace: true, //?
            placedNumber: null,
            color: null,
            border: false
          };
        } else {
          cell = {
            id: board[i][j].id,
            x: i,
            y: j,
            isLake: false,
            canPlace: true, //?
            placedNumber: stronger.placedNumber,
            color: stronger.color,
            border: false
          };
        }
      } else {
        cell = {
          id: board[i][j].id,
          x:  board[i][j].x,
          y:  board[i][j].y,
          isLake:  board[i][j].isLake,
          canPlace:  board[i][j].canPlace,
          placedNumber:  board[i][j].placedNumber,
          color: board[i][j].color,
          border: false
        };
      }
      new_row.push(cell);
      if (new_row.length === 10) {
        newBoard.push(new_row);
      }
    }
  }
  return newBoard;
}

export function afterMove(board, { cell1, cell2 }) {
  let newBoard = [];
  let cell = null;
  for (let i = 0; i < board.length; ++i) {
    let r = board[i];
    let new_row = [];
    for (let j = 0; j < r.length; ++j) {
      if (board[i][j].x === cell1.x && board[i][j].y === cell1.y) {
        cell = {
          id: board[i][j].id,
          x: i,
          y: j,
          isLake: false,
          canPlace: true, //?
          placedNumber: null,
          color: null,
          border: false
        };
      } else if (board[i][j].x === cell2.x && board[i][j].y === cell2.y) {
        cell = {
          id: board[i][j].id,
          x: i,
          y: j,
          isLake: false,
          canPlace: true, //?
          placedNumber: cell1.placedNumber,
          color: cell1.color,
          border: false
        };
      } else {
        cell = {
          id: board[i][j].id,
          x: board[i][j].x,
          y: board[i][j].y,
          isLake: board[i][j].isLake,
          canPlace:  board[i][j].canPlace,
          placedNumber:  board[i][j].placedNumber,
          color:  board[i][j].color,
          border: false
        };
      }
      new_row.push(cell);
      if (new_row.length === 10) {
        newBoard.push(new_row);
      }
    }
  }
  console.log(newBoard);
  return newBoard;
}

export function startAPLay(board) {
  let newBoard = [];
  for (let i = 0; i < 10; ++i) {
    let row = [];
    for (let j = 0; j < 10; ++j) {
      // feltöltöm tetszőlegesen kékkel
      let cell = null;
      if (i <= 3) {
        cell = {
          id: board[i][j].id,
          x: i,
          y: j,
          isLake: false,
          canPlace: true, //?
          placedNumber: -1 + Math.round(Math.random() * (10 - -1)),
          color: "blue",
          border: false
        };
      } else {
        cell = board[i][j];
      }
      row.push(cell);
      if (row.length === 10) {
        newBoard.push(row);
      }
    }
  }
  return newBoard;
}

export function placeACharacter(board, { x, y, id, color }) {
  let cell = null;
  for (let i = 0; i < board.length; ++i) {
    let r = board[i];
    for (let j = 0; j < r.length; ++j) {
      if (board[i][j].x === x && board[i][j].y === y) {
        cell = board[i][j];
      }
    }
  }
  let iddd = cell.id;
  if (cell.isLake || cell.placedNumber != null) {
    return board; // nem kell módosítani
  }
  let alteredCell = {
    id: iddd,
    x: x,
    y: y,
    isLake: false,
    canPlace: true,
    placedNumber: parseInt(id),
    color: color,
    border: false
  };
  let newBoard = board.map(row => {
    let r = row.map(cell => {
      if (cell.x === x && cell.y === y) {
        cell = alteredCell;
      }
      return cell;
    });
    return r;
  });
  console.log(alteredCell);
  return newBoard;
}

export function removeACharacter(board, { x, y }) {
  let cell = null;
  for (let i = 0; i < board.length; ++i) {
    let r = board[i];
    for (let j = 0; j < r.length; ++j) {
      if (board[i][j].x === x && board[i][j].y === y) {
        cell = board[i][j];
      }
    }
  }
  if (cell.isLake || cell.canPlace === false) {
    return board; // nem kell módosítani
  }
  let alteredCell = {
    id: cell.id,
    x: x,
    y: y,
    isLake: false,
    canPlace: true,
    placedNumber: null,
    color: null,
    border: false
  };
  let newBoard = board.map(row => {
    let r = row.map(cell => {
      if (cell.x === x && cell.y === y) {
        cell = alteredCell;
      }
      return cell;
    });
    return r;
  });
  console.log(alteredCell);
  return newBoard;
}

export const RESET_BOARD = "RESET_BOARD";

export const resetBoard = () => ({
  type: RESET_BOARD
});
