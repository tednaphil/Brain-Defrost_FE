import "./Home.css";

function Home() {
  let categoryPlaceholder = "History";


  
  return (
    <div className="home">
      <h2 className="form-title">Generate A New Trivia Game!</h2>
      <form>
        <section>
          <label htmlFor="category"> Select A Category </label>
          <input type="text" name="category" required />
        </section>
        <div className="form-holder">
          <section>
            <p className="category-display">{categoryPlaceholder}</p>
            <label htmlFor="category-display">Category</label>
          </section>
          <section>
            <input
              type="number"
              name="players"
              min="1"
              max="30"
              placeholder="1"
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
