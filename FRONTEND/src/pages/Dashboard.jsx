import Head from '../components/Head';
import Menu from './../components/Menu';
import './Dashboard.css'
import * as Api from '../services/Api'; // Importamos tu servicio API
import * as Mensajes from '../services/Mensajes';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard({ isAuthenticated, setIsAuthenticated, userData, token, setToken }) {
    // Estados para los contadores
    const [stats, setStats] = useState({
        alertasActivas: 0,
        totalDocumentos: 0,
        hilosActivos: 0,
        eventosVigentes: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const cargarContadores = async () => {
            try {
                setLoading(true);
                // Una sola petición en lugar de cuatro
                const data = await Api.getDashboardStats(token);
                setStats(data);
            } catch (error) {
                console.error("Error cargando contadores:", error);
                // Mensajes.showError(error.message); // Si quieres avisar al usuario
            } finally {
                setLoading(false);
            }
        };

        cargarContadores();
    }, [token]);

    return (
        <div className="contenedor-ppal">
            <Head />

            <div className="contenedor-vertical">
                <div className="izquierda">
                    <Menu setIsAuthenticated={setIsAuthenticated} tipo="1" userData={userData} token={token} />
                </div>

                <div className="derecha">
                    {/* Contenedor interno para las 4 cards */}
                    <div className="grid-dashboard">
                        <div className="card shadow">
                            <h3>Alertas Activas</h3>
                            <strong>{loading ? "..." : stats.alertasActivas}</strong>
                            <Link to="/Blog">Gestionar Alertas</Link>
                        </div>
                        <div className="card shadow">
                            <h3>Documentos</h3>
                            <strong>{loading ? "..." : stats.totalDocumentos}</strong>
                            <Link to="/Doc">Explorar Archivos</Link>
                        </div>
                        <div className="card shadow">
                            <h3>Hilos Activos</h3>
                            <strong>{loading ? "..." : stats.hilosActivos}</strong>
                            <Link to="/Foro">Ir al Foro</Link>
                        </div>
                        <div className="card shadow">
                            <h3>Eventos Vigentes</h3>
                            <strong>{loading ? "..." : stats.eventosVigentes}</strong>
                            <Link to="/Calendario">Revisar Calendario</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard