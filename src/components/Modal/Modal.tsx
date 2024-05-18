import "./Modal.css";
import brain from '../../images/VaporWaveBrain.png'
// import { useState } from "react";

interface Props {
    alert: string,
    setError: (error: string) => void,
}

function Modal({alert, setError}: Props) {
    // const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        // setOpen(false);
        setError('');
    };

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    return (
        <dialog open className="alert-modal">
            <h2>Alert!</h2>
            <img className="alert-img" src={brain} alt="vaporwave style brain illustration"/>
            <p>{alert}</p>
            <button autoFocus className="close-btn" onClick={handleClose}>Close</button>
        </dialog>
    )

}

export default Modal