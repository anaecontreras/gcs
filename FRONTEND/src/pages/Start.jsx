import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Head from '../components/Head';
import Foot from '../components/Foot';
import InputLogin from './../components/InputLogin';
import ButtonLogin from './../components/ButtonLogin'

import * as Mensajes from '../services/Mensajes';
import * as Api from '../services/Api';

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
        <div className='contenedor-ppal'>
            <Head />

            <div className='contenedor-medio contenedor-login'>
                <h1 style={{ marginBottom: '1rem' }}>LOGIN</h1>

                <form onSubmit={handleLogin} className='form-login'>
                    <InputLogin
                        tipo="text"
                        place="Usuario"
                        val={user}
                        change={(e) => setUser(e.target.value)}
                    />

                    <InputLogin
                        tipo="password"
                        place="Contraseña"
                        val={pass}
                        change={(e) => setPass(e.target.value)}
                    />

                    <ButtonLogin tipo="submit" texto="Entrar" btnType="one" />
                </form>
            </div>

            <Foot />
        </div>
    )
}

export default Start