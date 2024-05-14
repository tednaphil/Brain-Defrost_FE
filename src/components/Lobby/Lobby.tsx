import './Lobby.css';
import type { Game, Player } from '../Util/interfaces';
import { useState, useEffect } from 'react';

interface Props {
    game: Game | object,
    players: Player[]
}

function Lobby({game, players}: Props) {
    const [sessionGame, setSessionGame] = useState({});
    const [sessionPlayers, setSessionPlayers] = useState([]);

    useEffect(() => {
        // @ts-expect-error
        const sessionGame = JSON.parse(sessionStorage.getItem('game'))
        console.log('sessionGame', sessionGame)
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
    
    // const playerNames = players.map(player => {
    //     return(
    //         <p
    //         key={player.id}
    //         >{player.attributes.display_name}</p>
    //     )
    // })

    return (
        <>
        <h2>Lobby</h2>
        {playerNames.length && playerNames}
        </>
    )
}

export default Lobby