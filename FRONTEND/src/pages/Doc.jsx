import { useState, useEffect } from 'react';
import Head from '../components/Head';
import Foot from '../components/Foot';
import BarraMenu from './../components/BarraMenu';

import * as Api from '../services/Api';
import * as Mensajes from '../services/Mensajes';
import { NewDoc, BtnEye, BtnEdit, BtnErase } from '../services/Icons';
import './Doc.css';


function Doc({ userData, token }) {
    const [documentos, setDocumentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

    // --- ESTADOS PARA PAGINACIÓN ---
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;

    useEffect(() => {
        if (!token) return;
        const cargarDatos = async () => {
            try {
                const [resDocs, resCats] = await Promise.all([
                    Api.getDocumentos(token),
                    Api.getCategoriasDoc(token)
                ]);
                setDocumentos(resDocs);
                setCategorias(resCats);
            } catch (error) {
                Mensajes.showError(error.message);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, [token]);

    // --- LÓGICA DE ORDENAMIENTO (Por Título) Y FILTRADO ---
    const filteredDocumentos = [...documentos]
        .sort((a, b) => a.titulo.localeCompare(b.titulo)) // Orden alfabético por título
        .filter(doc => {
            const term = searchTerm.toLowerCase();
            return (
                doc.titulo.toLowerCase().includes(term) ||
                doc.categoria?.nombre_categoria.toLowerCase().includes(term) ||
                doc.version.toString().includes(term) ||
                doc.usuario?.name.toLowerCase().includes(term) ||
                doc.fecha_publicacion.includes(term)
            );
        });

    // --- LÓGICA DE PAGINACIÓN SOBRE DATOS FILTRADOS ---
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = filteredDocumentos.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredDocumentos.length / recordsPerPage);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Resetear a pág 1 al escribir
    };

    const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
    const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

    // --- ACCIONES ---
    const handleVerDocumento = (url) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            Mensajes.showError("No se encontró la ubicación del archivo.");
        }
    };

    const handleNuevoDocumento = async () => {
        const resultado = await Mensajes.mostrarModalNuevoDocumento(categorias);

        if (resultado.isConfirmed) {
            // 1. Extraemos con los nombres EXACTOS que retorna el modal
            const { titulo, categoria_id, version, fecha_publicacion, archivo } = resultado.value;

            // 2. Creamos el FormData
            const formData = new FormData();

            // 3. Append de datos (asegurando tipos)
            formData.append('titulo', titulo);
            formData.append('categoria_id', categoria_id); // Laravel espera el ID
            formData.append('version', version);
            formData.append('fecha_publicacion', fecha_publicacion);

            // 4. El Archivo (Clave: debe llamarse 'archivo' como en tu Validator de PHP)
            if (archivo) {
                formData.append('archivo', archivo);
            }

            try {
                await Api.storeDocumento(token, formData);
                Mensajes.showSuccess("Documento cargado correctamente");

                // Recargar la lista
                const data = await Api.getDocumentos(token);
                setDocumentos(data);
            } catch (error) {
                // Ahora que corregimos el catch, aquí verás el error real de Laravel
                Mensajes.showError(error.message);
            }
        }
    };

    const handleEliminar = async (id, titulo) => {
        const resultado = await Mensajes.confirmarEliminacion(titulo);
        if (resultado.isConfirmed) {
            try {
                await Api.deleteDocumento(token, id);
                Mensajes.showSuccess("Documento eliminado correctamente");
                const nuevosDocumentos = documentos.filter(doc => doc.id !== id);
                setDocumentos(nuevosDocumentos);
                const nuevaCantidadPaginas = Math.ceil(nuevosDocumentos.length / recordsPerPage);
                if (currentPage > nuevaCantidadPaginas && currentPage > 1) {
                    setCurrentPage(nuevaCantidadPaginas);
                }
            } catch (error) {
                Mensajes.showError(error.message);
            }
        }
    };

    const handleEditar = async (documentoActual) => {
        const resultado = await Mensajes.mostrarModalEditarDocumento(documentoActual, categorias);
        if (resultado.isConfirmed) {
            const { id, titulo, categoria_id, version, fecha_publicacion, archivo } = resultado.value;
            const formData = new FormData();
            formData.append('id', id);
            formData.append('titulo', titulo);
            formData.append('categoria_id', categoria_id);
            formData.append('version', version);
            formData.append('fecha_publicacion', fecha_publicacion);
            if (archivo) formData.append('archivo', archivo);

            try {
                await Api.updateDocumento(token, formData);
                Mensajes.showSuccess("Documento actualizado correctamente");
                const data = await Api.getDocumentos(token);
                setDocumentos(data);
            } catch (error) {
                Mensajes.showError(error.message);
            }
        }
    };

    return (
        <div className="contenedor-ppal-doc">
            <Head />
            <BarraMenu tipo="2" userData={userData} />

            <div className="contenedor-medio contenedor-blog">
                <div className="header-seccion-blog">
                    <h2 style={{ fontSize: "1.7rem", fontWeight: 'bold' }}>Gestión de Documentación Técnica</h2>

                    {/* BUSCADOR INTEGRADO */}
                    <input
                        type="text"
                        placeholder="🔍 Buscar en documentos..."
                        className="input-busqueda"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {userData.rol_id !== 4 ?
                        <>
                            {userData.rol_id === 1 || userData.rol_id === 2 ?
                                <button className="btn-agregar-reg" onClick={handleNuevoDocumento} title='Cargar un Documento'>
                                    <NewDoc /> Subir un Documento
                                </button>
                                :
                                ""
                            }

                        </>
                        :
                        ""
                    }

                </div>

                {loading ? (
                    <p>Cargando documentos...</p>
                ) : (
                    <>
                        <table className="tabla-custom">
                            <thead>
                                <tr>
                                    <th style={{ width: '9rem' }}>Tipo</th>
                                    <th style={{ width: '28rem' }}>Título del Documento</th>
                                    <th style={{ width: '6rem', textAlign: 'left' }}>Versión Doc</th>
                                    <th>Cargado por</th>
                                    <th>Fecha Publicación</th>
                                    <th style={{ textAlign: 'center' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.length > 0 ? (
                                    currentRecords.map((doc) => (
                                        <tr key={doc.id}>
                                            <td className="td" style={{ width: '8rem' }}>
                                                <span className="badge bg-secondary">
                                                    {doc.categoria?.nombre_categoria}
                                                </span>
                                            </td>
                                            <td className="td" style={{ fontWeight: '600' }}>{doc.titulo}</td>
                                            <td className="td" style={{ width: '5rem', textAlign: 'left ' }}>v{doc.version}</td>
                                            <td className="td" style={{ color: '#0652DD', width: '10rem' }}>
                                                {doc.usuario?.name}
                                            </td>
                                            <td className="td fecha-tabla" style={{ width: '8rem' }}>
                                                {doc.fecha_publicacion}
                                            </td>
                                            <td className="td celda-acciones">
                                                <button
                                                    className='butt secondary'
                                                    onClick={() => handleVerDocumento(doc.url_archivo)}
                                                >
                                                    <BtnEye />
                                                    <span>Ver PDF</span>
                                                </button>
                                                {userData.rol_id !== 4 ?
                                                    <>
                                                        {userData.rol_id === 1 || userData.rol_id === 2 ?
                                                            <>
                                                                <button
                                                                    className='butt'
                                                                    onClick={() => handleEditar(doc)}
                                                                >
                                                                    <BtnEdit />
                                                                    <span>Editar</span>
                                                                </button>

                                                                <button
                                                                    className='butt danger'
                                                                    onClick={() => handleEliminar(doc.id, doc.titulo)}
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
                                                    ""
                                                }

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                                            {searchTerm ? `No hay resultados para "${searchTerm}"` : "No hay documentos disponibles"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="paginacion">
                            <button onClick={prevPage} disabled={currentPage === 1}>⏪ Anterior</button>
                            <span>Página {currentPage} de {totalPages || 1}</span>
                            <button onClick={nextPage} disabled={currentPage === totalPages || totalPages === 0}>Siguiente ⏩</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Doc;