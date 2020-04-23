let cells = [];
let k = 1;
for (let i = 0; i < 10; ++i) {
  let row = [];
  for (let j = 0; j < 10; ++j) {
    let lake = false;
    let cP = false;
    if (
      (i === 4 && j === 2) ||
      (i === 4 && j === 3) ||
      (i === 5 && j === 2) ||
      (i === 5 && j === 3) ||
      (i === 4 && j === 6) ||
      (i === 4 && j === 7) ||
      (i === 5 && j === 6) ||
      (i === 5 && j === 7)
    ) {
      lake = true;
    }
    if (i >= 6) {
      cP = true;
    }
    let cell = {
      id: k,
      x: i,
      y: j,
      isLake: lake,
      canPlace: cP, // csak az alsó 4 sorba szabad
      placedNumber: null,
      color: null,
      shown: false
    };
    row.push(cell);
    if (row.length === 10) {
      cells.push(row);
      row = [];
    }
    k = k + 1;
  }
}

export const getInitialState = () => ({
  // state: 'MAIN_PAGE',
  activePlayer: "red",
  board: cells,
  blueDead: [],
  redDead: []
});

export const PLACE_CHARACTER = "PLACE_CHARACTER";
export const REMOVE_CHARACTER = "REMOVE_CHARACTER";
export const START_PLAY = "START_PLAY";
export const MOVE_CHARACTER = "MOVE_CHARACTER";
export const NEXT_PLAYER = "NEXT_PLAYER";
export const FIGHT_COMES = "FIGHT_COMES";
export const BLUE_DEAD = "BLUE_DEAD";
export const RED_DEAD = "RED_DEAD";

export const placeCharacter = (x, y, id) => ({
  type: PLACE_CHARACTER,
  payload: { x, y, id }
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

export function blueIsDead(blueDead, cell) {
  return [...blueDead, cell];
}

export function redIsDead(redDead, cell) {
  return [...redDead, cell];
}

export function nextPlayerComes(board, activePlayer) {
  let newPlayer = null;
  if (activePlayer === "red") {
    newPlayer = "blue";
  } else {
    newPlayer = "red";
  }
  return newPlayer;
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
          shown: false //?
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
            shown: false //?
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
            shown: false //?
          };
        }
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
          shown: false //?
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
          shown: false //?
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
          shown: false //?
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

export function placeACharacter(board, { x, y, id }) {
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
  if (cell.isLake || cell.placedNumber != null || cell.canPlace === false) {
    return board; // nem kell módosítani
  }
  // most piros, de honnan tudom meg a szint?

  let alteredCell = {
    id: iddd,
    x: x,
    y: y,
    isLake: false,
    canPlace: true,
    placedNumber: parseInt(id),
    color: "red",
    shown: false
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
    shown: false
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
