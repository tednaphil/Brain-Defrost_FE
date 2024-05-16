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
  // Map through answer options to return answer option inputs to render
  // in the form

  const [isLockedIn, setIsLockedIn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [selectedOption, setSelectedOption] = useState<string>("");

  function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedOption(e.target.value);
  }

  function handleQuestionSubmit() {
    checkAnswer(selectedOption)
    
  }

  function roundTimer() {
    setTimeLeft(5);
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

  return (
    <>
      <div className="question-form-holder">
        <h2 className="question">{currentQuestion.attributes.question_text}</h2>
        <p className="time-left">{timeLeft}</p>
        <form className="question-form">
          <label htmlFor="option1" className="option-label">
            <input
              type="radio"
              name="option"
              className="option-input"
              id="option1"
              onChange={handleOptionChange}
              value={currentQuestion.attributes.options[0]}
              required
            />
            <span>{currentQuestion.attributes.options[0]}</span>
          </label>
          <label htmlFor="option2" className="option-label">
            <input
              type="radio"
              name="option"
              className="option-input"
              id="option2"
              onChange={handleOptionChange}
              value={currentQuestion.attributes.options[1]}
              required
            />
            <span>{currentQuestion.attributes.options[1]}</span>
          </label>
          <label htmlFor="option3" className="option-label">
            <input
              type="radio"
              name="option"
              className="option-input"
              id="option3"
              onChange={handleOptionChange}
              value={currentQuestion.attributes.options[2]}
              required
            />
            <span>{currentQuestion.attributes.options[2]}</span>
          </label>
          <label htmlFor="option4" className="option-label">
            <input
              type="radio"
              name="option"
              className="option-input"
              id="option4"
              onChange={handleOptionChange}
              value={currentQuestion.attributes.options[3]}
              required
            />
            <span>{currentQuestion.attributes.options[3]}</span>
          </label>

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
