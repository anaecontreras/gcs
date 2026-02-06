import React, { useEffect, useState } from 'react';
import Head from '../components/Head';
import Foot from '../components/Foot';
import Menu from '../components/Menu';

import * as Api from '../services/Api';
import * as Mensajes from '../services/Mensajes';

function Logs({ userData, token }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

    // --- ESTADOS PARA PAGINACIÓN ---
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const fetchLogs = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const data = await Api.getLogs(token);
            setLogs(data);
        } catch (error) {
            Mensajes.showErrorPersonalizado(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [token]);

    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return "N/A";

        // El string es: 2026-02-01T19:11:42.000000Z
        // 1. Separamos la T para dividir fecha y hora
        const partes = fechaStr.split('T');
        const fechaPart = partes[0]; // "2026-02-01"
        const horaPart = partes[1].split('.')[0]; // "19:11:42"

        // 2. Extraemos año, mes, día
        const [año, mes, dia] = fechaPart.split('-');

        // 3. Ajustamos la hora manualmente (19 - 4 = 15)
        let [horas, minutos, segundos] = horaPart.split(':');
        let horaAjustada = parseInt(horas) - 4;

        // Manejo de cambio de día (por si el log es de madrugada UTC)
        if (horaAjustada < 0) horaAjustada += 24;

        // Formateamos para que siempre tenga dos dígitos (ej: 03 en lugar de 3)
        const horasFinal = String(horaAjustada).padStart(2, '0');

        // 4. Retornamos: dia/mes/año-hora:minutos:segundos
        return `${dia}/${mes}/${año}-${horasFinal}:${minutos}:${segundos}`;
    };

    // --- LÓGICA DE ORDENAMIENTO (Mas recientes primero) Y FILTRADO ---
    const filteredLogs = [...logs]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Orden descendente
        .filter(log => {
            const term = searchTerm.toLowerCase();
            return (
                log.usuario_correo.toLowerCase().includes(term) ||
                log.accion.toLowerCase().includes(term) ||
                log.entidad_afectada.toLowerCase().includes(term) ||
                log.entidad_id.toString().includes(term) ||
                log.created_at.includes(term)
            );
        });

    // --- LÓGICA DE PAGINACIÓN SOBRE DATOS FILTRADOS ---
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = filteredLogs.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredLogs.length / recordsPerPage);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Resetear a pág 1 al filtrar
    };

    const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
    const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

    return (
        <div className="contenedor-ppal">
            <Head />
            <Menu tipo="2" userData={userData} />

            <div className="contenedor-medio contenedor-blog">
                <div className="header-seccion-blog">
                    <h1>Historial de Actividades</h1>

                    {/* BUSCADOR INTEGRADO */}
                    <input
                        type="text"
                        placeholder="🔍 Buscar por usuario, acción, ID..."
                        className="input-busqueda"
                        value={searchTerm}
                        onChange={handleSearch}
                    />

                    <button className="btn-agregar-reg" onClick={fetchLogs}>
                        🔄 Actualizar
                    </button>
                </div>

                {loading ? (
                    <p>Cargando historial desde el Backend...</p>
                ) : (
                    <>
                        <table className="tabla-custom">
                            <thead>
                                <tr>
                                    {/* <th style={{ width: '1.5rem' }}>ID</th> */}
                                    <th style={{ width: '9rem' }}>Usuario</th>
                                    <th style={{ width: '32rem' }}>Acción Realizada</th>
                                    <th style={{ width: '5rem' }}>Entidad</th>
                                    {/* <th style={{ width: '2rem' }}>Ref ID</th> */}
                                    <th style={{ width: '10rem' }}>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.length > 0 ? (
                                    currentRecords.map((log) => (
                                        <tr key={log.id}>
                                            {/* <td className='td'>{log.id}</td> */}
                                            <td className='td' style={{ color: '#168128', fontSize: '0.85rem' }}>
                                                {log.usuario_correo}
                                            </td>
                                            <td className='td'>{log.accion}</td>
                                            <td className='td'>
                                                <span className={`badge ${log.entidad_afectada === 'users' ? 'bg-warning text-dark' : 'bg-info text-dark'}`}>
                                                    {log.entidad_afectada.toUpperCase()}
                                                </span>
                                            </td>
                                            {/* <td className='td' style={{ textAlign: 'center' }}>{log.entidad_id}</td> */}
                                            <td className='td fecha-tabla'>{formatearFecha(log.created_at)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                                            {searchTerm ? `No se encontraron registros para "${searchTerm}"` : "No hay registros de actividad."}
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

            <Foot tipo="2" />
        </div>
    );
}

export default Logs;