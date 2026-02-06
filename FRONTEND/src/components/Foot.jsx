import * as Mensajes from '../services/Mensajes';
import * as Api from '../services/Api';

function Foot({ tipo, token, setToken }) {
    const handleCambiarContraseña = async (e) => {
        e.preventDefault();

        const resultado = await Mensajes.mostrarModalCambiarContraseña();

        if (resultado.isConfirmed && resultado.value) {
            try {
                // Llamada a la API enviando el token actual y los datos del modal
                const response = await Api.changePassword(token, resultado.value);

                // IMPORTANTE: Actualizamos el token en el estado de la App
                // para que las futuras peticiones usen el nuevo token generado
                if (response.access_token) {
                    setToken(response.access_token);
                }

                Mensajes.showSuccess("Contraseña cambiada con Exito");

            } catch (error) {
                // Si el token es inválido o la clave actual no coincide
                Mensajes.showErrorChangePassword();
            }
        }
    };

    return (
        <div className="footer-gcs">
            <p>CANTV / GGPM / Gerencia de Programa Plataforma Satelital @ 2025/2026 Elaborado por Ana Contreras, Diana Sierra y Darwin Colmenares</p>
            {tipo === "1" ? (
                <a
                    href="#"
                    onClick={handleCambiarContraseña}
                    style={{
                        color: '#007bff',
                        textDecoration: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Cambiar Contraseña
                </a>
            ) : null}
        </div>
    )
}

export default Foot