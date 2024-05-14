import './Game.css';
// import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Game() {
    const location = useLocation();
    // const [sessionGame, setSessionGame] = useState(location.state);
    const sessionGame = location.state;
    console.log({sessionGame})
    return (
        <>
        <h2>Game</h2>
        </>
    )
}

export default Game