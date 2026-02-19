import { useState } from 'react';
import Head from '../components/Head';
import Foot from '../components/Foot';
import * as Api from '../services/Api';
import * as Mensajes from '../services/Mensajes';

// Librerías para el PDF
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import BarraMenu from './../components/BarraMenu';
import './Reportes.css';

function Reporte1({ userData, token }) {
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

            // Llamada a tu API (que ya retorna el array data.blogs directamente)
            const blogs = await Api.getBlogs(token);

            // Verificación de seguridad
            if (!Array.isArray(blogs)) {
                throw new Error("El formato de datos recibido no es un array.");
            }

            // Filtrar datos por fecha (created_at)
            const datosFiltrados = blogs.filter(item => {
                const fechaItem = item.created_at.split('T')[0];
                return fechaItem >= fechaInicio && fechaItem <= fechaFin;
            });

            if (datosFiltrados.length === 0) {
                Mensajes.showError("No hay registros en el rango de fechas seleccionado.");
                return;
            }

            // Configurar jsPDF
            const doc = new jsPDF();

            // Título centrado
            doc.setFontSize(16);
            doc.text("* Reporte de Contingencia *", 105, 15, { align: 'center' });

            // Subtítulo
            doc.setFontSize(11);
            doc.text(`(en el rango de fecha: ${fechaInicio} - ${fechaFin})`, 105, 22, { align: 'center' });

            // Encabezados según tu solicitud
            const tableColumn = ["Alertas, mantenimientos y novedades del sistema", "Prioridad", "Estado", "Fecha Ocurrencia", "Usuario que Reporta"];
            const tableRows = datosFiltrados.map(blog => [
                blog.titulo,
                blog.prioridad,
                blog.estado,
                blog.created_at.split('T')[0], // Fecha formateada
                blog.usuario ? blog.usuario.name : 'N/A'
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 30,
                theme: 'grid',
                headStyles: { fillColor: [48, 133, 214] }, // Azul profesional
                styles: { fontSize: 9 }
            });

            doc.save(`Reporte_Contingencia_${fechaInicio}_a_${fechaFin}.pdf`);
            Mensajes.showSuccess("Reporte de Contingencia generado correctamente.");

        } catch (error) {
            console.error("Error en Reporte1:", error);
            Mensajes.showError("Hubo un error al generar el reporte: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contenedor-ppal-reporte">
            <Head />
            <BarraMenu tipo="2" userData={userData} token={token} />

            <div className="contenedor-medio-reporte">
                <h1>Reporte de Contingencias</h1>
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

export default Reporte1;