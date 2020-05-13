import React, { useState } from 'react';
import './App.css';
import { MainPage } from "./components/MainPage";
import { WaitingArea } from "./components/WaitingArea";
import { GamePage } from "./components/GamePage";
import { PreparingArea } from "./components/PreparingArea";
import { useSelector } from 'react-redux';

function App() {

 const gameState = useSelector(state => state.gameState);
 const [room_number, setRoomNumber] = useState(0);


  if(gameState==='MAIN_PAGE'){
    return (
      <div className="ui center aligned container">
          <MainPage room_number={room_number}></MainPage>
      </div>
    );
  } else if(gameState==='WAITING_FOR_SECOND_PLAYER'){
    return (
      <div className="ui center aligned container">
          <WaitingArea room_number={room_number} setRoomNumber={setRoomNumber}></WaitingArea>
      </div>
    );
  } else if(gameState==='PREPARE_GAME'){
    return (
      <div className="ui center aligned container">
          <PreparingArea></PreparingArea>
      </div>
    );
  } else if(gameState==='IN_GAME'){
    return (
      <div className="ui center aligned container">
          <GamePage></GamePage>
      </div>
    );
  }
}

export default App;
