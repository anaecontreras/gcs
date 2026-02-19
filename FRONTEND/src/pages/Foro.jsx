import { useState, useEffect } from 'react';
import Head from '../components/Head';
import Foot from '../components/Foot';
import * as Api from '../services/Api';
import * as Mensajes from '../services/Mensajes';
import { NewForo } from '../services/Icons';

import { BtnMessage, BtnClose, BtnEdit, BtnErase } from '../services/Icons';
import BarraMenu from './../components/BarraMenu';
import './Foro.css';



function Foro({ userData, token }) {
    const [temas, setTemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 4;

    useEffect(() => {
        if (!token) return;
        cargarTemas();
    }, [token]);

    const cargarTemas = async () => {
        try {
            setLoading(true);
            const data = await Api.getTemasForo(token);
            setTemas(data);
        } catch (error) {
            Mensajes.showErrorPersonalizado(error.message);
        } finally {
            setLoading(false);
        }
    };

    // --- LÓGICA DE ORDENAMIENTO Y FILTRADO DE TEMAS ---
    const filteredTemas = [...temas]
        .sort((a, b) => b.id - a.id) // Temas: El más reciente arriba
        .filter(tema =>
            tema.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tema.usuario?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = filteredTemas.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredTemas.length / recordsPerPage);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    // ... (Manejadores handleNuevoTema, handleBorrarTema, etc. se mantienen igual)
    const handleNuevoTema = async () => {
        const datos = await Mensajes.showModalNuevoTema();
        if (datos) {
            try {
                const response = await Api.postTema(token, datos);
                Mensajes.showSuccess(response.message);
                cargarTemas();
            } catch (error) {
                Mensajes.showErrorPersonalizado(error.message);
            }
        }
    };

    const handleBorrarTema = async (id, titulo) => {
        const confirmar = await Mensajes.confirmDelete(titulo);
        if (confirmar) {
            try {
                const response = await Api.deleteTema(token, id);
                Mensajes.showSuccess(response.message);
                cargarTemas();
            } catch (error) {
                Mensajes.showErrorPersonalizado(error.message);
            }
        }
    };

    const handleEditarTema = async (tema) => {
        const datosCambiados = await Mensajes.showModalTema(tema);
        if (datosCambiados) {
            try {
                const response = await Api.updateTema(token, datosCambiados);
                Mensajes.showSuccess(response.message);
                cargarTemas();
            } catch (error) {
                Mensajes.showErrorPersonalizado(error.message);
            }
        }
    };

    const handleCerrarTema = async (tema) => {
        const confirmar = await Mensajes.confirmGeneric(
            '¿Cerrar tema?',
            `El tema "${tema.titulo}" ya no recibirá más comentarios.`
        );
        if (confirmar) {
            try {
                const datosParaCerrar = {
                    id: tema.id,
                    titulo: tema.titulo,
                    estado: 'Cerrado'
                };
                const response = await Api.updateTema(token, datosParaCerrar);
                Mensajes.showSuccess("Tema cerrado correctamente");
                cargarTemas();
            } catch (error) {
                Mensajes.showErrorPersonalizado(error.message);
            }
        }
    };

    const handleNuevoComentario = async (temaId, tituloTema) => {
        const cuerpo = await Mensajes.showModalNuevoComentario(tituloTema);
        if (cuerpo) {
            try {
                const datos = { tema_id: temaId, cuerpo: cuerpo };
                const response = await Api.postComentario(token, datos);
                Mensajes.showSuccess(response.message);
                cargarTemas();
            } catch (error) {
                Mensajes.showErrorPersonalizado(error.message);
            }
        }
    };

    const handleEditarComentario = async (comentario, tituloTema) => {
        const nuevoCuerpo = await Mensajes.showModalNuevoComentario(tituloTema, comentario.cuerpo);
        if (nuevoCuerpo) {
            try {
                const datos = { id: comentario.id, cuerpo: nuevoCuerpo };
                const response = await Api.updateComentario(token, datos);
                Mensajes.showSuccess(response.message);
                cargarTemas();
            } catch (error) {
                Mensajes.showErrorPersonalizado(error.message);
            }
        }
    };

    const handleBorrarComentario = async (id) => {
        const confirmar = await Mensajes.confirmGeneric(
            '¿Eliminar comentario?',
            'Esta acción no se puede deshacer.'
        );
        if (confirmar) {
            try {
                const response = await Api.deleteComentario(token, id);
                Mensajes.showSuccess(response.message);
                cargarTemas();
            } catch (error) {
                Mensajes.showErrorPersonalizado(error.message);
            }
        }
    };

    return (
        <div className="contenedor-ppal-foro">
            <Head />
            <BarraMenu tipo="2" userData={userData} />

            <div className="contenedor-medio contenedor-foro">
                <div className="header-seccion-blog">
                    <h1>Foro Técnico</h1>
                    <input
                        type="text"
                        placeholder="🔍 Buscar tema o autor..."
                        className="input-busqueda"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {userData.rol_id !== 4
                        ?
                        <>
                            <button className="btn-agregar-reg" onClick={handleNuevoTema} title='Abrir Tema Nuevo en Foro'>
                                <NewForo /> Nuevo Tema
                            </button>
                        </>
                        :
                        ""}

                </div>

                {loading ? (
                    <p className="loading-text">Cargando Temas y Comentarios ...</p>
                ) : (
                    <>
                        <div className="lista-foros">
                            {currentRecords.length > 0 ? (
                                currentRecords.map((tema) => (
                                    <div key={tema.id} className="card-foro">
                                        <div className="tema-header">
                                            <div className="tema-info">
                                                <span className={`badge ${tema.estado === 'Abierto' ? 'bg-success' : 'bg-gris'}`}>
                                                    {tema.estado}
                                                </span>
                                                <h3>{tema.titulo}</h3>
                                                <p className="tema-meta">
                                                    Publicado por: <strong>{tema.usuario?.name}</strong> |  En fecha: <strong>{tema.created_at.split('T')[0]}</strong>
                                                </p>
                                            </div>

                                            <div className="altura-acciones">



                                                {userData.rol_id !== 4 && tema.estado === 'Abierto' && (
                                                    <>
                                                        <button
                                                            className='butt secondary'
                                                            onClick={() => handleNuevoComentario(tema.id, tema.titulo)}
                                                        >
                                                            <BtnMessage />
                                                            <span>Comentar</span>
                                                        </button>

                                                        {userData.id === tema.usuario_creador_id || userData.rol_id === 1 ?
                                                            <>
                                                                <button
                                                                    className='butt primary'
                                                                    onClick={() => handleCerrarTema(tema)}
                                                                >
                                                                    <BtnClose />
                                                                    <span>Cerrar Tema</span>
                                                                </button>
                                                                <button
                                                                    className='butt'
                                                                    onClick={() => handleEditarTema(tema)}
                                                                >
                                                                    <BtnEdit />
                                                                    <span>Editar</span>
                                                                </button>
                                                            </>
                                                            :
                                                            ""
                                                        }


                                                    </>
                                                )}
                                                {userData.rol_id !== 4 ?
                                                    <>
                                                        {userData.id === tema.usuario_creador_id || userData.rol_id === 1 ?
                                                            <>
                                                                <button
                                                                    className='butt danger'
                                                                    onClick={() => handleBorrarTema(tema.id, tema.titulo)}
                                                                >
                                                                    <BtnErase />
                                                                    <span>Eliminar</span>
                                                                </button>
                                                            </>
                                                            :
                                                            ""
                                                        }

                                                    </>
                                                    :
                                                    ""}

                                            </div>
                                        </div>

                                        <div className="comentarios-seccion">
                                            <h5>Respuestas <strong>({tema.comentarios?.length || 0})</strong></h5>
                                            {tema.comentarios && tema.comentarios.length > 0 ? (
                                                /* --- ORDENAMOS COMENTARIOS AQUÍ (EL MÁS RECIENTE PRIMERO) --- */
                                                [...tema.comentarios].sort((a, b) => b.id - a.id).map((com) => (
                                                    <div key={com.id} className="comentario-item">
                                                        <p className="comentario-texto">{com.cuerpo}</p>
                                                        <div className="comentario-footer">
                                                            <div className='realizadoPor'>
                                                                Realizado por: <span className="autor-comentario"> {com.usuario?.name}</span> | En Fecha: <span className='autor-comentario'>{com.created_at.split('T')[0]}</span>
                                                            </div>
                                                            {userData.id === com.usuario_creador_id || userData.rol_id === 1 ?
                                                                <>
                                                                    {userData.rol_id !== 4 && tema.estado === 'Abierto' && (
                                                                        <div className="acciones-comentario altura-acciones">
                                                                            <button
                                                                                className='butt'
                                                                                onClick={() => handleEditarComentario(com, tema.titulo)}
                                                                            >
                                                                                <BtnEdit />
                                                                                <span>Editar Comentario</span>
                                                                            </button>

                                                                            <button
                                                                                className='butt danger'
                                                                                onClick={() => handleBorrarComentario(com.id)}
                                                                            >
                                                                                <BtnErase />
                                                                                <span>Eliminar Comentario</span>
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </>
                                                                :
                                                                ""
                                                            }

                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                tema.estado === 'Abierto' && (
                                                    <p className="no-data-text">No hay comentarios aún. ¡Sé el primero en comentar!</p>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ textAlign: 'center', marginTop: '2rem' }}>No se encontraron temas que coincidan con "{searchTerm}"</p>
                            )}
                        </div>

                        <div className="paginacion">
                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>⏪ Anterior</button>
                            <span>Página {currentPage} de {totalPages || 1}</span>
                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0}>Siguiente ⏩</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Foro;