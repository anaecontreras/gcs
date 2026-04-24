import Head from '../components/Head';
import BarraMenu from './../components/BarraMenu';
import './Perfil.css';
import FormUser from './../components/FormUser';

function Perfil({ userData, token, setUserData, setToken }) {
    return (
        <div className="contenedor-ppal-perfil">
            <Head />
            <BarraMenu tipo="2" userData={userData} />

            <div className="contenedor-form">
                <FormUser userData={userData} token={token} setUserData={setUserData} setToken={setToken} />
            </div>



        </div>
    )
}

export default Perfil