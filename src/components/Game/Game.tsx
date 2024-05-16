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
  const [isRoundGoing, setIsRoundGoing] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5);
  const [intermission, setIntermission] = useState(20);
/*
For some reson the set time left isnt working / isnt updating our variable 
*/
  function roundTimer() {
    const timer = setInterval(() => {
      if (isRoundGoing && timeLeft > 0) {
        setTimeLeft(10)
        console.log( setTimeLeft(10))
      } else if (timeLeft === 0) {
        clearInterval(timer);
        setIsRoundGoing(false);
        console.log("hi");
      }
    }, 1000);
  }

  function nextQuestion() {
    setQuestionCounter(questionCounter + 1);
    if (questionCounter) {
      setCurrentQuestion(
        sessionGame.relationships.questions.data.find(
          (question: Question) =>
            question.attributes.question_number === questionCounter
        )
      );
    } else {
      console.log("No more questions.");
    }
  }

  return (
    <>
      {currentQuestion && (
        <QuestionForm
          currentQuestion={currentQuestion}
          roundTimer={roundTimer}
          timeLeft={timeLeft}
        />
      )}
    </>
  );
}

export default Game;
