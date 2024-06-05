import "./JoinGameForm.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { postPlayer, getGame } from "../Util/fetchCalls";
import type { Player } from "../Util/interfaces";
import Modal from "../Modal/Modal";

interface Props {
  setPlayers: (array: Player[]) => void;
  players: Player[];
}

function JoinGameForm({ players, setPlayers }: Props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const encodedString = params.get("data");
  const { gameid } = useParams<string>();
  const [displayName, setDisplayName] = useState<string>("");
  const [sessionPlayers, setSessionPlayers] = useState<Player[]>([]);
  const [sessionGame, setSessionGame] = useState<any>(null);
  const [game, setGame] = useState<any>(null);
  // const [players, setPlayers] = useState<Player[]>([]);
  const [nameAvailable, setNameAvailable] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-expect-error
    fetchGame(gameid);
    // if (encodedString) {
    //   const data = JSON.parse(decodeURIComponent(encodedString));
    //   setSessionPlayers(data.relationships.players.data);
    //   setSessionGame(data);
    //   sessionStorage.setItem("game", JSON.stringify(data));
    // }
  }, [/*encodedString*/]);

  const fetchGame = async (gameID: string) => {
    try {
      const currentGame = await getGame(gameID);
      setGame(currentGame.data);
      setPlayers(currentGame.data.relationships.players.data)
      setSessionPlayers(currentGame.data.relationships.players.data)
      
    } catch (error) {
      setError(`${error}`);
      console.log(error);
    }
  };

  const isNameAvailable = (nameInput: string): boolean => {
    const playerNames = sessionPlayers.map(
      (player) => player.attributes.display_name
    );
    const matches = playerNames.filter((name) => nameInput === name);
    if (matches.length) {
      setNameAvailable(false);
      return false;
    } else {
      setNameAvailable(true);
      return true;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
    isNameAvailable(e.target.value);
  };

  const createPlayer = async (
    gameID: string | undefined,
    nameString: string
  ) => {
    try {
      const newPlayer = await postPlayer(gameID, nameString);
      setPlayers([...players, newPlayer.data]);
      sessionStorage.setItem('currentPlayer', JSON.stringify(newPlayer.data))
      sessionStorage.setItem(
        "players",
        JSON.stringify([...sessionPlayers, newPlayer.data])
      ); //is this even neccessary?
      // navigate(`/game/lobby/${gameid}`, { state: sessionGame });
      navigate(`/game/lobby/${gameid}`, { state: game });
    } catch (error) {
      setError(`${error}`);
      console.log(error);
    }
  };

  const handleSubmission = async (
    e: React.FormEvent<HTMLFormElement>,
    gameID: string | undefined,
    nameString: string
  ) => {
    e.preventDefault();
    await createPlayer(gameID, nameString);
  };

  return (
    <>
      {error && <Modal setError={setError} alert={error} />}
      <form
        className="entry-form"
        onSubmit={(e) => {
          handleSubmission(e, gameid, displayName);
        }}
      >
        <h2 className="entry-form-header">Join the Game!</h2>
        {!nameAvailable && (
          <p id="display-name-notif">
            That display name is taken. Please choose another one!
          </p>
        )}
        <input
          id="display-name-input"
          name="display name"
          type="text"
          placeholder="Enter Display Name"
          value={displayName}
          onChange={(e) => handleChange(e)}
          required
        ></input>
        <button id="join-game-button" name="join">
          Join Game!
        </button>
      </form>
    </>
  );
}

export default JoinGameForm;
