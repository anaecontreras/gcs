import Head from '../components/Head';
import Foot from '../components/Foot';
import Menu from '../components/Menu';

function Acerca({ isAuthenticated, setIsAuthenticated, userData }) {
    return (
        <div className="contenedor-ppal">
            <Head />
            <Menu tipo="2" userData={userData} />

            <div className="contenedor-medio contenedor-acerca">
                <h1>Acerca</h1>
                <h3>Gestión de Contingencias Satelitales (GCS)</h3>
                <h5>Versión 1.0.0 (MVP)</h5>
                <p>Plataforma web centralizada diseñada para la optimización y unificación de la gestión operativa de contingencias en la infraestructura satelital de CANTV. Este sistema actúa como un nodo de información crítico que conecta las unidades operativas de Caracas, Camatagua y Baemari, garantizando la trazabilidad y la continuidad del servicio de telecomunicaciones nacional.</p>
            </div>

            <Foot />
        </div>
    )
}

export default Acerca