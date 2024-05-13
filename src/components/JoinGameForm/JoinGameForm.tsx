import './JoinGameForm.css';
// import { useParams } from 'react-router-dom';
import { useState } from 'react';

function JoinGameForm() {
    // const { gameid } = useParams<string>();
    const [displayName, setDisplayName] = useState<string>('');
    
    //check if game exists
    //if it does not, show user feedback and a link to home page
    //if it does return the form elemnents 

    //check if displayname is available
    //if displayname is already in use, display message to user
    //if displayname is available and game not in progress, allow them to join

    return (
        <form className='entry-form'>
                <input id='display-name-input'type='text' placeholder='Enter Display Name' value={displayName} onChange={(e) => setDisplayName(e.target.value)} required></input>
                <button>Join Game!</button>
        </form>
    )
}

export default JoinGameForm