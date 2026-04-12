import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { updateUserDataBasic, changePassword } from '../services/Api.js';
import { showError, showSuccess } from '../services/Mensajes.js';

function FormUser({ userData, token, setUserData, setToken }) {
  const [formData, setFormData] = useState({
    name: '',
    sede: '',
    password_actual: '',
    password: '',
    confirmPassword: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        ...prev,
        name: userData.name || '',
        sede: userData.unidad_operativa || '',
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) { setIsEditing(true); return; }

    // Definimos si el usuario REALMENTE quiere cambiar la clave
    const isChangingPassword = formData.password.length > 0;

    // Validación antes de disparar la API
    if (isChangingPassword) {
      if (!formData.password_actual) {
        showError("Debes ingresar la contraseña actual");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        showError("La nueva contraseña y la confirmación no coinciden");
        return;
      }
      if (formData.password.length < 8) {
        showError("La nueva contraseña debe tener al menos 8 caracteres");
        return;
      }
    }

    // valida si no modificó nada, tanto en datos básicos como en contraseña. Si no hay cambios, no hace nada
    if (formData.name === userData.name &&
      formData.sede === userData.unidad_operativa &&
      !isChangingPassword) {
      showError("No se detectaron cambios para guardar");
      setIsEditing(false);
      return;
    }

    try {
      // 1. Datos Básicos
      const hasBasicChanges =
        formData.name !== userData.name ||
        formData.sede !== userData.unidad_operativa;

      if (hasBasicChanges) {
        const basicPayload = {
          user_id: userData.id,
          name: formData.name,
          rol_id: userData.rol_id,
          "unidad-operativa": formData.sede
        };
        await updateUserDataBasic(token, basicPayload);

        setUserData({
          ...userData,
          name: formData.name,
          unidad_operativa: formData.sede
        });
      }

      // 2. Cambio de Password (CORREGIDO)
      if (isChangingPassword) {
        const response = await changePassword(token, {
          current_password: formData.password_actual,
          new_password: formData.password,
          new_password_confirmation: formData.confirmPassword
        });

        // Actualizamos el token porque el anterior queda invalidado
        if (response && response.access_token) {
          setToken(response.access_token);
        }
      }

      showSuccess("Cambios guardados con éxito");
      // Limpiamos los campos sensibles
      setFormData(prev => ({
        ...prev,
        password_actual: '',
        password: '',
        confirmPassword: ''
      }));
      setIsEditing(false);

    } catch (error) {
      console.error("Error en FormUser:", error);
      // Laravel suele mandar los errores de validación en un objeto 'errors'
      showError(error.message || "Error de validación. Revisa los datos.");
    }
  };

  // Importante: Si userData no existe por un error de carga, no renderizamos el form
  if (!userData) return null;

  return (
    <StyledWrapper>
      {/* Tu JSX se mantiene exactamente igual */}
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Perfil de Usuario</p>
        <label>
          Nombre
          <input
            disabled='false'
            required
            name="name"
            type="text"
            className="input"
            onChange={handleChange}
            value={formData.name}
          />
        </label>

        <label>
          Sede
          <input
            disabled='false'
            required
            name="sede"
            type="text"
            className="input"
            onChange={handleChange}
            value={formData.sede}
          />
        </label>

        <label>
          {isEditing ? "" : "Contraseña Actual"}
          <input
            disabled={!isEditing}
            name="password_actual"
            type="password"
            className="input"
            onChange={handleChange}
            value={formData.password_actual}
          />
          {isEditing ? <span>Contraseña Actual</span> : ""}
        </label>

        <label>
          {isEditing ? "" : "Nueva Contraseña"}
          <input
            disabled={!isEditing}
            name="password"
            type="password"
            className="input"
            onChange={handleChange}
            value={formData.password}
          />
          {isEditing ? <span>Nueva Contraseña</span> : ""}
        </label>

        <label>
          {isEditing ? "" : "Confirmar Contraseña"}
          <input
            disabled={!isEditing}
            name="confirmPassword"
            type="password"
            className="input"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
          {isEditing ? <span>Confirmar contraseña</span> : ""}
        </label>

        <button type="submit" className={`submit ${isEditing ? 'btn-save' : ''}`}>
          {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
        </button>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 550px;
    background-color: #fff;
    padding: 5px 20px;
    border-radius: 20px;
    position: relative;
    margin-top: 0;
  }

  .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .title::before,.title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: royalblue;
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: royalblue;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    width: 96%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,.form label .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .form label .input:valid + span {
    color: #183592;
  }

  .submit {
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
    margin-top: 1rem;
    cursor: pointer;
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default FormUser