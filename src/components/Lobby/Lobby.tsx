import './Lobby.css';
import type { Player } from '../Util/interfaces';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
    players: Player[]
}

function Lobby({players}: Props) {
    const [sessionGame, setSessionGame] = useState({});
    const [sessionPlayers, setSessionPlayers] = useState([]);
    console.log('sessionGame', sessionGame)
    const { gameid } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        // @ts-expect-error
        const sessionGame = JSON.parse(sessionStorage.getItem('game'))
        setSessionGame(sessionGame)
        // @ts-expect-error
        const sessionPlayers = JSON.parse(sessionStorage.getItem('players'))
        setSessionPlayers(sessionPlayers)
        console.log('sessionPlayers', sessionPlayers)
    }, [players])

    
    const playerNames = sessionPlayers.map(player => {
        return(
            <p
            // @ts-expect-error
            key={player.id}
            // @ts-expect-error
            >{player.attributes.display_name}</p>
        )})

    const startGame = () => {
        navigate(`/game/play/${gameid}`, {state: sessionGame});
        //instead, pass new object with up to date players and game questions
        //and other needed details until websockets are set up
        
        //make started game post request, update respective game state property
    }

    return (
        <main className='lobby'>
            <h2>Lobby</h2>
            <section className='details'>
                <button className='start-game-btn' onClick={startGame}>Start Game!</button>
            </section>
            <section className='players'>
                {playerNames.length && playerNames}
            </section>
        
        
        
        </main>
    )
}

export default Lobby