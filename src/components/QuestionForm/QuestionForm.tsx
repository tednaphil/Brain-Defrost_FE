import './QuestionForm.css';
import type { Question } from '../Util/interfaces';

interface Props {
    currentQuestion: Question
}

function QuestionForm({currentQuestion}: Props) {
    //map through answer options to return answer option inputs to render
    //in the form
    return (
        <>
        <h2>{currentQuestion.attributes.question_text}</h2>
        <form>
            {/* answer options here */}
            <button className="submit-answer-btn" type="submit">
            Submit
            </button>
        </form>
        <p>{currentQuestion.attributes.question_number}</p>
        </>
    )
}

export default QuestionForm