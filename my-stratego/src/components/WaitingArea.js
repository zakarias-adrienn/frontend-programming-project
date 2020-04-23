import React from 'react';

export function WaitingArea({state, onChangeState, room_number, setRoomNumber}) {
  room_number = 100000 + Math.round((Math.random() * (999999-100000)));
  return (
    <div className="ui container" style={{width: "960px", backgroundColor: "rgb(242,234,212)"}}>
      <br/>
      <br/>
      <div style={{fontSize: "50px"}}>Szobaszám: <output>{room_number}</output></div>
      <br/>
      <br/>
      <button className="ui red basic button" id="vissza" onClick={()=>{onChangeState(state='MAIN_PAGE'); setRoomNumber(room_number)}}>Vissza a főoldalra</button>
    </div>
  );
}