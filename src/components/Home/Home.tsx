import React, { FormEvent, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    players: "",
    questions: ""
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
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="name"> Choose a display name</label>
          <input
            type="text"
            className="name-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </section>
        <div className="form-holder">
          <section>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <label htmlFor="category"> Select A Category </label>
          </section>
          <section>
            <input
              type="number"
              name="players"
              min="1"
              max="30"
              placeholder="1"
              value={formData.players}
              onChange={handleChange}
              required
            />
            <label htmlFor="players">How many players</label>
          </section>
          <section>
            <input
              type="number"
              name="questions"
              min="1"
              max="25"
              placeholder="1"
              value={formData.questions}
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
