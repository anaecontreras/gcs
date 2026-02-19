import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Head from '../components/Head';
import Foot from '../components/Foot';
import InputLogin from './../components/InputLogin';
import ButtonLogin from './../components/ButtonLogin'
import * as Mensajes from '../services/Mensajes';
import * as Api from '../services/Api';
import { ImgUser, ImgPassword, ImgSatelite } from '../services/Icons';
import './Start.css'

function Start({ setIsAuthenticated, setUserData, setToken }) {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!user || !pass) {
            Mensajes.showErrorFaltanDatos();
            return;
        }

        setLoading(true);
        try {
            const data = await Api.login(user, pass);

            // Actualizar estado global y navegar
            setUserData(data.user);
            setToken(data.access_token);

            setIsAuthenticated(true);
            navigate('/Dashboard');

        } catch (error) {
            Mensajes.showErrorCredenciales(); // O usa error.message si quieres ser más específico
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='contenedor-ppal-start'>
            <Head />

            <div class="contenedor-login">
                <div class="div1">
                    <h1 style={{ marginBottom: '0.2rem' }}>Plataforma Web Centralizada</h1>
                    <h1 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Gestión de Contingencias Satelitales</h1>

                    <form onSubmit={handleLogin} className='form-login'>
                        <InputLogin
                            Imagen={ImgUser}
                            tipo="text"
                            place="Usuario"
                            val={user}
                            change={(e) => setUser(e.target.value)}
                        />

                        <InputLogin
                            Imagen={ImgPassword}
                            tipo="password"
                            place="Contraseña"
                            val={pass}
                            change={(e) => setPass(e.target.value)}
                        />

                        <ButtonLogin tipo="submit" texto="Entrar" btnType="one" />
                    </form>

                    <a href="#" className='olvido'>¿ Olvido su Contraseña ?</a>

                    <p className='acepta-politicas'>Al iniciar sesión, acepta las políticas de uso interno de CANTV</p>
                </div>

                <div class="div2">
                    <ImgSatelite />

                    <p>Sistema integral de gestión para las operaciones de la Plataforma Satelital de CANTV. Monitoreo en tiempo real de las sedes Camatagua, Baemari y Caracas.</p>

                    <div className="notificaciones">
                        <div className="noti">
                            <p>3</p>
                            <span>Sedes Activas</span>
                        </div>
                        <div className="noti">
                            <p>24/7</p>
                            <span>Monitoreo</span>
                        </div>
                    </div>
                </div>
            </div>

            <Foot />
        </div>
    )
}

export default Start