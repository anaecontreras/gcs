import { useState } from 'react';
import Head from '../components/Head';
import * as Api from '../services/Api';
import * as Mensajes from '../services/Mensajes';

// Librerías para el PDF
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import BarraMenu from '../components/BarraMenu';

import './Reportes.css';

// Importamos la misma imagen de fondo que usa Reporte1 para mantener consistencia visual
import fondoReportes from '../assets/image/img_reportes.webp';

function Reporte2({ userData, token }) {
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

            // Llamada al endpoint de temas del foro
            const temas = await Api.getTemasForo(token);

            if (!Array.isArray(temas)) {
                throw new Error("El formato de datos recibido no es un array.");
            }

            // Filtrar por rango de fecha
            const datosFiltrados = temas.filter(item => {
                const fechaItem = item.created_at.split('T')[0];
                return fechaItem >= fechaInicio && fechaItem <= fechaFin;
            });

            if (datosFiltrados.length === 0) {
                Mensajes.showError("No hay registros en el rango de fechas seleccionado.");
                return;
            }

            // Crear PDF
            const doc = new jsPDF();

            // Título
            doc.setFontSize(16);
            doc.text("* Reporte del Foro-Técnico *", 105, 15, { align: 'center' });

            // Subtítulo
            doc.setFontSize(11);
            doc.text(`(en el rango de fecha: ${fechaInicio} - ${fechaFin})`, 105, 22, { align: 'center' });

            // Encabezados solicitados
            const tableColumn = ["Titulo del Tema", "Estado del Tema", "Publicado por", "Fecha de publicación"];
            const tableRows = datosFiltrados.map(tema => [
                tema.titulo,
                tema.estado,
                tema.usuario ? tema.usuario.name : 'N/A',
                tema.created_at.split('T')[0]
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 30,
                theme: 'grid',
                headStyles: { fillColor: [48, 133, 214] }, // Mismo azul de Reporte1
                styles: { fontSize: 9 }
            });

            doc.save(`Reporte_Foro-Técnico_${fechaInicio}_a_${fechaFin}.pdf`);
            Mensajes.showSuccess("Reporte de foro técnico generado con éxito.");

        } catch (error) {
            console.error("Error en Reporte2:", error);
            Mensajes.showError("Error al generar reporte: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contenedor-ppal-reporte">
            <Head />
            <BarraMenu tipo="2" userData={userData} token={token} />

            {/* Envoltorio con fondo: misma estructura que Reporte1 para consistencia */}
            <div className="wrapper-fondo-reporte">
                {/* Capa de fondo con la imagen importada */}
                <div
                    className="fondo-reporte-local"
                    style={{ backgroundImage: `url(${fondoReportes})` }}
                ></div>

                {/* Tarjeta de contenido: va encima del fondo, con altura fija */}
                <div className="contenedor-medio-reporte">
                    <h1>Reporte de Temas-Técnicos</h1>
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

        </div>
    );
}

export default Reporte2;