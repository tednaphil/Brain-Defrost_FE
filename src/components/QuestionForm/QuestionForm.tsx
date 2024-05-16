import "./QuestionForm.css";
import type { Question } from "../Util/interfaces";
import { useEffect, useState } from "react";

interface Props {
  currentQuestion: Question;
  roundTimer: () => void;
  timeLeft: number;
}

function QuestionForm({ currentQuestion, roundTimer, timeLeft }: Props) {
  // Map through answer options to return answer option inputs to render
  // in the form
  const [isLockedIn, setIsLockedIn] = useState(false);

  useEffect(() => {
    roundTimer()
  },[roundTimer])
  return (
    <>
      <h2 className="question">{currentQuestion.attributes.question_text}</h2>
      <p>{timeLeft}</p>
      <form className="question-form">
        {/* answer options here */}
        <label
          htmlFor="option1"
          className="option-label"
          style={{ backgroundColor: "#d9534f" }}
        >
          <input
            type="radio"
            name="option"
            className="option-input"
            id="option1"
            required
          />
          <span>Option 1</span>
        </label>
        <label
          htmlFor="option2"
          className="option-label"
          style={{ backgroundColor: "#0275d8" }}
        >
          <input
            type="radio"
            name="option"
            className="option-input"
            id="option2"
            required
          />
          <span>Option 2</span>
        </label>
        <label
          htmlFor="option3"
          className="option-label"
          style={{ backgroundColor: " #5cb85c" }}
        >
          <input
            type="radio"
            name="option"
            className="option-input"
            id="option3"
            required
          />
          <span>Option 3</span>
        </label>
        <label
          htmlFor="option4"
          className="option-label"
          style={{ backgroundColor: "#f0ad4e" }}
        >
          <input
            type="radio"
            name="option"
            className="option-input"
            id="option4"
            required
          />
          <span>Option 4</span>
        </label>

        <button
          disabled={isLockedIn}
          onClick={(e) => {
            e.preventDefault();
            setIsLockedIn(true)
            //nextQuestion();
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
    </>
  );
}

export default QuestionForm;
