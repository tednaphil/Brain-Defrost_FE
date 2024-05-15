import "./QuestionForm.css";
import type { Question } from "../Util/interfaces";

interface Props {
  currentQuestion: Question;
}

function QuestionForm({ currentQuestion }: Props) {
  //map through answer options to return answer option inputs to render
  //in the form
  function nextQuestion(){

  }
  return (
    <>
      <h2 className="question">{currentQuestion.attributes.question_text}</h2>
      <form className="question-form">
        {/* answer options here */}
        <label
          htmlFor="option-1"
          className="option-label"
          style={{ backgroundColor: "#d9534f" }}
        >
          <input type="radio" name="option-1" className="question-input" required/>
          <span>Option</span>
        </label>
        <label
          htmlFor="option-2"
          className="option-label"
          style={{ backgroundColor: "#0275d8" }}
        >
          <input type="radio" name="option-2" className="question-input" required/>
          <span>Option</span>
        </label>
        <label
          htmlFor="option-3"
          className="option-label"
          style={{ backgroundColor: " #5cb85c" }}
        >
          <input type="radio" name="option-3" className="question-input" required/>
          <span>Option</span>
        </label>
        <label
          htmlFor="option-4"
          className="option-label"
          style={{ backgroundColor: "#f0ad4e" }}
        >
          <input type="radio" name="option-4" className="question-input" required/>
          <span>Option</span>
        </label>

        <button onClick={e => nextQuestion()}className="submit-answer-btn" type="submit">
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
