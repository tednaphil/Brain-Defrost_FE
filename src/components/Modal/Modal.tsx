import "./Modal.css";
import brain from '../../images/VaporWaveBrain.png'

interface Props {
    alert: string,
    setError: (error: string) => void,
}

function Modal({alert, setError}: Props) {
    const handleClose = () => {
        setError('');
    };

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