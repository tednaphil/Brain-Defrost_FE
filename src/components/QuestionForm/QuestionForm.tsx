import "./QuestionForm.css";
import type { Question } from "../Util/interfaces";
import { useEffect, useState } from "react";
import splat from "../../images/Star 1.png";

interface Props {
  currentQuestion: Question;
  isRoundGoing: Boolean;
  setIsRoundGoing: React.Dispatch<React.SetStateAction<boolean>>;
  checkAnswer: (ans: string) => void;
}

function QuestionForm({
  currentQuestion,
  isRoundGoing,
  setIsRoundGoing,
  checkAnswer,
}: Props) {

  const [isLockedIn, setIsLockedIn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState<string>("");

  function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedOption(e.target.value);
  }

  function roundTimer() {
    setTimeLeft(20);
    const timer = setInterval(() => {
      setTimeLeft((preTimeLeft) => preTimeLeft - 1);
    }, 1000);
    if (!isRoundGoing) {
      clearInterval(timer);
    }
  }

  useEffect(() => {
    if (timeLeft === 0) {
      checkAnswer(selectedOption);
      setIsRoundGoing(false);
    }
    // eslint-disable-next-line
  }, [timeLeft]);

  useEffect(() => {
    roundTimer();
    // eslint-disable-next-line
  }, []);

  let answerOptions = currentQuestion.attributes.options.map((option, index) => {
    return (
      <label htmlFor={`option${index}`} className="option-label" key={`option${index}`}>
            <input
              type="radio"
              name="option"
              className="option-input"
              id={`option${index}`}
              onChange={handleOptionChange}
              disabled={isLockedIn}
              value={option}
              required
            />
            <span>{option}</span>
          </label>
    )
  })

  return (
    <>
      <div className="question-form-holder">
        <h2 className="question">{currentQuestion.attributes.question_text}</h2>
        <div className ="timer-display" style={{ backgroundImage: `url(${splat})` }}>
          <p className="time-left">Time Left:<br></br>{timeLeft}</p>
        </div>
        <form className="question-form">
          {answerOptions}
          <button
            disabled={isLockedIn}
            onClick={(e) => {
              e.preventDefault();
              setIsLockedIn(true);
            }}
            className="submit-answer-btn"
            type="button"
          >
            {isLockedIn ? <span>Locked In</span> : <span>Lock in?</span>}
          </button>
        </form>
        <p className="question-number">
          {currentQuestion.attributes.question_number}
        </p>
      </div>
    </>
  );
}

export default QuestionForm;
