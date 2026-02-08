import { useState, useEffect } from 'react';
import Head from '../components/Head';
import Foot from '../components/Foot';
import Menu from '../components/Menu';

import * as Api from '../services/Api';
import * as Mensajes from '../services/Mensajes';
import Swal from 'sweetalert2'; // Importante para las validaciones de resultados

import { NewCalendario, BtnEdit, BtnErase } from '../services/Icons';

function Calendario({ userData, token }) {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ahora, setAhora] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const changeMonth = (offset) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    const getEventosDia = (dia) => {
        return eventos.filter(ev => {
            const fechaEv = new Date(ev.fecha_inicio);
            return fechaEv.getDate() === dia &&
                fechaEv.getMonth() === currentDate.getMonth() &&
                fechaEv.getFullYear() === currentDate.getFullYear();
        });
    };

    const truncate = (str, n) => {
        return (str && str.length > n) ? str.substr(0, n - 1) + "..." : str;
    };

    const formatearFechaCorrecta = (fechaStr) => {
        try {
            if (!fechaStr || typeof fechaStr !== 'string') return "N/A";
            const fechaNormalizada = fechaStr.replace(' ', 'T');
            const partes = fechaNormalizada.split('T');
            const fechaPart = partes[0];
            const horaPart = partes[1].split('.')[0];
            const [año, mes, dia] = fechaPart.split('-');
            const [horas, minutos, segundos] = horaPart.split(':');
            return `${dia}/${mes}/${año}-${horas}:${minutos}:${segundos}`;
        } catch (e) {
            return fechaStr;
        }
    };

    useEffect(() => {
        if (!token) return;
        const cargarDatos = async () => {
            try {
                setLoading(true);
                const data = await Api.getCalendario(token);
                setEventos(Array.isArray(data) ? data : []);
            } catch (error) {
                Mensajes.showError(error.message);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
        const interval = setInterval(() => setAhora(new Date()), 60000);
        return () => clearInterval(interval);
    }, [token]);

    const hayEventosAnteriores = () => {
        const primerDiaMesActual = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        return eventos.some(ev => new Date(ev.fecha_inicio) < primerDiaMesActual);
    };

    const hayEventosPosteriores = () => {
        const ultimoDiaMesActual = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59);
        return eventos.some(ev => new Date(ev.fecha_inicio) > ultimoDiaMesActual);
    };

    const handleVerDetalle = async (evento) => {
        const fechaFinEvento = new Date(evento.fecha_fin);
        const estaVencido = fechaFinEvento < ahora;
        const tienePermisos = userData.rol_id === 1 || userData.rol_id === 2;
        const puedeAccionar = !estaVencido && tienePermisos;

        // 1. Mostramos el detalle usando tu servicio
        const result = await Mensajes.mostrarDetalleEvento(evento, formatearFechaCorrecta, puedeAccionar);

        // 2. LÓGICA PARA EDITAR (Botón Denied)
        if (result.isDenied) {
            const edicion = await Mensajes.mostrarModalEditarEvento(evento);
            if (edicion.isConfirmed) {
                try {
                    const res = await Api.updateEvento(token, edicion.value);
                    Mensajes.showSuccess(res.message || "Evento actualizado");
                    const dataActualizada = await Api.getCalendario(token);
                    setEventos(dataActualizada);
                } catch (error) {
                    Mensajes.showError(error.message);
                }
            }
        }

        // 3. LÓGICA PARA ELIMINAR (Botón Cancel / Dismiss)
        // Usamos la nueva función de Mensajes.js
        else if (result.dismiss === Swal.DismissReason.cancel) {

            const confirmacion = await Mensajes.confirmarEliminarEvento(evento.titulo);

            if (confirmacion.isConfirmed) {
                try {
                    const res = await Api.deleteEvento(token, evento.id);
                    Mensajes.showSuccess(res.message || "Evento eliminado");

                    // Refrescar datos
                    const dataActualizada = await Api.getCalendario(token);
                    setEventos(dataActualizada);
                } catch (error) {
                    Mensajes.showError(error.message);
                }
            }
        }
    };

    const handleNuevoRegistro = async () => {
        const resultado = await Mensajes.mostrarModalNuevoEvento();
        if (resultado.isConfirmed) {
            try {
                const response = await Api.storeEvento(token, resultado.value);
                Mensajes.showSuccess(response.message);
                const dataActualizada = await Api.getCalendario(token);
                setEventos(dataActualizada);
            } catch (error) {
                Mensajes.showError(error.message);
            }
        }
    };

    return (
        <div className="contenedor-ppal">
            <Head />
            <Menu tipo="2" userData={userData} />
            <div className="contenedor-medio contenedor-foro">
                <div className="header-seccion-blog">
                    <h1>{meses[currentDate.getMonth()]} {currentDate.getFullYear()}</h1>
                    <div className="paginacion" style={{ margin: 0 }}>
                        <button
                            onClick={() => changeMonth(-1)}
                            disabled={!hayEventosAnteriores()}
                            style={{ opacity: hayEventosAnteriores() ? 1 : 0.5, cursor: hayEventosAnteriores() ? 'pointer' : 'not-allowed' }}
                        >⏪ Anterior</button>
                        <button onClick={() => setCurrentDate(new Date())} style={{ cursor: 'pointer' }}>Hoy</button>
                        <button
                            onClick={() => changeMonth(1)}
                            disabled={!hayEventosPosteriores()}
                            style={{ opacity: hayEventosPosteriores() ? 1 : 0.5, cursor: hayEventosPosteriores() ? 'pointer' : 'not-allowed' }}
                        >Siguiente ⏩</button>
                    </div>
                    {(userData.rol_id === 1 || userData.rol_id === 2) && (
                        <button className="btn-agregar-reg" onClick={handleNuevoRegistro}>
                            <NewCalendario /> Programar Evento
                        </button>
                    )}
                </div>

                {loading ? (
                    <p>Cargando eventos...</p>
                ) : (
                    <div className="calendario-grid">
                        {diasSemana.map(d => <div key={d} className="cal-header">{d}</div>)}
                        {[...Array(firstDayOfMonth)].map((_, i) => <div key={`empty-${i}`} className="cal-dia empty"></div>)}
                        {[...Array(daysInMonth)].map((_, i) => {
                            const dia = i + 1;
                            const eventosDia = getEventosDia(dia);
                            const esHoy = dia === ahora.getDate() && currentDate.getMonth() === ahora.getMonth() && currentDate.getFullYear() === ahora.getFullYear();
                            return (
                                <div key={dia} className={`cal-dia ${esHoy ? 'hoy' : ''}`}>
                                    <span className="num-dia">{dia}</span>
                                    <div className="eventos-container">
                                        {eventosDia.map(ev => (
                                            <div
                                                key={ev.id}
                                                className="evento-item"
                                                title={ev.titulo}
                                                onClick={() => handleVerDetalle(ev)}
                                            >
                                                {truncate(ev.titulo, 15)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <Foot tipo="2" />
        </div>
    );
}

export default Calendario;