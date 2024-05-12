import React from 'react';
import logo from '../../logo.svg';
import './App.css';
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Brain Defrost FrontEnd
        </h1>
        <p>Learn some more about CI/CD</p>
      </header>
    </div>
  );
}

export default App;
