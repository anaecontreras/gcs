import cintillo from '../assets/image/cintillo Mincyt.png'
import cantv from '../assets/image/Cantv.PNG'
import './Head.css'

function Head() {
    return (
        <div className='head-container'>
            <img className='cintillo' src={cintillo} alt="Cintillo Mincyt" />
            <img className='logo' src={cantv} alt="Logo CANTV" />
        </div>
    )
}

export default Head