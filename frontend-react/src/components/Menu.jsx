import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as Api from '../services/Api';
import * as Mensajes from '../services/Mensajes';

function Menu({ setIsAuthenticated, tipo, userData, token }) {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false); // visibilidad del menú dropdown
    const [showDropdown2, setShowDropdown2] = useState(false); // visibilidad del menú dropdown

    const handleLogout = async (e) => {
        e.preventDefault();

        const resultado = await Mensajes.confirmarSalida();

        if (resultado.isConfirmed) {
            try {
                // 2. Llamada a la API para invalidar el token en el backend
                await Api.logout(token);

                // 3. Limpiamos el estado en el frontend
                setIsAuthenticated(false);
                navigate('/');
            } catch (error) {
                // Si falla la red, igual cerramos sesión localmente o avisamos
                console.error("Error en logout:", error.message);
                Mensajes.showErrorPersonalizado("No se pudo cerrar la sesión en el servidor, pero saldremos del sistema.");

                // Forzamos salida local aunque falle la API
                setIsAuthenticated(false);
                navigate('/');
            }
        }
    };

    const handleReturn = (e) => {
        e.preventDefault(); // Previene el comportamiento normal del enlace
        navigate('/Dashboard');
    };

    return (
        <div className="menu-bar">
            <ul>
                {tipo !== "2" ? (
                    <>
                        <li><Link to="/Blog">Blog</Link></li>
                        <li><Link to="/Foro">Foro</Link></li>
                        <li><Link to="/Doc">Documentos</Link></li>
                        <li><Link to="/Calendario">Calendario</Link></li>
                        <>
                            <li
                                className="dropdown-container-repo"
                                onMouseEnter={() => setShowDropdown2(true)}
                                onMouseLeave={() => setShowDropdown2(false)}
                            >
                                <a
                                    href="#!"
                                    className="dropdown-trigger-repo"
                                    onClick={(e) => e.preventDefault()} // Evita cualquier salto
                                    style={{ cursor: 'default' }}       // Opcional: indica que no es clickeable
                                >
                                    Reportes
                                </a>

                                {showDropdown2 && (
                                    <ul className="dropdown-menu-repo">
                                        <li><Link to="/Reporte1">Reporte de Eventos en Blog</Link></li>
                                        <li><Link to="/Reporte2">Reporte del Temas en Foro</Link></li>
                                        <li><Link to="/Reporte3">Reporte de Eventos Programados</Link></li>
                                    </ul>
                                )}
                            </li>
                        </>





                        <li><Link to="/Acerca">Acerca</Link></li>
                    </>
                ) : null}


                {tipo === "1" && userData.rol_id === 1 ? (
                    <>
                        <span className='separador-admin'>|</span>

                        <li
                            className="dropdown-container"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <a
                                href="#!"
                                className="dropdown-trigger"
                                onClick={(e) => e.preventDefault()} // Evita cualquier salto
                                style={{ cursor: 'default' }}       // Opcional: indica que no es clickeable
                            >
                                Administración
                            </a>

                            {showDropdown && (
                                <ul className="dropdown-menu">
                                    <li><Link to="/Usuarios">Usuarios y Roles</Link></li>
                                    <li><Link to="/Logs">Historial de Actividades</Link></li>
                                    <li><Link to="/Reporte4">Reporte de Histórial Actividades</Link></li>
                                </ul>
                            )}
                        </li>

                        <span className='separador-admin'>|</span>
                    </>
                ) : null}

                {tipo === "1" ? (
                    <li>
                        <a href="#" onClick={handleLogout} className="logout-link">
                            Salir
                        </a>
                    </li>
                ) : null}



                {tipo === "2" ? (
                    <li>
                        <a
                            href="#"
                            onClick={handleReturn}
                            className="logout-link"
                        >
                            ⬅ Regresar
                        </a>
                    </li>
                ) : null}

            </ul>
            <span>Usuario: <strong>{userData ? userData.name : 'Invitado'}</strong>  | Rol: <strong>{userData ? userData.rol.rol : "Invitado"}</strong></span>
        </div>
    )
}

export default Menu