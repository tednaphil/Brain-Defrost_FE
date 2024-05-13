import './JoinGameForm.css';
// import { useParams } from 'react-router-dom';

function JoinGameForm() {
    // const { gameid } = useParams();
    //check if game exists
    //if it does not, show user feedback and a link to home page

    return (
        <form className='entry-form'>
                <input id='display-name-input'type='text' placeholder='Enter Display Name' required></input>
                <button>Join Game!</button>
        </form>
    )
}

export default JoinGameForm