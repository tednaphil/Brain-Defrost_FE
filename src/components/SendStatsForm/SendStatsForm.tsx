import "./SendStatsForm.css";
import { useState } from "react";
import { XCircle } from "react-feather";

interface Props {
    closeForm: () => void;
}

function SendStatsForm({closeForm}: Props) {
    const [emailInput, setEmailInput] = useState<string>('');
    //add timeout to close modal after submission after x amount of time has passed

    return (
        <dialog open className="form-modal">
            <button className="close-btn" onClick={closeForm}><XCircle></XCircle></button>
            <h2>Send me theee stats</h2>
            <form>
                <input autoFocus type='text' placeholder="brainiac@example.com" value={emailInput} onChange={(e) => {setEmailInput(e.target.value)}}></input>
                <button className="submit-btn">Submit</button>
            </form>
        </dialog>
    )
}

export default SendStatsForm