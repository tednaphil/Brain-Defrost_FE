import './Lobby.css';
import type { Player } from '../Util/interfaces';
import { patchGame } from '../Util/fetchCalls';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Copy } from 'react-feather';
import Modal from '../Modal/Modal';

interface Props {
    players: Player[]
}

function Lobby({players}: Props) {
    const [sessionGame, setSessionGame] = useState({});
    const [sessionPlayers, setSessionPlayers] = useState([]);
    console.log('sessionGame', sessionGame)
    const location = useLocation();
    const game = location.state;
    const { gameid } = useParams();
   // const joinURL = `http://localhost:3000/Brain-Defrost_FE/join/${gameid}`;
    const navigate = useNavigate();
    const [joinURL, setJoinUrl] = useState('');
    const [error, setError] = useState<string>('');
/*
    const createJoinLink = () => {
        console.log(sessionPlayers)
        console.log(sessionGame)
        let stringQuestion = JSON.stringify(game)
        let encodedQuestion = encodeURIComponent(stringQuestion)
        setJoinUrl(`http://localhost:3000/Brain-Defrost_FE/join/${gameid}/?data=${encodedQuestion}`)
    }
    */
    useEffect(() => {
        // @ts-expect-error
        const sessionGame = JSON.parse(sessionStorage.getItem('game'))
        setSessionGame(sessionGame)
        let stringQuestion = JSON.stringify(game)
        let encodedQuestion = encodeURIComponent(stringQuestion)
        setJoinUrl(`http://localhost:3000/Brain-Defrost_FE/join/${gameid}/?data=${encodedQuestion}`)
        // @ts-expect-error
        const sessionPlayers = JSON.parse(sessionStorage.getItem('players'))
        setSessionPlayers(sessionPlayers)
        console.log('sessionGame', sessionGame)
        console.log('game',game)
    }, [players, game, gameid])

    
    const playerNames = sessionPlayers.map(player => {
        return(
            <p
            // @ts-expect-error
            key={player.id}
            // @ts-expect-error
            >{player.attributes.display_name}</p>
        )});
    
    const copyURL = () => {
        navigator.clipboard.writeText(joinURL);
    };

    const startGame = async () => {
        try {
            await patchGame(gameid);
            navigate(`/game/play/${gameid}`, {state: sessionGame});
            //??instead, pass new object with up to date players and game questions
            //and other needed details until websockets are set up??
        } catch (error) {
            setError(`${error}`);
            console.log(error)
        } 
    };

    return (
        <main className='lobby'>
            {error && <Modal setError={setError} alert={error} />}
            <section className='details'>
                <h2 className='game-topic lobby-details'><span>Topic</span><br/>{game.attributes.topic}</h2>
                <h2 className='question-count lobby-details'>{`${game.attributes.number_of_questions} Questions`}</h2>
                <h2 className='join-url-heading lobby-details'>Share the Link to invite players!</h2>
                <div className='join-url-container'>
                    <p onClick={copyURL} className='join-url'>Copy Link</p>
                    <button id='copy-url-btn' onClick={copyURL}><Copy /></button>
                </div>
                <button className='start-game-btn' onClick={startGame}>Start Game!</button>
            </section>
            <section className='players'>
                <h2 className='players-heading'>Players</h2>
                {playerNames.length && playerNames}
            </section>
        </main>
    )
}

export default Lobby