import { useState, useEffect } from 'react';
import Head from '../components/Head';
import * as Api from '../services/Api';
import * as Mensajes from '../services/Mensajes';
import { NewUsuario, BtnHabilitar, BtnDeshabilitar, BtnEdit } from '../services/Icons';
import BarraMenu from './../components/BarraMenu';
import './Ususarios.css'


function Usuarios({ userData, token }) {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

    // --- ESTADOS PARA PAGINACIÓN ---
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;

    useEffect(() => {
        if (!token) return;
        cargarUsuarios();
    }, [token]);

    const cargarUsuarios = async () => {
        try {
            setLoading(true);
            const [dataUsers, dataRoles] = await Promise.all([
                Api.getUsers(token),
                Api.getRoles(token)
            ]);
            setUsuarios(dataUsers);
            setRoles(dataRoles);
        } catch (error) {
            Mensajes.showErrorPersonalizado(error.message);
        } finally {
            setLoading(false);
        }
    };

    // --- LÓGICA DE ORDENAMIENTO (Por nombre) Y FILTRADO ---
    const filteredUsuarios = [...usuarios]
        .sort((a, b) => a.name.localeCompare(b.name)) // Orden alfabético A-Z
        .filter(user => {
            const term = searchTerm.toLowerCase();
            return (
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term) ||
                (user.rol?.rol || 'Sin rol').toLowerCase().includes(term) ||
                (user.unidad_operativa || '').toLowerCase().includes(term)
            );
        });

    // --- LÓGICA DE PAGINACIÓN SOBRE DATOS FILTRADOS ---
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = filteredUsuarios.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredUsuarios.length / recordsPerPage);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Resetear a la primera página al escribir
    };

    const handleNuevoUsuario = async () => {
        const resultado = await Mensajes.mostrarModalNuevoUsuario(roles, token, Api);
        if (resultado.isConfirmed) {
            Mensajes.showSuccess("Usuario creado exitosamente");
            cargarUsuarios();
        }
    };

    const handleEditarUsuario = async (user) => {
        const resultado = await Mensajes.mostrarModalEditarUsuario(user, roles);

        if (resultado && resultado.isConfirmed) {
            try {
                // resultado.value contiene el objeto que armamos en el preConfirm
                const response = await Api.updateUserDataBasic(token, resultado.value);

                Mensajes.showSuccess(response.message);
                cargarUsuarios(); // Recarga la tabla
            } catch (error) {
                // Usamos showError que es la que está en tu archivo Mensajes.js
                Mensajes.showError(error.message);
            }
        }
    };

    const handleInhabilitarUsuario = async (user) => {
        // 1. Evitar que el admin se deshabilite a sí mismo
        if (user.id === userData.user_id) {
            Mensajes.showError("No puedes cambiar tu propio estado de actividad.");
            return;
        }

        const accion = user.activo ? 'deshabilitar' : 'habilitar';

        // 2. Usar tu función confirmarAccion ya existente
        const resultado = await Mensajes.confirmarAccion(
            `¿Deseas ${accion} al usuario?`,
            `El usuario ${user.name} quedará ${user.activo ? 'inactivo' : 'activo'} en el sistema.`
        );

        if (resultado.isConfirmed) {
            try {
                const response = await Api.toggleUserStatus(token, user.id);

                // 3. Notificar éxito y refrescar la lista
                Mensajes.showSuccess(response.message);
                cargarUsuarios();
            } catch (error) {
                Mensajes.showError(error.message);
            }
        }
    };

    return (
        <div className="contenedor-ppal">
            <Head />
            <BarraMenu tipo="2" userData={userData} />

            <div className="contenedor-medio contenedor-user">
                <div className="header-seccion-user">
                    <h1>Gestión de Usuarios</h1>

                    {/* BUSCADOR INTEGRADO */}
                    <input
                        type="text"
                        placeholder="🔍 Buscar usuario, email, rol..."
                        className="input-busqueda"
                        value={searchTerm}
                        onChange={handleSearch}
                    />

                    <button className="btn-agregar-reg" onClick={handleNuevoUsuario} title='Cargar Nuevo Usuario'>
                        <NewUsuario /> Nuevo Usuario
                    </button>
                </div>

                {loading ? (
                    <p className="loading-text">Cargando lista de usuarios...</p>
                ) : (
                    <>
                        <table className="tabla-custom">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Unidad Operativa</th>
                                    <th style={{ textAlign: 'center' }}>Estado</th>
                                    <th style={{ textAlign: 'center' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.length > 0 ? (
                                    currentRecords.map((user) => (
                                        <tr key={user.id}>
                                            <td className='td'>{user.name}</td>
                                            <td className='td'>{user.email}</td>
                                            <td className='td'>
                                                <span className="badge media">
                                                    {user.rol?.rol || 'Sin rol'}
                                                </span>
                                            </td>
                                            <td className='td'>{user.unidad_operativa}</td>
                                            <td className='td' style={{ textAlign: 'center' }}>
                                                <span className={`badge ${user.activo ? 'bg-success' : 'bg-gris'}`}>
                                                    {user.activo ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </td>
                                            <td className="td celda-acciones">
                                                {user.activo ?
                                                    <>
                                                        <button
                                                            className='butt'
                                                            onClick={() => handleEditarUsuario(user)}
                                                        >
                                                            <BtnEdit />
                                                            <span>Editar</span>
                                                        </button>
                                                    </>
                                                    : ""}

                                                <button
                                                    className={user.activo ? 'butt danger' : 'butt primary'}
                                                    onClick={() => handleInhabilitarUsuario(user)}
                                                >
                                                    {user.activo ? <BtnDeshabilitar /> : <BtnHabilitar />}
                                                    {user.activo ? <span>InHabilitar</span> : <span>Habilitar</span>}

                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                                            {searchTerm ? `No se encontraron usuarios para "${searchTerm}"` : "No hay usuarios registrados"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="paginacion">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                ⏪ Anterior
                            </button>
                            <span>Página {currentPage} de {totalPages || 1}</span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages || totalPages === 0}
                            >
                                Siguiente ⏩
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Usuarios;