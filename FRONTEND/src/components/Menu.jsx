import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as Api from '../services/Api';
import * as Mensajes from '../services/Mensajes';
import {
    ImgContingencia, ImgDocumento, ImgForo, ImgCalendar,
    ImgReport, ImgLog, ImgUsers, ImgProfile, ImgAbout, ImgExit
} from '../services/Icons';
import './Menu.css';

function Menu({ setIsAuthenticated, tipo, userData, token }) {
    const navigate = useNavigate();
    const [showDropdown2, setShowDropdown2] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();
        const resultado = await Mensajes.confirmarSalida();

        if (resultado.isConfirmed) {
            try {
                await Api.logout(token);
                setIsAuthenticated(false);
                navigate('/');
            } catch (error) {
                console.error("Error en logout:", error.message);
                Mensajes.showErrorPersonalizado("No se pudo cerrar la sesión en el servidor, pero saldremos del sistema.");
                setIsAuthenticated(false);
                navigate('/');
            }
        }
    };

    return (
        <div className="menu-bar">
            <div className="head-menu">
                <h2>Plataforma Web Centralizada</h2>
            </div>

            <ul>
                {tipo === "1" && (
                    <>
                        <li className="li-menu">
                            <Link to="/Blog">
                                <ImgContingencia />
                                Contingencia
                            </Link>
                        </li>
                        <li className="li-menu">
                            <Link to="/Doc">
                                <ImgDocumento />
                                Documentos
                            </Link>
                        </li>
                        <li className="li-menu">
                            <Link to="/Foro">
                                <ImgForo />
                                Foro Técnico
                            </Link>
                        </li>
                        <li className="li-menu">
                            <Link to="/Calendario">
                                <ImgCalendar />
                                Calendario
                            </Link>
                        </li>
                        <li
                            className="dropdown-container-repo li-menu"
                            onMouseEnter={() => setShowDropdown2(true)}
                            onMouseLeave={() => setShowDropdown2(false)}
                        >
                            <button
                                type="button"
                                className="dropdown-trigger"
                                onClick={(e) => e.preventDefault()}
                            >
                                <ImgReport />
                                Reportes
                            </button>
                            {showDropdown2 && (
                                <ul className="dropdown-menu-repo">
                                    <li className="li-repo"><Link to="/Reporte1">Contingencia</Link></li>
                                    <li className="li-repo"><Link to="/Reporte2">Foro-Técnico</Link></li>
                                    <li className="li-repo"><Link to="/Reporte3">Calendario</Link></li>
                                    <li className="li-repo"><Link to="/Reporte4">Histórico</Link></li>
                                </ul>
                            )}
                        </li>
                    </>
                )}

                {tipo === "1" && userData?.rol_id === 1 && (
                    <>
                        <li className="li-menu">
                            <Link to="/Logs">
                                <ImgLog />
                                Histórico
                            </Link>
                        </li>
                        <li className="li-menu">
                            <Link to="/Usuarios">
                                <ImgUsers />
                                Usuarios
                            </Link>
                        </li>
                    </>
                )}

                <li className="li-menu">
                    <Link to="/Perfil">
                        <ImgProfile />
                        Perfil
                    </Link>
                </li>
                <li className="li-menu">
                    <Link to="/Acerca">
                        <ImgAbout />
                        Acerca
                    </Link>
                </li>

                {tipo === "1" && (
                    <li className="li-menu">
                        <button onClick={handleLogout} className="logout-link">
                            <ImgExit />
                            Salir
                        </button>
                    </li>
                )}
            </ul>

            <div className="footer-bar-menu">
                <h4>Usuario: <span>{userData ? userData.name : 'Invitado'}</span></h4>
                <h4>Rol: <span>{userData ? userData.rol?.rol : "Invitado"}</span></h4>
            </div>
        </div>
    );
}

export default Menu;