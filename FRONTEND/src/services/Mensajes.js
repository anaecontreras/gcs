import Swal from 'sweetalert2';

// MENSAJE DE ERROR EN CREDENCIALES DE ACCESO - CLAVE ERRADA
export const showErrorCredenciales = () => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Credenciales ingresadas inválidas',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#d33',
    });
};

// MENSAJE DE ERROR EN CREDENCIALES DE ACCESO - FALTAN DATOS
export const showErrorFaltanDatos = () => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese todos los datos solicitados',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#d33',
    });
};

// CONFIRMACION DE SALIDA
export const confirmarSalida = () => {
    return Swal.fire({
        title: '¿Desea cerrar Sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
    });
};

// MENSAJE DE OK AL CAMBIAR CONTRASEÑA
export const showOKchangePassword = () => {
    Swal.fire({
        title: '¡Listo!',
        text: 'Contraseña actualizada correctamente',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
    });
};

// MENSAJE DE OK
export const showSuccess = (mensaje) => {
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: mensaje,
        timer: 2000,
        showConfirmButton: false
    });
};

// MENSAJE DE OK
export const showErrorMsg = (mensaje) => {
    Swal.fire({
        icon: 'error',
        title: '¡Érror!',
        text: mensaje,
        timer: 2000,
        showConfirmButton: false
    });
};

// MENSAJE DE ERROR AL INTENTAR CAMBIAR CONTRASEÑA
export const showErrorChangePassword = () => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Credenciales ingresadas inválidas, imposible actualizar contraseña',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#d33',
    });
};



// CAMBIO CONTRASEÑA
export const mostrarModalCambiarContraseña = () => {
    return Swal.fire({
        title: 'Cambiar Contraseña',
        html: `
            <div style="text-align: left; font-size: 0.9rem;">
                <form id="formCambiarContraseña">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 500;">
                            Contraseña actual
                        </label>
                        <input
                            id="currentPassword"
                            class="swal2-input"
                            type="password"
                            placeholder="Contraseña actual"
                            required
                            style="width: 80%;"
                        >
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 500;">
                            Nueva contraseña
                        </label>
                        <input
                            id="newPassword"
                            class="swal2-input"
                            type="password"
                            placeholder="Nueva contraseña"
                            required
                            style="width: 80%;"
                        >
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 500;">
                            Confirmar nueva contraseña
                        </label>
                        <input
                            id="confirmPassword"
                            class="swal2-input"
                            type="password"
                            placeholder="Repita Contraseña"
                            required
                            style="width: 80%;"
                        >
                    </div>
                </form>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        width: 400,
        preConfirm: () => {
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validaciones básicas
            if (!currentPassword || !newPassword || !confirmPassword) {
                Swal.showValidationMessage('Todos los campos son requeridos');
                return false;
            }

            if (newPassword !== confirmPassword) {
                Swal.showValidationMessage('Las contraseñas no coinciden');
                return false;
            }

            return { currentPassword, newPassword };
        }
    });
};



// CARGA DE NUEVA ENTRADA A BLOG
export const mostrarModalNuevoBlog = () => {
    return Swal.fire({
        title: 'Nuevo Registro de Evento',
        html: `
            <div style="text-align: left; font-size: 0.9rem;">
                <label style="font-weight: bold;">Título del Evento:</label>
                <input id="titulo" class="swal2-input" placeholder="Ej: Falla de red en servidor principal" maxlength="200" style="width: 85%;">

                <label style="font-weight: bold; display:block; margin-top:10px;">Prioridad:</label>
                <select id="prioridad" class="swal2-input" style="width: 85%; margin-left: 2rem">
                    <option value="" disabled selected>Seleccione prioridad</option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                </select>

                <label style="font-weight: bold; display:block; margin-top:10px;">Estado:</label>
                <select id="estado" class="swal2-input" style="width: 85%; margin-left: 2rem">
                    <option value="En Progreso">En Progreso</option>
                    <option value="Cerrado">Cerrado</option>
                </select>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar Registro',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#168128',
        preConfirm: () => {
            const titulo = document.getElementById('titulo').value.trim();
            const prioridad = document.getElementById('prioridad').value;
            const estado = document.getElementById('estado').value;

            if (!titulo || !prioridad || !estado) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }
            return { titulo, prioridad, estado };
        }
    });
};

