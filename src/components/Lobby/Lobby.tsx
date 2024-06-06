import "./Lobby.css";
import type { Player } from "../Util/interfaces";
import { patchGame } from "../Util/fetchCalls";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { createConsumer } from "@rails/actioncable";
import { Copy } from "react-feather";
import Modal from "../Modal/Modal";

interface Props {
  players: Player[];
}

function Lobby({ players }: Props) {
  const [sessionGame, setSessionGame] = useState({});
  const [sessionPlayers, setSessionPlayers] = useState([]);
  const location = useLocation();
  const game = location.state;
  const { gameid } = useParams();
  const navigate = useNavigate();
  const [joinURL, setJoinUrl] = useState("");
  const [error, setError] = useState<string>("");
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    // @ts-expect-error
    const sessionGame = JSON.parse(sessionStorage.getItem("game"));
    setSessionGame(sessionGame);
    let stringQuestion = JSON.stringify(game);
    let encodedQuestion = encodeURIComponent(stringQuestion);
    setJoinUrl(
      `https://brain-defrost.netlify.app/join/${gameid}/?data=${encodedQuestion}`
    );
    // @ts-expect-error
    const sessionPlayers = JSON.parse(sessionStorage.getItem("players"));
    setSessionPlayers(sessionPlayers);
    const cabel = createConsumer('placeholder fetch link lol ')
    const link = cabel.subscriptions.create(
        {channel: 'placeholder', game_id:gameid},
        {
            received:(data) => {
                if(data.event === "placeholder is game started"){
                    startCountdown();
                }else if (data.event === "placeholder player update"){
                    setSessionPlayers("placeholder player womp womp");
                }
            }
        }
    )
  }, [players, game, gameid]);

  const playerNames = sessionPlayers.map((player) => {
    return (
      <p
        // @ts-expect-error
        key={player.id}
        // @ts-expect-error
        >{player.attributes.display_name}
      </p>
    );
  });

  const copyURL = () => {
    navigator.clipboard.writeText(joinURL);
  };

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown(10);
      //@ts-ignore
      setCountdown((preTimeLeft) => preTimeLeft - 1);
    }, 1000);
    if (countdown === 0) {
      navigate(`/game/play/${gameid}`, { state: sessionGame });
      clearInterval(timer);
    }
  };


  const startGame = async () => {
    try {
      await patchGame(gameid);
    } catch (error) {
      setError(`${error}`);
      console.log(error);
    }
  };

  return (
    <main className="lobby">
      {error && <Modal setError={setError} alert={error} />}
      <section className="details">
        <h2 className="game-topic lobby-details">
          <span>Topic</span>
          <br />
          {game.attributes.topic}
        </h2>
        <h2 className="question-count lobby-details">{`${game.attributes.number_of_questions} Questions`}</h2>
        <h2 className="join-url-heading lobby-details">
          Share the Link to invite players!
        </h2>
        <div className="join-url-container">
          <p onClick={copyURL} className="join-url">
            Copy Link
          </p>
          <button id="copy-url-btn" onClick={copyURL} title="Copy game link">
            <Copy />
          </button>
        </div>
        <button className="start-game-btn" onClick={startGame}>
          Start Game!
        </button>
      </section>
      <section className="players">
        <h2 className="players-heading">Players</h2>
        {playerNames.length && playerNames}
      </section>
      {countdown && <h1 className="countdown">{countdown}</h1>}
    </main>
  );
}

export default Lobby;
