import React from "react";
import {Routes, Route, useNavigate} from "react-router-dom"
import "./App.css";
import Home from "../Home/Home";
import Lobby from "../Lobby/Lobby";
import JoinGameForm from "../JoinGameForm/JoinGameForm";
import Game from "../Game/Game";
import Stats from "../Stats/Stats";
import { useState } from 'react';
import ErrorPage from "../ErrorPage/ErrorPage";


function App() {
  const Navigate = useNavigate()
  const [game, setGame] = useState({});
  const [players, setPlayers] = useState([]);
  console.log(game)

  return (

    <>
      <header>
        <h1  onClick={() => Navigate("/")} className="header-text">Brain Defrost</h1>
      </header>
      <Routes>
        {/* @ts-expect-error */}
        <Route path = "/" element = {<Home setGame={setGame} setPlayers={setPlayers}/>}/>
        <Route path = "/game/lobby/:gameid" element = {<Lobby players={players} />}/>
        {/* @ts-expect-error */}
        <Route path = "/join/:gameid" element = {<JoinGameForm players={players} setPlayers={setPlayers} />}/>
        <Route path = "/game/play/:gameid" element = {<Game />}/>
        <Route path = "/game/results/:gameid" element = {<Stats />}/>
        <Route path = "*" element = {<ErrorPage error={'Page not found'}/>}/>
      </Routes>
    </>
  );
}

export default App;