// MODAL PARA EDITAR REGISTRO DE BLOG
export const mostrarModalEditarBlog = (blog) => {
    return Swal.fire({
        title: 'Editar Registro de Blog',
        html: `
            <div style="text-align: left; font-size: 0.9rem;">
                <label style="font-weight: bold;">Título del Evento:</label>
                <input id="titulo" class="swal2-input" value="${blog.titulo}" maxlength="200" style="width: 85%;">

                <label style="font-weight: bold; display:block; margin-top:10px;">Prioridad:</label>
                <select id="prioridad" class="swal2-input" style="width: 85%; margin-left: 2rem">
                    <option value="Baja" ${blog.prioridad === 'Baja' ? 'selected' : ''}>Baja</option>
                    <option value="Media" ${blog.prioridad === 'Media' ? 'selected' : ''}>Media</option>
                    <option value="Alta" ${blog.prioridad === 'Alta' ? 'selected' : ''}>Alta</option>
                </select>

                <label style="font-weight: bold; display:block; margin-top:10px;">Estado:</label>
                <select id="estado" class="swal2-input" style="width: 85%; margin-left: 2rem">
                    <option value="En Progreso" ${blog.estado === 'En Progreso' ? 'selected' : ''}>En Progreso</option>
                    <option value="Cerrado" ${blog.estado === 'Cerrado' ? 'selected' : ''}>Cerrado</option>
                </select>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Actualizar Cambios',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        preConfirm: () => {
            const titulo = document.getElementById('titulo').value.trim();
            const prioridad = document.getElementById('prioridad').value;
            const estado = document.getElementById('estado').value;

            if (!titulo || !prioridad || !estado) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }
            return { id: blog.id, titulo, prioridad, estado };
        }
    });
};

// CONFIRMACIÓN PARA ELIMINAR REGISTRO
export const confirmarEliminacion = (titulo) => {
    return Swal.fire({
        title: '¿Estás seguro?',
        text: `Vas a eliminar el registro: "${titulo}". Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
};

// CARGA DE NUEVO EVENTO AL CALENDARIO
export const mostrarModalNuevoEvento = () => {
    return Swal.fire({
        title: 'Nuevo Evento de Calendario',
        html: `
            <div style="text-align: left; font-size: 0.9rem;">
                <label style="font-weight: bold;">Título del Evento:</label>
                <input id="titulo" class="swal2-input" placeholder="Ej: Mantenimiento Preventivo" maxlength="200" style="width: 85%;">

                <label style="font-weight: bold; display:block; margin-top:10px;">Fecha y Hora de Inicio:</label>
                <input id="fecha_inicio" type="datetime-local" class="swal2-input" style="width: 85%;">

                <label style="font-weight: bold; display:block; margin-top:10px;">Fecha y Hora de Fin:</label>
                <input id="fecha_fin" type="datetime-local" class="swal2-input" style="width: 85%;">
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar Evento',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#168128',
        preConfirm: () => {
            const titulo = document.getElementById('titulo').value.trim();
            const fecha_inicio = document.getElementById('fecha_inicio').value;
            const fecha_fin = document.getElementById('fecha_fin').value;

            if (!titulo || !fecha_inicio || !fecha_fin) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }

            if (new Date(fecha_inicio) >= new Date(fecha_fin)) {
                Swal.showValidationMessage('La fecha de fin debe ser posterior a la de inicio');
                return false;
            }

            return { titulo, fecha_inicio, fecha_fin };
        }
    });
};

// MODAL PARA EDITAR EVENTO (Opcional por ahora, pero útil)
export const mostrarModalEditarEvento = (evento) => {
    // Formatear fechas para que el input datetime-local las entienda (YYYY-MM-DDTHH:MM)
    const formatFechaParaInput = (str) => {
        if (!str) return "";
        return str.replace(' ', 'T').substring(0, 16);
    };

    return Swal.fire({
        title: 'Editar Evento',
        html: `
            <div style="text-align: left; font-size: 0.9rem;">
                <label style="font-weight: bold;">Título del Evento:</label>
                <input id="titulo" class="swal2-input" value="${evento.titulo}" style="width: 85%;">

                <label style="font-weight: bold; display:block; margin-top:10px;">Fecha y Hora de Inicio:</label>
                <input id="fecha_inicio" type="datetime-local" class="swal2-input" value="${formatFechaParaInput(evento.fecha_inicio)}" style="width: 85%;">

                <label style="font-weight: bold; display:block; margin-top:10px;">Fecha y Hora de Fin:</label>
                <input id="fecha_fin" type="datetime-local" class="swal2-input" value="${formatFechaParaInput(evento.fecha_fin)}" style="width: 85%;">
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        confirmButtonColor: '#3085d6',
        preConfirm: () => {
            const titulo = document.getElementById('titulo').value.trim();
            let fecha_inicio = document.getElementById('fecha_inicio').value;
            let fecha_fin = document.getElementById('fecha_fin').value;

            if (!titulo || !fecha_inicio || !fecha_fin) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }

            // Opcional: Reemplazar la 'T' por un espacio para asegurar compatibilidad con el backend
            fecha_inicio = fecha_inicio.replace('T', ' ');
            fecha_fin = fecha_fin.replace('T', ' ');

            return { id: evento.id, titulo, fecha_inicio, fecha_fin };
        }
    });
};

// MODAL PARA CARGAR NUEVO DOCUMENTO
export const mostrarModalNuevoDocumento = (categorias) => {
    // Generamos las opciones del select dinámicamente
    const opcionesCategorias = categorias.map(cat =>
        `<option value="${cat.id}">${cat.nombre_categoria}</option>`
    ).join('');

    return Swal.fire({
        title: 'Subir Nuevo Documento',
        html: `
            <div style="text-align: left; font-size: 0.9rem;">
                <label style="font-weight: bold;">Título:</label>
                <input id="titulo" class="swal2-input" placeholder="Ej: Manual de Redes" style="width: 85%;">

                <label style="font-weight: bold; display:block; margin-top:10px;">Categoría:</label>
                <select id="categoria_id" class="swal2-input" style="width: 85%; margin-left: 2rem">
                    <option value="" disabled selected>Seleccione categoría</option>
                    ${opcionesCategorias}
                </select>

                <label style="font-weight: bold; display:block; margin-top:10px;">Versión:</label>
                <input id="version" class="swal2-input" placeholder="Ej: 1.0" style="width: 85%;">

                <label style="font-weight: bold; display:block; margin-top:10px;">Fecha de Publicación:</label>
                <input id="fecha_publicacion" type="date" class="swal2-input" style="width: 85%;">

                <label style="font-weight: bold; display:block; margin-top:10px;">Archivo (PDF):</label>
                <input id="archivo" type="file" class="swal2-file" accept=".pdf" style="width: 85%; margin-top: 5px;">
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Subir Archivo',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#168128',
        preConfirm: () => {
            const titulo = document.getElementById('titulo').value.trim();
            const categoria_id = document.getElementById('categoria_id').value;
            const version = document.getElementById('version').value.trim();
            const fecha_publicacion = document.getElementById('fecha_publicacion').value;
            const archivoInput = document.getElementById('archivo');
            const archivo = archivoInput.files[0];

            if (!titulo || !categoria_id || !version || !fecha_publicacion || !archivo) {
                Swal.showValidationMessage('Todos los campos son obligatorios, incluyendo el archivo');
                return false;
            }

            // Retornamos un objeto plano; el componente se encargará de convertirlo a FormData
            return { titulo, categoria_id, version, fecha_publicacion, archivo };
        }
    });
};

// MODAL PARA EDITAR DOCUMENTO
export const mostrarModalEditarDocumento = (doc, categorias) => {
    const opcionesCategorias = categorias.map(cat =>
        `<option value="${cat.id}" ${cat.id === doc.categoria_id ? 'selected' : ''}>${cat.nombre_categoria}</option>`
    ).join('');

    return Swal.fire({
        title: 'Editar Documento',
        html: `
            <div style="text-align: left; font-size: 0.9rem;">
                <input type="hidden" id="edit_id" value="${doc.id}">

                <label style="font-weight: bold;">Título:</label>
                <input id="edit_titulo" class="swal2-input" value="${doc.titulo}" style="width: 85%;">

                <label style="font-weight: bold; display:block; margin-top:10px;">Categoría:</label>
                <select id="edit_categoria_id" class="swal2-input" style="width: 85%; margin-left: 2rem">
                    ${opcionesCategorias}
                </select>

                <label style="font-weight: bold; display:block; margin-top:10px;">Versión:</label>
                <input id="edit_version" class="swal2-input" value="${doc.version}" style="width: 85%;">

                <label style="font-weight: bold; display:block; margin-top:10px;">Fecha de Publicación:</label>
                <input id="edit_fecha_publicacion" type="date" class="swal2-input" value="${doc.fecha_publicacion}" style="width: 85%;">

                <label style="font-weight: bold; display:block; margin-top:10px;">Nuevo Archivo (Opcional):</label>
                <input id="edit_archivo" type="file" class="swal2-file" accept=".pdf" style="width: 85%; margin-top: 5px;">
                <small style="margin-left: 2rem; color: gray;">Deje vacío para mantener el archivo actual.</small>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar Cambios',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#168128',
        preConfirm: () => {
            const id = document.getElementById('edit_id').value;
            const titulo = document.getElementById('edit_titulo').value.trim();
            const categoria_id = document.getElementById('edit_categoria_id').value;
            const version = document.getElementById('edit_version').value.trim();
            const fecha_publicacion = document.getElementById('edit_fecha_publicacion').value;
            const archivoInput = document.getElementById('edit_archivo');
            const archivo = archivoInput.files[0]; // Puede ser undefined

            if (!titulo || !categoria_id || !version || !fecha_publicacion) {
                Swal.showValidationMessage('Los campos de texto son obligatorios');
                return false;
            }

            return { id, titulo, categoria_id, version, fecha_publicacion, archivo };
        }
    });
};

export const showModalNuevoTema = async () => {
    const { value: formValues } = await Swal.fire({
        title: 'Crear Nuevo Tema de Foro',
        html:
            `<div style="display:flex; flex-direction:column; gap:10px; text-align:left;">
                <label><b>Título del Tema:</b></label>
                <input id="swal-titulo" class="swal2-input" style="margin:0; width: -webkit-fill-available;" placeholder="Ej: Mejores prácticas en React">

                <label><b>Estado Inicial:</b></label>
                <select id="swal-estado" class="swal2-input" style="margin:0; width: -webkit-fill-available;">
                    <option value="Abierto">Abierto</option>
                    <option value="Cerrado">Cerrado</option>
                </select>
            </div>`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar Tema',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#1f66eb',
        preConfirm: () => {
            const titulo = document.getElementById('swal-titulo').value;
            const estado = document.getElementById('swal-estado').value;

            if (!titulo || !estado) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }
            return { titulo, estado };
        }
    });

    return formValues; // Retorna {titulo, estado} o undefined si cancela
};

