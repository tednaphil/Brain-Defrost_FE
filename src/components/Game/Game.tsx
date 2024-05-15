import './Game.css';
// import { useState } from 'react';
import type { Question } from '../Util/interfaces';
import { useLocation } from 'react-router-dom';
import QuestionForm from '../QuestionForm/QuestionForm';

function Game() {
    const location = useLocation();
    // const [sessionGame, setSessionGame] = useState(location.state);
    const sessionGame = location.state;
    console.log({sessionGame})
    const questionCounter = 1;
    const currentQuestion = sessionGame.relationships.questions.data.find((question: Question) => question.attributes.question_number === questionCounter)
    console.log(currentQuestion)
    return (
        <>
        <QuestionForm currentQuestion={currentQuestion}/>
        </>
    )
}

export default Game