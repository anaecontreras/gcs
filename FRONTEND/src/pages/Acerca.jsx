import Head from '../components/Head';
import BarraMenu from './../components/BarraMenu';
import './Acerca.css';

// Importamos la misma imagen de fondo que usa Reporte1 para mantener consistencia visual
import fondoReportes from '../assets/image/img_reportes.webp';

function Acerca({ userData }) {
    return (
        <div className="contenedor-ppal">
            <Head />
            <BarraMenu tipo="2" userData={userData} />

            {/* Envoltorio con fondo: misma estructura que Reporte1 para consistencia */}
            <div className="wrapper-fondo-reporte">
                {/* Capa de fondo con la imagen importada */}
                <div
                    className="fondo-reporte-local"
                    style={{ backgroundImage: `url(${fondoReportes})` }}
                ></div>

                {/* Tarjeta de contenido: va encima del fondo, con estilo oscuro propio de esta página */}
                <div className="contenedor-acerca">
                    <h1>Acerca</h1>
                    <h3>Gestión de Contingencias Satelitales (GCS)</h3>
                    <h5>Versión 1.1.0</h5>
                    <p>El GCS es una plataforma web de alto desempeño diseñada para la optimización y unificación de la gestión operativa en la infraestructura satelital de CANTV. Su propósito fundamental es actuar como un nodo de información crítico, eliminando la fragmentación de datos y centralizando el control de eventos técnicos en una interfaz robusta y confiable.</p>
                    <p>Desarrollado por: Ana Contreras, Diana Sierra y Darwin Colmenares</p>
                </div>
            </div>

        </div>
    )
}

export default Acerca;