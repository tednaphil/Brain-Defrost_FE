import React, { FormEvent, useState } from "react";
import "./Home.css";
import Modal from "../Alert/Alert";
import { useNavigate } from "react-router-dom";
import { postGame } from "../Util/fetchCalls";
import type { Game, Player } from "../Util/interfaces";

interface Props {
  setGame: (game: Game) => void;
  setPlayers: (playersArray: Player[]) => void;
  // setError: (error: string) => void
}

function Home({ setGame, setPlayers/*, setError*/ }: Props) {
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    topic: "",
    number_of_questions: 1,
    time_limit: 30,
    number_of_players: 1,
    display_name: "",
  });
/*
  const socket = new WebSocket("ws://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games");

  socket.addEventListener("open", (event) => {
    socket.send("Connection established");
  });

  socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
  });
  */
  const Navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createGame();
    setFormData({
      topic: "",
      number_of_questions: 1,
      time_limit: 30,
      number_of_players: 1,
      display_name: "",
    })
  };

  const createGame = async () => {
    const gameSpecs = {
      topic: formData.topic,
      number_of_questions: Number(formData.number_of_questions),
      time_limit: formData.time_limit,
      number_of_players: Number(formData.number_of_players),
      display_name: formData.display_name,
    };

    try {
      const newGame = await postGame(gameSpecs);
      setGame(newGame.data);
      setPlayers([newGame.data.relationships.players.data[0]]);
      sessionStorage.setItem("game", JSON.stringify(newGame.data));
      sessionStorage.setItem(
        "players",
        JSON.stringify([newGame.data.relationships.players.data[0]])
      );
      const gameID = newGame.data.id;
      Navigate(`game/lobby/${gameID}`, { state: newGame.data });
      console.log("newGame", newGame);
    } catch (error) {
      setError(`${error}`);
      //display modal
      console.log(error);
    }
  };

    
  return (
    <div className="home">
      {error && <Modal setError={setError} alert={error}/>}
      <h2 className="form-title">Generate A New Trivia Game!</h2>
      <form className="create-game-form" onSubmit={handleSubmit}>
        <section>
          <label htmlFor="name"> Choose a display name</label>
          <input
            type="text"
            className="name-input"
            id="name"
            name="display_name"
            placeholder="Brainiac"
            value={formData.display_name}
            onChange={handleChange}
            required
          />
        </section>
        <div className="form-holder">
          <section>
            <input
              type="text"
              name="topic"
              id="topic"
              placeholder="music"
              value={formData.topic}
              onChange={handleChange}
              required
            />
            <label htmlFor="topic">Topic</label>
          </section>
          <section>
            <input
              type="number"
              name="number_of_players"
              id="players"
              min="1"
              max="30"
              placeholder="1"
              value={formData.number_of_players}
              onChange={handleChange}
              required
            />
            <label htmlFor="players">How many players</label>
          </section>
          <section>
            <input
              type="number"
              name="number_of_questions"
              id="questions"
              min="1"
              max="25"
              placeholder="1"
              value={formData.number_of_questions}
              onChange={handleChange}
              required
            />
            <label htmlFor="questions">How many Questions</label>
          </section>
        </div>
        <button className="create-btn" type="submit">
          Create
        </button>
      </form>
      <footer>
        <h4 className="footer-title">More info about Brain Defrost</h4>
      </footer>
    </div>
  );
}

export default Home;
