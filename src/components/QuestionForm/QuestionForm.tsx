import "./QuestionForm.css";
import type { Question } from "../Util/interfaces";

interface Props {
  currentQuestion: Question;
}

function QuestionForm({ currentQuestion }: Props) {
  //map through answer options to return answer option inputs to render
  //in the form
  return (
    <>
      <h2 className="question">{currentQuestion.attributes.question_text}</h2>
      <form className="question-form">
        {/* answer options here */}
        <label
          htmlFor="question-1"
          className="question-label"
          style={{ backgroundColor: "#d9534f" }}
        >
          <input type="radio" name="question-1" className="question-input" />
          <span>Option</span>
        </label>
        <label
          htmlFor="question-2"
          className="question-label"
          style={{ backgroundColor: "#0275d8" }}
        >
          <input type="radio" name="question-2" className="question-input" />
          <span>Option</span>
        </label>
        <label
          htmlFor="question-3"
          className="question-label"
          style={{ backgroundColor: " #5cb85c" }}
        >
          <input type="radio" name="question-3" className="question-input" />
          <span>Option</span>
        </label>
        <label
          htmlFor="question-4"
          className="question-label"
          style={{ backgroundColor: "#f0ad4e" }}
        >
          <input type="radio" name="question-4" className="question-input" />
          <span>Option</span>
        </label>

        <button className="submit-answer-btn" type="submit">
          Submit
        </button>
      </form>
      <p className="question-number">
        {currentQuestion.attributes.question_number}
      </p>
    </>
  );
}

export default QuestionForm;
