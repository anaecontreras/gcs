import Head from '../components/Head';
import Foot from '../components/Foot';
import BarraMenu from './../components/BarraMenu';
import './Acerca.css';

function Acerca({ isAuthenticated, setIsAuthenticated, userData }) {
    return (
        <div className="contenedor-ppal">
            <Head />
            <BarraMenu tipo="2" userData={userData} />

            <div className="contenedor-acerca contenedor-medio">
                <h1>Acerca</h1>
                <h3>Gestión de Contingencias Satelitales (GCS)</h3>
                <h5>Versión 1.1.0</h5>
                <p>Plataforma web centralizada diseñada para la optimización y unificación de la gestión operativa de contingencias en la infraestructura satelital de CANTV. Este sistema actúa como un nodo de información crítico que conecta las unidades operativas de Caracas, Camatagua y Baemari, garantizando la trazabilidad y la continuidad del servicio de telecomunicaciones nacional.</p>
            </div>

        </div>
    )
}

export default Acerca