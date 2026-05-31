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
import satelite from '../assets/image/satelite.PNG'

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
            Mensajes.showErrorCredenciales();
        } finally {
            setLoading(false);
        }
    };

    // Modificar en Start.jsx

    const handleOlvidoContraseña = async (e) => {
        e.preventDefault();

        const resEmail = await Mensajes.enviarClaveRecuperacion();
        if (!resEmail.isConfirmed || !resEmail.value?.email) return;

        const correo = resEmail.value.email;

        try {
            setLoading(true);
            await Api.enviarClaveTemporal(correo);
            setLoading(false);

            const resReset = await Mensajes.recuperarContrasena(correo);

            if (resReset.isConfirmed && resReset.value) {
                setLoading(true);

                // Mapeo directo de lo que confirmamos en el REST Client
                const payload = {
                    email: correo,
                    temp_code: resReset.value.clave_temporal,
                    new_password: resReset.value.nueva_clave
                };

                // LLAMADA A LA API
                const data = await Api.restablecerPassword(payload);

                setLoading(false);

                // MENSAJE DE ÉXITO (Si llegamos aquí, la promesa se cumplió)
                await Mensajes.showSuccess(data.message || "¡Contraseña cambiada!");

                setUser(correo);
                setPass('');
            }
        } catch (error) {
            setLoading(false);
            console.error("ERROR DETECTADO:", error);
            // Mostramos el error real que viene de la API o de JS
            Mensajes.showErrorMsg(error.message || "Falla en la comunicación con el servidor");
        }
    };

    return (
        <div className='contenedor-ppal-start'>
            <Head />

            <div className="contenedor-login">
                <div className="div1">
                    <h1 className='title-login'>Plataforma Web Centralizada</h1>
                    <h1 className='subtitle-login'>Gestión de Contingencias Satelitales</h1>

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

                    <a href="#" className='olvido' onClick={handleOlvidoContraseña}>¿ Olvido su Contraseña ?</a>

                    <p className='acepta-politicas'>Al iniciar sesión, acepta las políticas de uso interno de CANTV</p>
                </div>

                <div className="div2">
                    <img className='imgsatelite' src={satelite} alt="Imagen de satelite" />

                    <p className='texto-div2'>Sistema integral de gestión para las operaciones de la Plataforma Satelital de CANTV. Monitoreo en tiempo real de las sedes Camatagua, Baemari y Caracas.</p>

                    <div className="notificaciones">
                        <div className="noti">
                            <p className='texto-noti'>3</p>
                            <span className='span-noti'>Sedes Activas</span>
                        </div>
                        <div className="noti">
                            <p className='texto-noti'>24/7</p>
                            <span className='span-noti'>Monitoreo</span>
                        </div>
                    </div>
                </div>
            </div>

            <Foot />
        </div>
    )
}

export default Start;