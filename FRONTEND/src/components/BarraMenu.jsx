import { useNavigate } from 'react-router-dom';

import { BtnReturn } from '../services/Icons';
import './BarraMenu.css'

function BarraMenu({ setIsAuthenticated, tipo, userData, token }) {
    const navigate = useNavigate();

    const handleReturn = (e) => {
        e.preventDefault(); // Previene el comportamiento normal del enlace
        navigate('/Dashboard');
    };

    return (
        <div className="menu-barra">
            <ul>
                <li>
                    <a
                        href="#"
                        onClick={handleReturn}
                        className="logout-link"
                    >
                        <BtnReturn /> <span style={{ marginLeft: '10px', fontSize: '1.2rem' }}>Regresar</span>
                    </a>
                </li>
            </ul>
            <span>Usuario: <strong>{userData ? userData.name : 'Invitado'}</strong>  | Rol: <strong>{userData ? userData.rol.rol : "Invitado"}</strong></span>
        </div>
    )
}

export default BarraMenu