import { useState } from 'react';
import Head from '../components/Head';
import Foot from '../components/Foot';
import Menu from '../components/Menu';
import * as Api from '../services/Api';
import * as Mensajes from '../services/Mensajes';

// Librerías para el PDF
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

function Reporte3({ userData, token }) {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [loading, setLoading] = useState(false);

    const generarPDF = async () => {
        if (!fechaInicio || !fechaFin) {
            Mensajes.showError("Seleccione un rango de fecha válido.");
            return;
        }

        try {
            setLoading(true);

            // Llamada al endpoint de calendario
            const eventos = await Api.getCalendario(token);

            if (!Array.isArray(eventos)) {
                throw new Error("El formato de datos recibido no es un array.");
            }

            // Filtrar por rango de fecha (usando fecha_inicio del evento)
            const datosFiltrados = eventos.filter(item => {
                // Extraemos solo la fecha YYYY-MM-DD del string "2026-02-01 18:24:00"
                const fechaEvento = item.fecha_inicio.split(' ')[0];
                return fechaEvento >= fechaInicio && fechaEvento <= fechaFin;
            });

            if (datosFiltrados.length === 0) {
                Mensajes.showError("No hay eventos programados en el rango seleccionado.");
                return;
            }

            // Crear PDF
            const doc = new jsPDF();

            // Título
            doc.setFontSize(16);
            doc.text("* Reporte de Calendario de Mantenimientos *", 105, 15, { align: 'center' });

            // Subtítulo
            doc.setFontSize(11);
            doc.text(`(en el rango de fecha: ${fechaInicio} - ${fechaFin})`, 105, 22, { align: 'center' });

            // Encabezados: Evento Programado, Usuario Creador, Fecha Inicio, Fecha Fin
            const tableColumn = ["Mantenimiento Programado", "Usuario Creador", "Fecha Inicio", "Fecha Fin"];
            const tableRows = datosFiltrados.map(evento => [
                evento.titulo,
                evento.creador ? evento.creador.name : 'N/A',
                evento.fecha_inicio,
                evento.fecha_fin
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 30,
                theme: 'grid',
                headStyles: { fillColor: [48, 133, 214] },
                styles: { fontSize: 9 }
            });

            doc.save(`Reporte_Calendario-Mantenimiento_${fechaInicio}_a_${fechaFin}.pdf`);
            Mensajes.showSuccess("Reporte de calendario de mantenimiento generado con éxito.");

        } catch (error) {
            console.error("Error en Reporte3:", error);
            Mensajes.showError("Error al generar reporte: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contenedor-ppal">
            <Head />
            <Menu tipo="2" userData={userData} token={token} />

            <div className="contenedor-medio">
                <h1>Reporte de Calendario de Mantenimientos</h1>
                <h3>(Seleccione un rango de fecha)</h3>

                <div className="seccion-reportes">
                    <div className="fila-filtros">
                        <div className="grupo-input">
                            <label>Fecha inicio reporte:</label>
                            <input
                                type="date"
                                className="input-fecha"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                            />
                        </div>

                        <div className="grupo-input">
                            <label>Fecha fin reporte:</label>
                            <input
                                type="date"
                                className="input-fecha"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                            />
                        </div>

                        <button
                            className="btn-generar"
                            onClick={generarPDF}
                            disabled={loading}
                        >
                            {loading ? 'Procesando...' : 'Generar Reporte en PDF'}
                        </button>
                    </div>
                </div>
            </div>

            <Foot />
        </div>
    );
}

export default Reporte3;