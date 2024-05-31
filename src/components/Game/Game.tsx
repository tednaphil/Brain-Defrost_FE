import "./Game.css";
import { useState } from "react";
import type { Player, Question } from "../Util/interfaces";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuestionForm from "../QuestionForm/QuestionForm";
import Intermission from "../Intermission/Intermission";
import { patchPlayer, getAllPlayers } from "../Util/fetchCalls";

function Game() {
  const location = useLocation();
  const Navigate = useNavigate();
  const { gameid } = useParams();
  const sessionGame = location.state;
  const [questionCounter, setQuestionCounter] = useState(1);
  const [usersRight, setUsersRight] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(
    sessionGame.relationships.questions.data.find(
      (question: Question) =>
        Number(question.attributes.question_number) === questionCounter
    )
  );

  //@ts-expect-error
  const currentPlayer = JSON.parse(sessionStorage.getItem("currentPlayer"));
  // console.log({currentPlayer});

  const [currentAnswer, setCurrentAnswer] = useState(
    sessionGame.relationships.questions.data.find(
      (question: Question) => Number(question.attributes.question_number) === 1
    )?.attributes.answer
  );
  const [isRoundGoing, setIsRoundGoing] = useState(true);

  function nextQuestion() {
    const newQuestionCounter = questionCounter + 1;
    setQuestionCounter(newQuestionCounter);

    const nextQuestion = sessionGame.relationships.questions.data.find(
      (question: Question) =>
        Number(question.attributes.question_number) === newQuestionCounter
    );

    if (nextQuestion) {
      setUsersRight([]);
      setCurrentQuestion(nextQuestion);
      setCurrentAnswer(nextQuestion.attributes.answer);
    } else {
      Navigate(`/game/results/${gameid}`);
    }
  }
  const checkAnswer = async (ans: string) => {
    if (ans === currentAnswer) {
      const currentPlayerId = currentPlayer.id.toString();
      console.log('check answer')
      console.log(typeof(currentPlayerId))
      //  //@ts-expect-error
      // const currentPlayer = JSON.parse(sessionStorage.getItem("currentPlayer"))
      // console.log({currentPlayer})
      const updatedPlayer = await patchPlayer(gameid!, currentPlayerId!, currentQuestion);
      console.log(updatedPlayer);
      //pass currentPlayer id in patchPlayer
      // console.log(JSON.parse(sessionStorage.getItem("currentPlayer")))
    }
    const playersList = await getAllPlayers(gameid);
    console.log('playersList', playersList);
    let rightUsers = playersList.data.filter((player:Player ) =>
      player.attributes.questions_correct.some(
        // (qNum: string) => qNum === questionCounter.toString()
        (qNum: string) => qNum.includes(questionCounter.toString()) 
        //waiting for fix from BE team for to have access to question objects instead of strings
        //refactor this line to access the question number on the object to compare to the questionCounter
      )
    );
    if (rightUsers) {
      setUsersRight(
        rightUsers.map((player: Player) => player.attributes.display_name)
      );
    }
  };
  return (
    <>
      {isRoundGoing ? (
        <QuestionForm
          currentQuestion={currentQuestion}
          isRoundGoing={isRoundGoing}
          setIsRoundGoing={setIsRoundGoing}
          checkAnswer={checkAnswer}
        />
      ) : (
        <Intermission
          isRoundGoing={isRoundGoing}
          setIsRoundGoing={setIsRoundGoing}
          correctAnswer={currentAnswer}
          usersRight={usersRight}
          nextQuestion={nextQuestion}
        />
      )}
    </>
  );
}

export default Game;
