import React from 'react';
import { DeadCharacters } from "./DeadCharacters";
import { Board } from "./Board";
import { useDispatch } from "react-redux";
import { resetBoard } from '../actions';
import { useSelector } from "react-redux";

export function GamePage({state, onChangeState}) {
  const dispatch = useDispatch();
  const activePlayer = useSelector(state => state.activePlayer);

  return (
    <>
    <div className="ui container" style={{width: "960px", height: "800px",  backgroundColor: "rgb(242,234,212)"}}>
      <div className="ui grid">
        <div className="eleven wide column">
          <h1>Játékoldal</h1>
          <div  style={{fontSize: "30px"}}>{activePlayer==='blue' ? <span style={{color:"blue"}}>Kék</span> : <span style={{color:"red"}}>Piros</span>} következik</div>
          <br/>
          <Board state={state}></Board>
        </div>
        <br/>
        <div className="five wide middle aligned column">
          <DeadCharacters></DeadCharacters>
          <br/>
          <button className="ui red basic button" id="vissza_fooldal" onClick={()=>{dispatch(resetBoard()); onChangeState(state='MAIN_PAGE'); }}>Vissza a főoldalra</button>
        </div>
        </div>
      </div>
    </>
  );

};