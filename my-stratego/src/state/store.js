import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from 'redux'
import {
  NEXT_PLAYER,
  MOVE_CHARACTER,
  REMOVE_CHARACTER,
  RESET_BOARD,
  placeACharacter,
  changeTheState,
  afterFight,
  removeACharacter,
  PLACE_CHARACTER,
  START_PLAY,
  startAPLay,
  afterMove,
  nextPlayerComes,
  FIGHT_COMES,
  BLUE_DEAD,
  blueIsDead,
  RED_DEAD,
  redIsDead,
  CHANGE_STATE,
  SHOW_POSSIBILITIES,
  showThePossibilities,
  removeTheSelections,
  REMOVE_SELECTIONS,
  SET_CURRENT_PLAYER,
  setTheCurrentPlayer,
  SET_ROOM_NUMBER,
  setTheRoomNumber,
  SET_READY,
  setTheReady
} from "./actions";

let cells = [];
let k = 1;
for (let i = 0; i < 10; ++i) {
  let row = [];
  for (let j = 0; j < 10; ++j) {
    let lake = false;
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
    let cell = {
      id: k,
      x: i,
      y: j,
      isLake: lake,
      canPlace: true,
      placedNumber: null,
      color: null,
      border: false
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
  gameState: 'MAIN_PAGE',
  game: {
    ready: 0,
    room_number: null,
    currentPlayer: null,
    activePlayer: "red",
    board: cells,
    blueDead: [],
    redDead: []
  }
});

export const mainReducer = (state = getInitialState().game, action) => {
  switch (action.type) {
    case PLACE_CHARACTER:
      return { ...state, board: placeACharacter(state.board, action.payload) };
    case REMOVE_CHARACTER:
      return { ...state, board: removeACharacter(state.board, action.payload) };
    case RESET_BOARD:
      return getInitialState().game;
    case START_PLAY:
      return {
        ...state,
        redDead: [],
        blueDead: [],
        board: startAPLay(state.board)
      };
    case MOVE_CHARACTER:
      return { ...state, board: afterMove(state.board, action.payload) };
    case NEXT_PLAYER:
      return {
        ...state,
        activePlayer: nextPlayerComes(state.activePlayer, action.payload)
      };
    case FIGHT_COMES:
      return { ...state, board: afterFight(state.board, action.payload) };
    case BLUE_DEAD:
      return { ...state, blueDead: blueIsDead(state.blueDead, action.payload) };
    case RED_DEAD:
      return { ...state, redDead: redIsDead(state.redDead, action.payload) };
    case SHOW_POSSIBILITIES:
      return { ...state, board: showThePossibilities(state.board, action.payload) };
    case REMOVE_SELECTIONS:
      return { ...state, board: removeTheSelections(state.board, action.payload) };
    case SET_CURRENT_PLAYER:
      return { ...state, currentPlayer: setTheCurrentPlayer(state.currentPlayer, action.payload)};
    case SET_ROOM_NUMBER:
      return { ...state, room_number: setTheRoomNumber(state.room_number, action.payload)};
    case SET_READY:
      return { ...state, ready: setTheReady(state.ready, action.payload)};
    default:
      return state;
  }
};

export const stateReducer = (state = getInitialState().gameState, action) => {
  switch (action.type) {
    case CHANGE_STATE:
      return changeTheState(state.gameState, action.payload);
    default:
      return state;
  }
}

export const rootReducer = combineReducers({ game: mainReducer, gameState: stateReducer});

export function configureStore() {
  return createStore(rootReducer, getInitialState(), composeWithDevTools());
}
