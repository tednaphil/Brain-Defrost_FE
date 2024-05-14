import './Lobby.css';
import type { Player } from '../Util/interfaces';
import { useState, useEffect } from 'react';

interface Props {
    players: Player[]
}

function Lobby({players}: Props) {
    const [sessionGame, setSessionGame] = useState({});
    const [sessionPlayers, setSessionPlayers] = useState([]);
    console.log('sessionGame', sessionGame)

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

    return (
        <>
        <h2>Lobby</h2>
        {playerNames.length && playerNames}
        </>
    )
}

export default Lobby