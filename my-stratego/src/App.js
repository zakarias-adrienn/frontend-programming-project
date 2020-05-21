import React, { useState } from 'react';
import './App.css';
import { MainPage } from "./components/MainPage";
import { WaitingArea } from "./components/WaitingArea";
import { GamePage } from "./components/GamePage";
import { PreparingArea } from "./components/PreparingArea";
import { useSelector } from 'react-redux';
import io from "socket.io-client";


function App() {

 const gameState = useSelector(state => state.gameState);
 let socket = io("http://webprogramozas.inf.elte.hu:3030");

  if(gameState==='MAIN_PAGE'){
    return (
      <div className="ui center aligned container">
          <MainPage socket={socket}></MainPage>
      </div>
    );
  } else if(gameState==='WAITING_FOR_SECOND_PLAYER'){
    return (
      <div className="ui center aligned container">
          <WaitingArea></WaitingArea>
      </div>
    );
  } else if(gameState==='PREPARE_GAME'){
    return (
      <div className="ui center aligned container">
          <PreparingArea socket={socket}></PreparingArea>
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
