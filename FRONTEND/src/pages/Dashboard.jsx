import Head from '../components/Head';
import Foot from '../components/Foot';
import Menu from './../components/Menu';

import portada from '../assets/image/portada.png'

function Dashboard({ isAuthenticated, setIsAuthenticated, userData, token, setToken }) {
    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <div className="contenedor-ppal">
            <Head />
            <Menu setIsAuthenticated={setIsAuthenticated} tipo="1" userData={userData} token={token} />

            <div className="contenedor-medio">
                <img className='portada' src={portada} alt="Cintillo Mincyt" />
            </div>

            <Foot tipo="1" token={token} setToken={setToken} />
        </div>
    )
}

export default Dashboard