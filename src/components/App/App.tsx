import React from "react";
import {Routes, Route} from "react-router-dom"
import "./App.css";
import Home from "../Home/Home";
import Lobby from "../Lobby/Lobby";
import JoinGameForm from "../JoinGameForm/JoinGameForm";
import Game from "../Game/Game";
import Stats from "../Stats/Stats";
// import { getGame, getPlayer, getStats } from '../Util/fetchCalls'
import { useState } from 'react';
import ErrorPage from "../ErrorPage/ErrorPage";


function App() {
  const [game, setGame] = useState({});
  const [players, setPlayers] = useState([]);
  console.log(game)
  // useEffect(() => {
  //   fetchGame()
  //   fetchPlayer()
  //   fetchStats()
  // }, [])

  // const fetchGame = async () => {
  //   try {
  //     const game = await getGame()
  //     console.log(game)
  //   } catch(error) {
  //       console.log(`fetchGame catch block ${error}`)
  //   }
  // }
  // const fetchPlayer = async () => {
  //   try {
  //     const player = await getPlayer()
  //     console.log(player)
  //   } catch(error) {
  //       console.log(`fetchPlayer catch block ${error}`)
  //   }
  // }
  // const fetchStats = async () => {
  //   try {
  //     const stats = await getStats()
  //     console.log(stats)
  //   } catch(error) {
  //       console.log(`fetchStats catch block ${error}`)
  //   }
  // }



  return (

    <>
      <header>
        <h1 className="header-text">Brain Defrost</h1>
      </header>
      <Routes>
        {/* @ts-expect-error */}
        <Route path = "/" element = {<Home setGame={setGame} setPlayers={setPlayers} />}/>
        <Route path = "/game/lobby/:gameid" element = {<Lobby players={players} />}/>
        {/* @ts-expect-error */}
        <Route path = "/join/:gameid" element = {<JoinGameForm players={players} setPlayers={setPlayers} />}/>
        <Route path = "/game/play/:gameid" element = {<Game />}/>
        <Route path = "/game/results/:gameid" element = {<Stats />}/>
        <Route path = "*" element = {<ErrorPage />}/>
      </Routes>
    </>
  );
}

export default App;
