import React from "react";
import {Routes, Route} from "react-router-dom"
import "./App.css";
import Home from "../Home/Home";
import { getGame, getPlayer, getStats } from '../Util/fetchCalls'
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    fetchGame()
    fetchPlayer()
    fetchStats()
  }, [])

  const fetchGame = async () => {
    try {
      const game = await getGame()
      console.log(game)
    } catch(error) {
        console.log(`fetchGame catch block ${error}`)
    }
  }
  const fetchPlayer = async () => {
    try {
      const player = await getPlayer()
      console.log(player)
    } catch(error) {
        console.log(`fetchPlayer catch block ${error}`)
    }
  }
  const fetchStats = async () => {
    try {
      const stats = await getStats()
      console.log(stats)
    } catch(error) {
        console.log(`fetchStats catch block ${error}`)
    }
  }



  return (
    <>
      <header>
        <h1 className="header-text">Brain Defrost</h1>
      </header>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
