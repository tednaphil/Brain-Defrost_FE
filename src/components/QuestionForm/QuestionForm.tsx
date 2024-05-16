import "./QuestionForm.css";
import type { Question } from "../Util/interfaces";
import { useEffect, useState } from "react";

interface Props {
  currentQuestion: Question;
  isRoundGoing: Boolean;
  setIsRoundGoing: React.Dispatch<React.SetStateAction<boolean>>;
  checkAnswer: (ans :string) => void
}

function QuestionForm({
  currentQuestion,
  isRoundGoing,
  setIsRoundGoing,
  checkAnswer
}: Props) {

  const [isLockedIn, setIsLockedIn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState<string>("");

  function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedOption(e.target.value);
  }

  function handleQuestionSubmit() {
    checkAnswer(selectedOption)
    
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
        <p className="time-left">{timeLeft}</p>
        <form className="question-form">
          {answerOptions}
          <button
            disabled={isLockedIn}
            onClick={(e) => {
              e.preventDefault();
              setIsLockedIn(true);
              handleQuestionSubmit();
            }}
            className="submit-answer-btn"
            type="button"
          >
            {isLockedIn ? <span>Locked In</span> : <span> Lock in?</span>}
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
