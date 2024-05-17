import { useEffect, useState } from "react";
import "./Intermission.css";
import splat from "../../images/Star 1.png";
interface Props {
  isRoundGoing: boolean;
  setIsRoundGoing: React.Dispatch<React.SetStateAction<boolean>>;
  correctAnswer: string;
  usersRight: string[];
  nextQuestion: () => void;
}
function Intermission({
  isRoundGoing,
  setIsRoundGoing,
  correctAnswer,
  usersRight,
  nextQuestion,
}: Props) {
  const [intermissionTimer, setIntermissionTimer] = useState(5);

  function roundTimer() {
    setIntermissionTimer(5);
    const timer = setInterval(() => {
      setIntermissionTimer((preTimeLeft) => preTimeLeft - 1);
    }, 1000);
    if (isRoundGoing) {
      clearInterval(timer);
    }
  }

  function displayUsers() {
    return usersRight.map((user: string, index: number) => {
      return <h3 key={index}>{user}</h3>;
    });
  }

  useEffect(() => {
    console.log(correctAnswer);
    roundTimer();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (intermissionTimer === 0) {
      nextQuestion();
      setIsRoundGoing(true);
    }
    // eslint-disable-next-line
  }, [intermissionTimer]);

  return (
    <>
      <p className="time-left">{intermissionTimer}</p>
      <div className="intermission-holder">
        <section className="correct-answer-holder">
          <h2>The Correct Answer Is:</h2>
          <div className ="correct-answer-display" style={{ backgroundImage: `url(${splat})` }}>
          <h3>
            {correctAnswer}
          </h3>
          </div>
        </section>
        <section className="correct-player-display">
          <h2>Who got It Right?</h2>
          <ul>
            {usersRight.length > 0 ? (
              displayUsers()
            ) : (
              <h3>No one got it right!</h3>
            )}
          </ul>
        </section>
      </div>
    </>
  );
}

export default Intermission;
