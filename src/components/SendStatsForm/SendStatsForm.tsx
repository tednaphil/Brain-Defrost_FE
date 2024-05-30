import "./SendStatsForm.css";
import { useState } from "react";
import { XCircle } from "react-feather";

interface Props {
    closeForm: () => void;
    gameId: string | undefined;
}

function SendStatsForm({closeForm, gameId}: Props) {
    const [emailInput, setEmailInput] = useState<string>('');
    // const [succesfulSubmission, setSuccessfulSubmission] = useState<boolean | null>(null);

    const submitEmail = async () => {
        const requestBody = {
            email: emailInput,
            gameId
        };
        console.log(requestBody)
        //submit network request
        //if response ok, setSuccesfulSubmission to true
        //if response not ok, setSuccesfulSubmission to false
            //consider also setting an error for more descriptive feedback
    }

    return (
        <dialog open className="form-modal">
            <button title='Close' className="close-btn" onClick={closeForm}><XCircle color="#A5E6BA"></XCircle></button>
            <h2>Send me those stats!</h2>
            {/* have h2 render the confirmation message once email succesfully submitted */}
            {/* if submission unsuccesful(succesfulSubmission === false), h2 will display notification text */}
            <form className="send-results-form" onSubmit={submitEmail}>
                <label htmlFor="email">Enter your Email Address</label>
                <input autoFocus type='text' name='email' id='email' required placeholder="brainiac@example.com" value={emailInput} onChange={(e) => {setEmailInput(e.target.value)}}></input>
                <button className="submit-btn">Submit</button>
            </form>
        </dialog>
    )
}

export default SendStatsForm