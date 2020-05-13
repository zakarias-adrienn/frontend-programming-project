import React from "react";
import { useDispatch } from "react-redux";
import { changeState } from "../state/actions";

export function WaitingArea({
  room_number,
  setRoomNumber
}) {
  const dispatch = useDispatch();
  room_number = 100000 + Math.round(Math.random() * (999999 - 100000));
  return (
    <div
      className="ui container"
      style={{ width: "960px", backgroundColor: "rgb(242,234,212)" }}
    >
      <br />
      <br />
      <div style={{ fontSize: "50px" }}>
        Szobaszám: <output>{room_number}</output>
      </div>
      <br />
      <br />
      <button
        className="ui red basic button"
        id="vissza"
        onClick={() => {
          dispatch(changeState('MAIN_PAGE'));
          setRoomNumber(room_number);
        }}
      >
        Vissza a főoldalra
      </button>
    </div>
  );
}
