import "./Game.css";
import { useEffect, useState } from "react";
import type { Question } from "../Util/interfaces";
import {useLocation, useNavigate, useParams } from "react-router-dom";
import QuestionForm from "../QuestionForm/QuestionForm";
import Intermission from "../Intermission/Intermission";

function Game() {
  const location = useLocation();
  const Navigate = useNavigate();
  const { gameid } = useParams();
  const sessionGame = location.state;
  const [questionCounter, setQuestionCounter] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(
    sessionGame.relationships.questions.data.find(
      (question: Question) =>
        question.attributes.question_number === questionCounter
    )
  );
  const [currentAnswer, setCurrentAnswer] = useState(
    sessionGame.relationships.questions.data.find(
      (question: Question) => question.attributes.question_number === 1
    )?.attributes.answer
  );

  const [isRoundGoing, setIsRoundGoing] = useState(true);

  useEffect(() => {
    if (!isRoundGoing) {
      nextQuestion();
    }
  }, [isRoundGoing]);

  function nextQuestion() {
    const newQuestionCounter = questionCounter + 1;
    setQuestionCounter(newQuestionCounter);

    const nextQuestion = sessionGame.relationships.questions.data.find(
      (question: Question) =>
        question.attributes.question_number === newQuestionCounter
    );

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
      setCurrentAnswer(nextQuestion.attributes.answer);
    } else {
      Navigate(`/game/results/${gameid}`);
    }
  }

  return (
    <>
      {isRoundGoing ? (
        <QuestionForm
          currentQuestion={currentQuestion}
          isRoundGoing={isRoundGoing}
          setIsRoundGoing={setIsRoundGoing}
        />
      ) : (
        <Intermission
          isRoundGoing={isRoundGoing}
          setIsRoundGoing={setIsRoundGoing}
          correctAnswer={currentAnswer}
        />
      )}
    </>
  );
}

export default Game;
