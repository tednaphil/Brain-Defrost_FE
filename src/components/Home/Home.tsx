import React, { FormEvent, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
// import { postGame } from "../Util/fetchCalls";

function Home() {
  const [formData, setFormData] = useState({
    topic: '',
    number_of_questions: 1,
    time_limit: 30,
    number_of_players: 1,
    display_name: ''
  });

  const Navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    createGame();
  };

  function createGame() {

    console.log("I made a fetchcall!")
    Navigate(`Game/Lobby/${101213}`)
  }

  return (
    <div className="home">
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
              id="category"
              placeholder="music"
              value={formData.topic}
              onChange={handleChange}
              required
            />
            <label htmlFor="category">Category</label>
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
