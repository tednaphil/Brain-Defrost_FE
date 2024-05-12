import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import { getGame } from '../Util/fetchCalls'
import { useEffect, useState } from 'react';

function App() {

  useEffect(() => {
    fetchGame()
  }, [])

  const fetchGame = async () => {
    try {
      const game = await getGame()
      console.log(game)
    } catch(error) {
        console.log(`fetchGame catch block ${error}`)
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
