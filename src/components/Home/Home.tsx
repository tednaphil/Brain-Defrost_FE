import './Home.css';

function Home() {
    return (
        <>
        <form>
            <label htmlFor = "category"> Select A Category </label>
            <input type = "text" name = "category"/>
            <label htmlFor = "players"> How many players? </label>
            <input type =" number" name = "players"/>
            <label htmlFor = "questions"> How many Questions </label>
            <input type = "number" name = "questions"/>
            <button type = "submit">Create</button>
        </form>
        </>
    )
}

export default Home