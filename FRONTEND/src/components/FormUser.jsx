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

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
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
          Contraseña Actual
          <input
            disabled={!isEditing}
            name="password_actual"
            type="password"
            className="input"
            onChange={handleChange}
            value={formData.password_actual}
            placeholder={isEditing ? "Ingrese Contraseña Actual" : ""}
          />
        </label>

        <label>
          Nueva Contraseña
          <input
            disabled={!isEditing}
            name="password"
            type="password"
            className="input"
            onChange={handleChange}
            value={formData.password}
            placeholder={isEditing ? "Ingrese Nueva Contraseña" : ""}
          />
        </label>

        <label>
          Confirmar Contraseña
          <input
            disabled={!isEditing}
            name="confirmPassword"
            type="password"
            className="input"
            onChange={handleChange}
            value={formData.confirmPassword}
            placeholder={isEditing ? "Ingrese Confirmación de Nueva Contraseña" : ""}
          />
        </label>

        <div className='container-btn'>
          <button type="submit" className={`submit ${isEditing ? 'btn-save' : ''}`}>
            {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
          </button>
          {isEditing && <button type="button" className="btn-cancel" onClick={handleCancel}>Cancelar</button>}
        </div>

      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 550px;
    background-color: #fff;
    padding: 0 20px;
    border-radius: 20px;
    position: relative;
    margin: 1rem 0 0 0;
  }

  .title {
    font-size: 28px;
    color: #000000;
    font-weight: 600;
    position: relative;
    display: flex;
    align-items: center;
    margin: 10px 0 10px 0;
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

  .form label .input::placeholder {
    color: #cc1010;
    font-size: 1em;
    font-style: italic;
    opacity: 0.7;
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

  .container-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .submit {
    width: 12rem;
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
    margin-top: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .btn-cancel {
    width: 12rem;
    border: none;
    outline: none;
    background-color: #d42121;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
    margin-top: 1rem;
    margin-bottom: 1rem;
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