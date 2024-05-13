import './JoinGameForm.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { postPlayer } from '../Util/fetchCalls';

function JoinGameForm() {
    const { gameid } = useParams<string>();
    const [displayName, setDisplayName] = useState<string>('');
    
    //on mount, check if game exists
    //if it does not, show user feedback and a link to home page
    //if it does return the form elemnents 

    //check if displayname is available
    //if displayname is already in use, display message to user
    //if displayname is available and game not in progress, allow them to join

    const createPlayer = async (gameID: string  | undefined, nameString: string) => {
        const newPlayer = await postPlayer(gameID, nameString);
        console.log(newPlayer)
    }

    const handleSubmission = async (e: any, gameID: string  | undefined, nameString: string) => {
        e.preventDefault()
        createPlayer(gameID, nameString)
    }

    return (
        <form className='entry-form' onSubmit={(e) => {handleSubmission(e, gameid, displayName)}}>
                <input id='display-name-input'type='text' placeholder='Enter Display Name' value={displayName} onChange={(e) => setDisplayName(e.target.value)} required></input>
                <button>Join Game!</button>
        </form>
    )
}

export default JoinGameForm