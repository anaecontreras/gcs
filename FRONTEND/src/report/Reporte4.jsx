import { useState } from 'react';
import Head from '../components/Head';
import Foot from '../components/Foot';
import * as Api from '../services/Api';
import * as Mensajes from '../services/Mensajes';

// Librerías para el PDF
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import BarraMenu from '../components/BarraMenu';

function Reporte4({ userData, token }) {
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

            // Llamada al método getLogs definido en tu Api.js
            const logs = await Api.getLogs(token);

            if (!Array.isArray(logs)) {
                throw new Error("El formato de datos recibido no es un array.");
            }

            // Filtrar datos por fecha (created_at)
            const datosFiltrados = logs.filter(item => {
                const fechaItem = item.created_at.split('T')[0];
                return fechaItem >= fechaInicio && fechaItem <= fechaFin;
            });

            if (datosFiltrados.length === 0) {
                Mensajes.showError("No hay registros de actividad en el rango seleccionado.");
                return;
            }

            // Configurar jsPDF
            const doc = new jsPDF();

            // Título
            doc.setFontSize(16);
            doc.text("* Reporte de Historial Actividades *", 105, 15, { align: 'center' });

            // Subtítulo
            doc.setFontSize(11);
            doc.text(`(en el rango de fecha: ${fechaInicio} - ${fechaFin})`, 105, 22, { align: 'center' });

            // Encabezados: Acción Realizada, Usuario que la Realizó, Entidad Involucrada, Fecha Suceso
            const tableColumn = ["Acción Realizada", "Usuario (Correo)", "Entidad Involucrada", "Fecha Suceso"];
            const tableRows = datosFiltrados.map(log => [
                log.accion,
                log.usuario_correo,
                log.entidad_afectada,
                log.created_at.replace('T', ' ').split('.')[0] // Limpiamos un poco el formato ISO
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 30,
                theme: 'grid',
                headStyles: { fillColor: [48, 133, 214] }, // Azul estándar de tus reportes
                styles: { fontSize: 8 }, // Fuente un poco más pequeña por la longitud de las acciones
                columnStyles: {
                    0: { cellWidth: 70 }, // Damos más espacio a la columna de acción
                }
            });

            doc.save(`Reporte_Historial_${fechaInicio}_a_${fechaFin}.pdf`);
            Mensajes.showSuccess("Historial exportado correctamente.");

        } catch (error) {
            console.error("Error en Reporte4:", error);
            Mensajes.showError("Error al generar el reporte: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contenedor-ppal-reporte">
            <Head />
            <BarraMenu tipo="2" userData={userData} token={token} />

            <div className="contenedor-medio-reporte">
                <h1>Reporte de Historial Actividades</h1>
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

        </div>
    );
}

export default Reporte4;