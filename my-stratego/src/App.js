import React, { useState } from 'react';
import './App.css';
import { MainPage } from "./components/MainPage";
import { WaitingArea } from "./components/WaitingArea";
import { GamePage } from "./components/GamePage";
import { PreparingArea } from "./components/PreparingArea";

function App() {

 const [state, setState] = useState('MAIN_PAGE');
 const [room_number, setRoomNumber] = useState(0);


  if(state==='MAIN_PAGE'){
    return (
      <div className="ui center aligned container">
          <MainPage state={state} onChangeState={setState} room_number={room_number}></MainPage>
      </div>
    );
  } else if(state==='WAITING_FOR_SECOND_PLAYER'){
    return (
      <div className="ui center aligned container">
          <WaitingArea state={state} onChangeState={setState} room_number={room_number} setRoomNumber={setRoomNumber}></WaitingArea>
      </div>
    );
  } else if(state==='PREPARE_GAME'){
    return (
      <div className="ui center aligned container">
          <PreparingArea state={state} onChangeState={setState}></PreparingArea>
      </div>
    );
  } else if(state==='IN_GAME'){
    return (
      <div className="ui center aligned container">
          <GamePage state={state} onChangeState={setState}></GamePage>
      </div>
    );
  }
}

export default App;
