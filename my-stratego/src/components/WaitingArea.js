import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../state/actions";

export function WaitingArea({
}) {
  const dispatch = useDispatch();
  const room_number = useSelector(state => state.game.room_number);
  return (
    <div
      className="ui container"
      style={{ width: "960px", backgroundColor: "rgb(242,234,212)" }}
    >
      <br />
      <br />
      <div style={{ fontSize: "30px" }}>
        Szobaszám: <output>{room_number}</output>
      </div>
      <br />
      <br />
      <button
        className="ui red basic button"
        id="vissza"
        onClick={() => {
          dispatch(changeState('MAIN_PAGE'));
        }}
      >
        Vissza a főoldalra
      </button>
    </div>
  );
}
