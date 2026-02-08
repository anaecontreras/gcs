import { useState, useEffect } from 'react';
import Head from '../components/Head';
import Foot from '../components/Foot';
import Menu from '../components/Menu';
import * as Api from '../services/Api';
import * as Mensajes from '../services/Mensajes';
import { NewContingencia, BtnEdit, BtnClose, BtnErase } from '../services/Icons';

function Blog({ isAuthenticated, setIsAuthenticated, userData, token }) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3;

    const formatearFechaCorrecta = (fechaStr) => {
        try {
            if (!fechaStr || typeof fechaStr !== 'string') return "N/A";
            const esUTC = fechaStr.includes('Z') || fechaStr.includes('+00');
            const fechaNormalizada = fechaStr.replace(' ', 'T');
            const partes = fechaNormalizada.split('T');
            const fechaPart = partes[0];
            const horaPart = partes[1].split('.')[0];

            const [año, mes, dia] = fechaPart.split('-');
            let [horas, minutos, segundos] = horaPart.split(':');

            let horaFinalNum = parseInt(horas);
            if (esUTC) {
                horaFinalNum = horaFinalNum - 4;
                if (horaFinalNum < 0) horaFinalNum += 24;
            }

            const horasFinalStr = String(horaFinalNum).padStart(2, '0');
            return `${dia}/${mes}/${año}-${horasFinalStr}:${minutos}:${segundos}`;
        } catch (e) {
            console.error("Error formateando:", e);
            return fechaStr;
        }
    };

    useEffect(() => {
        if (!token) return;
        const cargarDatos = async () => {
            try {
                const data = await Api.getBlogs(token);
                setBlogs(data);
            } catch (error) {
                Mensajes.showErrorPersonalizado(error.message);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, [token]);

    const filteredBlogs = [...blogs]
        .sort((a, b) => {
            const estadoA = a.estado.toLowerCase();
            const estadoB = b.estado.toLowerCase();
            if (estadoA === "cerrado" && estadoB !== "cerrado") return 1;
            if (estadoA !== "cerrado" && estadoB === "cerrado") return -1;
            return b.id - a.id;
        })
        .filter(item =>
            item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.prioridad.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.usuario?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = filteredBlogs.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredBlogs.length / recordsPerPage);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
    const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

    const handleNuevoRegistro = async () => {
        const resultado = await Mensajes.mostrarModalNuevoBlog();
        if (resultado.isConfirmed) {
            const nuevoBlog = { ...resultado.value, usuario_reporte_id: userData.id };
            try {
                const response = await Api.storeBlog(token, nuevoBlog);
                Mensajes.showSuccess(response.message);
                const dataActualizada = await Api.getBlogs(token);
                setBlogs(dataActualizada);
            } catch (error) { Mensajes.showErrorPersonalizado(error.message); }
        }
    };

    const handleEditarRegistro = async (blog) => {
        const resultado = await Mensajes.mostrarModalEditarBlog(blog);
        if (resultado.isConfirmed) {
            try {
                const response = await Api.updateBlog(token, resultado.value);
                Mensajes.showSuccess(response.message);
                const dataActualizada = await Api.getBlogs(token);
                setBlogs(dataActualizada);
            } catch (error) { Mensajes.showErrorPersonalizado(error.message); }
        }
    };

    // --- NUEVA FUNCIÓN PARA CERRAR EVENTO ---
    const handleCerrarEvento = async (blog) => {
        const confirmado = await Mensajes.confirmarAccion(`¿Estás seguro de cerrar el evento: "${blog.titulo}"?`);
        if (confirmado.isConfirmed) {
            try {
                const datosCierre = {
                    id: blog.id,
                    titulo: blog.titulo,
                    prioridad: blog.prioridad,
                    estado: "Cerrado"
                };
                const response = await Api.updateBlog(token, datosCierre);
                Mensajes.showSuccess(response.message);
                const dataActualizada = await Api.getBlogs(token);
                setBlogs(dataActualizada);
            } catch (error) {
                Mensajes.showErrorPersonalizado(error.message);
            }
        }
    };

    const handleEliminarRegistro = async (id, titulo) => {
        const resultado = await Mensajes.confirmarEliminacion(titulo);
        if (resultado.isConfirmed) {
            try {
                const response = await Api.deleteBlog(token, id);
                Mensajes.showSuccess(response.message);
                setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
                if (currentRecords.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
            } catch (error) { Mensajes.showErrorPersonalizado(error.message); }
        }
    };

    return (
        <div className="contenedor-ppal">
            <Head />
            <Menu tipo="2" userData={userData} />

            <div className="contenedor-medio contenedor-blog">
                <div className="header-seccion-blog">
                    <h1>Contingencia</h1>

                    <input
                        type="text"
                        placeholder="🔍 Buscar registro..."
                        className="input-busqueda"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {userData.rol_id !== 4 ?
                        <button className="btn-agregar-reg" onClick={handleNuevoRegistro} title='Agregar Nuevo Evento'>
                            <NewContingencia /> Nueva Contingencia
                        </button>
                        :
                        ""
                    }

                </div>

                {loading ? (
                    <p>Cargando datos desde el Backend...</p>
                ) : (
                    <>
                        <table className="tabla-custom">
                            <thead>
                                <tr>
                                    <th style={{ width: '60rem' }}>Alertas, mantenimientos y novedades del sistema</th>
                                    <th style={{ width: '6rem' }}>Prioridad</th>
                                    <th style={{ width: '7rem' }}>Estado</th>
                                    <th style={{ width: '7rem', textAlign: 'center' }}>Usuario que reporta</th>
                                    <th style={{ width: '10rem' }}>Fecha de Ocurrencia</th>

                                    {userData.rol_id !== 4 ?
                                        <th style={{ width: '11rem', textAlign: 'center' }}>Acciones</th>
                                        :
                                        ""
                                    }

                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.length > 0 ? (
                                    currentRecords.map((item) => (
                                        <tr key={item.id}>
                                            <td style={{ width: '40rem' }}>{item.titulo}</td>
                                            <td style={{ width: '3rem' }}>
                                                <span className={`badge ${item.prioridad.toLowerCase()}`}>
                                                    {item.prioridad}
                                                </span>
                                            </td>
                                            <td style={{ width: '6rem' }}>{item.estado.toUpperCase()}</td>
                                            <td style={{ width: '4rem', color: '#168128' }}>{item.usuario?.name}</td>
                                            <td className='fecha-tabla' style={{ width: '12rem' }}>
                                                {formatearFechaCorrecta(item.created_at)}
                                            </td>


                                            {userData.rol_id !== 4 ?
                                                <>
                                                    <td className='celda-acciones'>
                                                        {item.estado.toLowerCase() !== 'cerrado' && (
                                                            <>
                                                                {userData.id === item.usuario_reporte_id || userData.rol_id === 1 ?
                                                                    <>
                                                                        <button
                                                                            className='butt'
                                                                            onClick={() => handleEditarRegistro(item)}
                                                                        >
                                                                            <BtnEdit />
                                                                            <span>Editar</span>
                                                                        </button>

                                                                        <button
                                                                            className='butt primary'
                                                                            onClick={() => handleCerrarEvento(item)}
                                                                        >
                                                                            <BtnClose />
                                                                            <span>Cerrar Evento</span>
                                                                        </button>
                                                                    </>
                                                                    :
                                                                    ""}
                                                            </>

                                                        )}
                                                        {userData.id === item.usuario_reporte_id || userData.rol_id === 1 ?
                                                            <button
                                                                className='butt danger'
                                                                onClick={() => handleEliminarRegistro(item.id, item.titulo)}
                                                            >
                                                                <BtnErase />
                                                                <span>Eliminar Evento</span>
                                                            </button>
                                                            :
                                                            ""
                                                        }

                                                    </td>
                                                </>
                                                :
                                                ""
                                            }


                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                                            No se encontraron resultados para "{searchTerm}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="paginacion">
                            <button onClick={prevPage} disabled={currentPage === 1}>
                                ⏪ Anterior
                            </button>
                            <span>Página {currentPage} de {totalPages || 1}</span>
                            <button onClick={nextPage} disabled={currentPage === totalPages || totalPages === 0}>
                                Siguiente ⏩
                            </button>
                        </div>
                    </>
                )}
            </div>
            <Foot />
        </div>
    );
}

export default Blog;