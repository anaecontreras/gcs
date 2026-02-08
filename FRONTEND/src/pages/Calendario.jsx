import { useState, useEffect } from 'react';
import Head from '../components/Head';
import Foot from '../components/Foot';
import Menu from '../components/Menu';

import * as Api from '../services/Api';
import * as Mensajes from '../services/Mensajes';

import { NewCalendario, BtnEdit, BtnErase } from '../services/Icons';


function Calendario({ userData, token }) {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [ahora, setAhora] = useState(new Date());

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3;

    // --- FUNCIÓN DE FORMATEO BLINDADA ---
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
                const data = await Api.getCalendario(token);
                setEventos(Array.isArray(data) ? data : []);
            } catch (error) {
                Mensajes.showErrorPersonalizado(error.message);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();

        const interval = setInterval(() => setAhora(new Date()), 60000);
        return () => clearInterval(interval);
    }, [token]);

    const obtenerEstado = (inicio, fin) => {
        const fechaInicio = new Date(inicio);
        const fechaFin = new Date(fin);

        if (isNaN(fechaInicio) || isNaN(fechaFin)) return { texto: "Error", color: "#666", orden: 3 };

        if (ahora < fechaInicio) {
            return { texto: "Vigente", color: "#1f66eb", orden: 1 };
        } else if (ahora >= fechaInicio && ahora <= fechaFin) {
            return { texto: "Ocurriendo", color: "#168128", orden: 0 };
        } else {
            return { texto: "Vencido", color: "#d33", orden: 2 };
        }
    };

    const filteredEventos = [...eventos]
        .sort((a, b) => {
            const fechaFinA = new Date(a.fecha_fin);
            const fechaFinB = new Date(b.fecha_fin);
            const estaVencidoA = ahora > fechaFinA;
            const estaVencidoB = ahora > fechaFinB;

            if (estaVencidoA !== estaVencidoB) {
                return estaVencidoA ? 1 : -1;
            }

            const inicioA = new Date(a.fecha_inicio);
            const inicioB = new Date(b.fecha_inicio);
            return inicioA - inicioB;
        })
        .filter(evento => {
            const term = searchTerm.toLowerCase();
            return (
                (evento.titulo || "").toLowerCase().includes(term) ||
                (evento.creador?.name || 'Sistema').toLowerCase().includes(term)
            );
        });

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = filteredEventos.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredEventos.length / recordsPerPage);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
    const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

    const handleNuevoRegistro = async () => {
        const resultado = await Mensajes.mostrarModalNuevoEvento();
        if (resultado.isConfirmed) {
            try {
                const response = await Api.storeEvento(token, resultado.value);
                Mensajes.showSuccess(response.message);
                const dataActualizada = await Api.getCalendario(token);
                setEventos(dataActualizada);
            } catch (error) {
                Mensajes.showErrorPersonalizado(error.message);
            }
        }
    };

    const handleEditarRegistro = async (evento) => {
        const resultado = await Mensajes.mostrarModalEditarEvento(evento);
        if (resultado.isConfirmed) {
            try {
                const response = await Api.updateEvento(token, resultado.value);
                Mensajes.showSuccess(response.message);
                const dataActualizada = await Api.getCalendario(token);
                setEventos(dataActualizada);
            } catch (error) {
                Mensajes.showErrorPersonalizado(error.message);
            }
        }
    };

    const handleEliminarRegistro = async (id, titulo) => {
        const resultado = await Mensajes.confirmarEliminacion(titulo);
        if (resultado.isConfirmed) {
            try {
                await Api.deleteEvento(token, id);
                Mensajes.showSuccess("Evento eliminado");
                setEventos(prev => prev.filter(e => e.id !== id));
                if (currentRecords.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                }
            } catch (error) {
                Mensajes.showErrorPersonalizado(error.message);
            }
        }
    };

    return (
        <div className="contenedor-ppal">
            <Head />
            <Menu tipo="2" userData={userData} />

            <div className="contenedor-medio contenedor-blog">
                <div className="header-seccion-blog">
                    <h1>Calendario de Mantenimientos</h1>
                    <input
                        type="text"
                        placeholder="🔍 Buscar evento o usuario..."
                        className="input-busqueda"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {userData.rol_id === 1 || userData.rol_id === 2 ?
                        <button className="btn-agregar-reg" onClick={handleNuevoRegistro} title='Cargar Datos de Nuevo Evento'>
                            <NewCalendario /> Programar Evento
                        </button>
                        :
                        ""
                    }

                </div>

                {loading ? (
                    <p>Cargando eventos...</p>
                ) : (
                    <>
                        <table className="tabla-custom">
                            <thead>
                                <tr>
                                    {userData.rol_id !== 4 && userData.rol_id !== 3 ?
                                        <>
                                            <th style={{ width: '10rem' }}>Usuario Creador</th>
                                            <th style={{ width: '35rem' }}>Mantenimiento Programado</th>
                                            <th style={{ width: '9rem' }}>Fecha Inicio</th>
                                            <th style={{ width: '9rem' }}>Fecha Fin</th>
                                        </>

                                        :
                                        <>
                                            <th style={{ width: '20rem' }}>Usuario Creador</th>
                                            <th style={{ width: '220rem' }}>Evento Programado</th>
                                            <th style={{ width: '28rem' }}>Fecha Inicio Evento</th>
                                            <th style={{ width: '28rem' }}>Fecha Fin Evento</th>
                                        </>

                                    }


                                    {userData.rol_id !== 4 && userData.rol_id !== 3 ?
                                        <th style={{ textAlign: 'center' }}>Acciones</th>
                                        :
                                        ""
                                    }

                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.length > 0 ? (
                                    currentRecords.map((evento) => {
                                        const estado = obtenerEstado(evento.fecha_inicio, evento.fecha_fin);
                                        const estaVencido = estado.texto === "Vencido";

                                        return (
                                            <tr key={evento.id}>
                                                <td style={{ color: '#168128' }}>
                                                    {evento.creador?.name || 'Sistema'}
                                                </td>
                                                <td style={{ fontWeight: '600' }}>
                                                    {evento.titulo}
                                                    <span style={{
                                                        marginLeft: '10px',
                                                        fontSize: '0.75rem',
                                                        color: estado.color,
                                                        border: `1px solid ${estado.color}`,
                                                        padding: '2px 6px',
                                                        borderRadius: '4px',
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        {estado.texto}
                                                    </span>
                                                </td>
                                                <td className="fecha-tabla">
                                                    {formatearFechaCorrecta(evento.fecha_inicio)}
                                                </td>
                                                <td className="fecha-tabla">
                                                    {formatearFechaCorrecta(evento.fecha_fin)}
                                                </td>
                                                <td className="celda-acciones" style={{ textAlign: 'center' }}>


                                                    {userData.rol_id !== 4 && userData.rol_id !== 3 ?
                                                        <>
                                                            {!estaVencido && (
                                                                <button
                                                                    className='butt'
                                                                    onClick={() => handleEditarRegistro(evento)}
                                                                >
                                                                    <BtnEdit />
                                                                    <span>Editar Programación</span>
                                                                </button>
                                                            )}

                                                            <button
                                                                className='butt danger'
                                                                onClick={() => handleEliminarRegistro(evento.id, evento.titulo)}
                                                            >
                                                                <BtnErase />
                                                                <span>Eliminar Programación</span>
                                                            </button>
                                                        </>
                                                        :
                                                        ""
                                                    }

                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                                            {searchTerm ? `No se encontraron eventos para "${searchTerm}"` : "No hay eventos registrados"}
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
            <Foot tipo="2" />
        </div>
    );
}

export default Calendario;