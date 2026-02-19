import Head from '../components/Head';
import BarraMenu from './../components/BarraMenu';
import './Perfil.css';
import FormUser from './../components/FormUser';

function Perfil({ userData, token, setUserData, setToken }) {
    return (
        <div className="contenedor-ppal">
            <Head />
            <BarraMenu tipo="2" userData={userData} />

            <FormUser userData={userData} token={token} setUserData={setUserData} setToken={setToken} />

        </div>
    )
}

export default Perfil