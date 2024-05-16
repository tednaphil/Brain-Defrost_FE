import { useEffect, useState } from "react";
import "./Intermission.css";

interface Props {
  isRoundGoing: Boolean;
  setIsRoundGoing: React.Dispatch<React.SetStateAction<boolean>>;
  correctAnswer: string
}
function Intermission({ isRoundGoing, setIsRoundGoing, correctAnswer }: Props) {
  const [intermissionTimer, setIntermissionTimer] = useState(20);

  function roundTimer() {
    setIntermissionTimer(20);
    const timer = setInterval(() => {
      setIntermissionTimer((preTimeLeft) => preTimeLeft - 1);
    }, 1000);
    if (isRoundGoing) {
      clearInterval(timer);
    }
  }

  useEffect(() => {
    console.log(correctAnswer)
    roundTimer();
  }, []);

  useEffect(() => {
    if (intermissionTimer === 0) {
      setIsRoundGoing(true);
    }
  }, [intermissionTimer]);

  return (
    <>
      <p className="time-left">{intermissionTimer}</p>
      <div>
        <section>
            <h2>The Correct Answer Is</h2>
            <h3>{correctAnswer}</h3>
        </section>
        <section>
            <h2>Who got It Right</h2>
            <li>
                {/* list of right answers */}
            </li>
        </section>
      </div>
    </>
  );
}

export default Intermission;
