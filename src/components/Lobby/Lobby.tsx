import './Lobby.css';
import type { Game } from '../Util/interfaces';

interface Props {
    game: Game | object
}

function Lobby({game}: Props) {
    // @ts-expect-error
    const playerNames = game.relationships.players.data.map(player => {
        return(
            <p
            key={player.id}
            >{player.attributes.display_name}</p>

        )})
    return (
        <>
        <h2>Lobby</h2>
        {playerNames}
        </>
    )
}

export default Lobby