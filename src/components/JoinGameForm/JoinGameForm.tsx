import './JoinGameForm.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postPlayer } from '../Util/fetchCalls';
import type { Player } from '../Util/interfaces';

interface Props {
    setPlayers: (array: Player[]) => void,
    players: Player[]
  }

function JoinGameForm({players, setPlayers}: Props) {
    const { gameid } = useParams<string>();
    const [displayName, setDisplayName] = useState<string>('');
    const [sessionPlayers, setSessionPlayers] = useState([]);
    const [nameAvailable, setNameAvailable] = useState<boolean>(true);
    
    
    const navigate = useNavigate();

    useEffect(() => {
        // @ts-expect-error
        const sessionPlayers = JSON.parse(sessionStorage.getItem('players'))
        setSessionPlayers(sessionPlayers)
    }, [])

    const isNameAvailable = (nameInput: string) => {
        // @ts-expect-error
        const playerNames = sessionPlayers.map(player => player.attributes.display_name)
        console.log('playerNames', playerNames)
        const matches = playerNames.filter(name => nameInput === name)
        console.log({matches})
        if (matches.length) {
            setNameAvailable(false)
            return false
        } else {
            setNameAvailable(true)
            return true
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayName(e.target.value)
        isNameAvailable(e.target.value)
    }
    
    //on mount, check if game exists
    //if it does not, show user feedback and a link to home page
    //if it does return the form elemnents 

    

    const createPlayer = async (gameID: string  | undefined, nameString: string) => {
        const newPlayer = await postPlayer(gameID, nameString);
        //confirm the displayname is still available
        //if displayname is already in use at time of submission, display message to user
        //if displayname is available and game not in progress and the max number of players is not met,
        //allow user to join etc...
        console.log({newPlayer});
        setPlayers([...players, newPlayer.data]);
        sessionStorage.setItem('players', JSON.stringify([...sessionPlayers, newPlayer.data]));
    }

    const handleSubmission = async (e: any, gameID: string  | undefined, nameString: string) => {
        e.preventDefault();
        createPlayer(gameID, nameString);
        navigate(`/game/lobby/${gameid}`);
    }

    return (
        <form className='entry-form' onSubmit={(e) => {handleSubmission(e, gameid, displayName)}}>
                {!nameAvailable && <p id='display-name-notif'>That display name is taken. Please choose another one!</p>}
                <input id='display-name-input' name='display name' type='text' placeholder='Enter Display Name' value={displayName} onChange={(e) => handleChange(e)} required></input>
                <button id='join-game-button' name='join'>Join Game!</button>
        </form>
    )
}

export default JoinGameForm