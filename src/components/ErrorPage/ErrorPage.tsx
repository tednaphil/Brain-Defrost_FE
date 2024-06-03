import './ErrorPage.css';
import { Link } from 'react-router-dom';
import brain from '../../images/VaporWaveBrain.png'

interface Props {
    error: string | never
}

function ErrorPage({error}: Props) {
    
    return (
        <article className='error-page'>
            <img className='alert-img' src={brain} alt='vaporwave style brain illustration'/>
        <h2>Uh oh!</h2>
        <p>{error}</p>
        <Link to='/' className='error-close-btn' autoFocus>Home</Link>

        </article>
    )
}

export default ErrorPage