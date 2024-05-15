import "./Game.css";
import { useState } from "react";
import type { Question } from "../Util/interfaces";
import { useLocation } from "react-router-dom";
import QuestionForm from "../QuestionForm/QuestionForm";

function Game() {
  const location = useLocation();
  const sessionGame = location.state;
  const [questionCounter, setQuestionCounter] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(
    sessionGame.relationships.questions.data.find(
      (question: Question) =>
        question.attributes.question_number === questionCounter
    )
  );
// this should work but i cant really test becuase i cant get postman to send more then 1 question even though i updated the data no clue
  function nextQuestion() {
    const nextCounter = questionCounter + 1;
    const nextQuestion = sessionGame.relationships.questions.data.find(
      (question: Question) =>
        question.attributes.question_number === nextCounter
    );

    if (nextQuestion) {
      setQuestionCounter(nextCounter);
      setCurrentQuestion(nextQuestion);
    } else {
      console.log("No more questions.");
    }
  }

  return (
    <>
      {currentQuestion &&
        <QuestionForm
          currentQuestion={currentQuestion}
          nextQuestion={nextQuestion}
        />
      }
    </>
  );
}

export default Game;
