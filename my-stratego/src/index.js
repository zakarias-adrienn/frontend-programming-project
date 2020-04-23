import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import {
  NEXT_PLAYER,
  MOVE_CHARACTER,
  REMOVE_CHARACTER,
  RESET_BOARD,
  placeACharacter,
  afterFight,
  removeACharacter,
  PLACE_CHARACTER,
  getInitialState,
  START_PLAY,
  startAPLay,
  afterMove,
  nextPlayerComes,
  FIGHT_COMES,
  BLUE_DEAD,
  blueIsDead,
  RED_DEAD,
  redIsDead
} from "./actions";

const rootReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case PLACE_CHARACTER:
      return { ...state, board: placeACharacter(state.board, action.payload) };
    case REMOVE_CHARACTER:
      return { ...state, board: removeACharacter(state.board, action.payload) };
    case RESET_BOARD:
      return getInitialState();
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
        activePlayer: nextPlayerComes(state.board, action.payload)
      };
    case FIGHT_COMES:
      return { ...state, board: afterFight(state.board, action.payload) };
    case BLUE_DEAD:
      return { ...state, blueDead: blueIsDead(state.blueDead, action.payload) };
    case RED_DEAD:
      return { ...state, redDead: redIsDead(state.redDead, action.payload) };
    default:
      return state;
  }
};

const store = createStore(rootReducer, getInitialState());

console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// store.dispatch(placeCharacter(6,6,9));

unsubscribe();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