export const confirmDelete = async (titulo) => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: `Vas a eliminar el tema: "${titulo}". Esta acción borrará también todos sus comentarios y no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
};

export const showModalTema = async (tema = null) => {
    const isEdit = !!tema;
    const { value: formValues } = await Swal.fire({
        title: isEdit ? 'Editar Tema de Foro' : 'Crear Nuevo Tema de Foro',
        html:
            `<div style="display:flex; flex-direction:column; gap:10px; text-align:left;">
                <label><b>Título del Tema:</b></label>
                <input id="swal-titulo" class="swal2-input" style="margin:0; width: -webkit-fill-available;"
                       placeholder="Ej: Mejores prácticas en React"
                       value="${isEdit ? tema.titulo : ''}">

                <label><b>Estado:</b></label>
                <select id="swal-estado" class="swal2-input" style="margin:0; width: -webkit-fill-available;">
                    <option value="Abierto" ${isEdit && tema.estado === 'Abierto' ? 'selected' : ''}>Abierto</option>
                    <option value="Cerrado" ${isEdit && tema.estado === 'Cerrado' ? 'selected' : ''}>Cerrado</option>
                </select>
            </div>`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: isEdit ? 'Actualizar' : 'Guardar Tema',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#1f66eb',
        preConfirm: () => {
            const titulo = document.getElementById('swal-titulo').value;
            const estado = document.getElementById('swal-estado').value;

            if (!titulo || !estado) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }
            // Si es edición, incluimos el ID en el objeto de retorno
            return isEdit ? { id: tema.id, titulo, estado } : { titulo, estado };
        }
    });

    return formValues;
};

export const confirmGeneric = async (titulo, texto) => {
    const result = await Swal.fire({
        title: titulo,
        text: texto,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1f66eb',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
};

export const showModalNuevoComentario = async (tituloTema, cuerpoActual = null) => {
    const isEdit = !!cuerpoActual;
    const { value: cuerpo } = await Swal.fire({
        title: isEdit ? 'Editar Comentario' : 'Escribir Comentario',
        html: `
            <div style="text-align:left;">
                <p>${isEdit ? 'Editando respuesta en:' : 'Respondiendo a:'} <b>${tituloTema}</b></p>
                <textarea id="swal-cuerpo" class="swal2-textarea" style="margin:0; width: -webkit-fill-available;" placeholder="Escribe tu respuesta aquí...">${isEdit ? cuerpoActual : ''}</textarea>
            </div>`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Publicar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#1f66eb',
        preConfirm: () => {
            const cuerpo = document.getElementById('swal-cuerpo').value;
            if (!cuerpo) {
                Swal.showValidationMessage('El comentario no puede estar vacío');
                return false;
            }
            return cuerpo;
        }
    });
    return cuerpo;
};

export const mostrarModalNuevoUsuario = async (roles, token, ApiService) => {
    const optionsHtml = roles.map(r => `<option value="${r.id}">${r.rol}</option>`).join('');

    return await Swal.fire({
        title: 'Nuevo Usuario',
        html: `
            <div style="text-align:left;">
                <label style="font-size: 0.9rem;">Nombre Completo:</label>
                <input style="font-size: 0.9rem; width: 25rem; margin-top: 0; margin-bottom: 0.8rem;" id="swal-name" class="swal2-input" placeholder="Ej: Juan Pérez">
                <br/>

                <label style="font-size: 0.9rem;">Correo Electrónico:</label>
                <input id="swal-email" style="font-size: 0.9rem; width: 25rem; margin-top: 0; margin-bottom: 0.8rem;" type="email" class="swal2-input" placeholder="correo@ejemplo.com">

                <label style="font-size: 0.9rem;">Unidad Operativa:</label>
                <input id="swal-unidad" style="font-size: 0.9rem; width: 25rem; margin-top: 0; margin-bottom: 0.8rem;" class="swal2-input" placeholder="Ej: CANTV Av Libertador">

                <label style="font-size: 0.9rem;">Rol de Usuario:</label>
                <select style="font-size: 0.9rem; width: 25rem; margin-top: 0; margin-bottom: 0.8rem; margin-left: 1.9rem;" id="swal-rol" class="swal2-input">
                    <option value="">Seleccione un rol...</option>
                    ${optionsHtml}
                </select>

                <label style="font-size: 0.9rem;">Contraseña:</label>
                <input style="font-size: 0.9rem; width: 13rem; margin-top: 0; margin-bottom: 0.8rem;" id="swal-pass" type="password" class="swal2-input" placeholder="Mínimo 8 caracteres"> <br/>

                <label style="font-size: 0.9rem;">Confirmar:</label>
                <input style="font-size: 0.9rem; width: 13rem; margin-top: 0; margin-bottom: 0.8rem;" id="swal-pass-conf" type="password" class="swal2-input" placeholder="Repita la contraseña">
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar Usuario',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#168128',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            const name = document.getElementById('swal-name').value;
            const email = document.getElementById('swal-email').value;
            const unidad_operativa = document.getElementById('swal-unidad').value;
            const rol_id = document.getElementById('swal-rol').value;
            const password = document.getElementById('swal-pass').value;
            const password_confirmation = document.getElementById('swal-pass-conf').value;

            if (!name || !email || !unidad_operativa || !rol_id || !password) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }

            try {
                return await ApiService.registerUser(token, {
                    name, email, unidad_operativa, rol_id, password, password_confirmation
                });
            } catch (error) {
                // CAPTURAMOS EL MENSAJE Y LO TRADUCIMOS
                let mensajeError = error.message;

                if (mensajeError.includes('has already been taken')) {
                    mensajeError = 'El correo electrónico ya está registrado';
                } else if (mensajeError.includes('password must be at least')) {
                    mensajeError = 'La contraseña es demasiado corta';
                }

                Swal.showValidationMessage(mensajeError);
                return false;
            }
        }
    });
};

// Agregar al final de Mensajes.js
export const confirmarAccion = (titulo, mensaje) => {
    return Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar'
    });
};

export const mostrarModalEditarUsuario = async (usuario, roles) => {
    return Swal.fire({
        title: 'Editar Usuario',
        html: `
            <div style="text-align: left;">
                <label style="font-size: 0.9rem;">Nombre Completo:</label>
                <input style="font-size: 0.9rem; width: 25rem; margin-top: 0; margin-bottom: 0.8rem;" id="swal-name" class="swal2-input" value="${usuario.name}">

                <label style="font-size: 0.9rem;">Unidad Operativa:</label>
                <input style="font-size: 0.9rem; width: 25rem; margin-top: 0; margin-bottom: 0.8rem;" id="swal-unidad" class="swal2-input" value="${usuario.unidad_operativa || ''}">

                <label style="font-size: 0.9rem;">Rol del Sistema:</label>
                <select style="font-size: 0.9rem; width: 25rem; margin-top: 0; margin-bottom: 0.8rem; margin-left: 1.9rem" id="swal-rol" class="swal2-input">
                    ${roles.map(r => `
                        <option value="${r.id}" ${Number(r.id) === Number(usuario.rol_id) ? 'selected' : ''}>
                            ${r.rol}
                        </option>
                    `).join('')}
                </select>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: () => {
            const name = document.getElementById('swal-name').value;
            const unidad = document.getElementById('swal-unidad').value;
            const rol = document.getElementById('swal-rol').value;

            console.log(name, unidad, rol);

            if (!name || !unidad || !rol) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }

            return {
                user_id: parseInt(usuario.id),
                name: name,
                "unidad-operativa": unidad, // Mantenemos el guion medio para el controlador
                rol_id: parseInt(rol)
            };
        }
    });
};

export const showError = (mensaje) => {
    Swal.fire({
        icon: 'error',
        title: 'Atención',
        text: mensaje || 'Hubo un error en la solicitud',
        confirmButtonColor: '#d33',
    });
};

export const mostrarDetalleEvento = (evento, formatearFecha, puedeEditar) => {
    return Swal.fire({
        title: 'Detalles del Mantenimiento',
        html: `
            <div style="text-align: left; font-size: 1rem; line-height: 1.6;">
                <p><strong>Evento:</strong> ${evento.titulo}</p>
                <p><strong>Inicia:</strong> ${formatearFecha(evento.fecha_inicio)}</p>
                <p><strong>Finaliza:</strong> ${formatearFecha(evento.fecha_fin)}</p>
                <p><strong>Estado:</strong> ${new Date(evento.fecha_fin) < new Date() ?
                '<span style="color:red">Vencido</span>' :
                '<span style="color:green">Vigente</span>'}</p>
            </div>
        `,
        showCancelButton: puedeEditar,
        showDenyButton: puedeEditar,
        confirmButtonText: 'Cerrar',
        cancelButtonText: 'Eliminar',
        denyButtonText: 'Editar',
        confirmButtonColor: '#183592',
        denyButtonColor: '#f0ad4e', // Color naranja para editar
        cancelButtonColor: '#d33',   // Color rojo para eliminar
    });
};

// CONFIRMACIÓN PARA ELIMINAR EVENTO (CORRECTO)
export const confirmarEliminarEvento = (titulo) => {
    return Swal.fire({
        title: '¿Estás seguro?',
        text: `Vas a eliminar el evento: "${titulo}". Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'No, cancelar'
    });
};
