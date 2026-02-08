const BASE_URL = "http://127.0.0.1:8000/api";

export const login = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Lanzamos el mensaje que viene del backend o uno genérico
            throw new Error(data.message || "Error en la conexión");
        }

        return data; // Aquí viene el access_token y el user
    } catch (error) {
        throw error;
    }
};

export const logout = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al cerrar sesión en el servidor");
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const changePassword = async (token, passwords) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/change-password`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                current_password: passwords.currentPassword,
                new_password: passwords.newPassword,
                new_password_confirmation: passwords.newPassword // El modal ya valida que sean iguales
            }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al actualizar la contraseña");

        return data; // Retorna el mensaje y el nuevo access_token
    } catch (error) {
        throw error;
    }
};

export const getBlogs = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/blog/index`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al obtener blogs");

        return data.blogs; // Retornamos el array de la respuesta
    } catch (error) {
        throw error;
    }
};

export const storeBlog = async (token, blogData) => {
    try {
        const response = await fetch(`${BASE_URL}/blog/store`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(blogData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al crear el registro");

        return data;
    } catch (error) {
        throw error;
    }
};

export const updateBlog = async (token, blogData) => {
    try {
        const response = await fetch(`${BASE_URL}/blog/edit`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(blogData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al actualizar el registro");

        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteBlog = async (token, id) => {
    try {
        const response = await fetch(`${BASE_URL}/blog/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "No se pudo eliminar el registro");

        return data;
    } catch (error) {
        throw error;
    }
};

export const getCalendario = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/calendario/index`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al obtener el calendario");

        return data.calendario; // Retornamos el array de eventos
    } catch (error) {
        throw error;
    }
};

export const storeEvento = async (token, eventoData) => {
    try {
        const response = await fetch(`${BASE_URL}/calendario/store`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(eventoData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al registrar la fecha");

        return data;
    } catch (error) {
        throw error;
    }
};

// También agrego el delete por si el endpoint ya existe:
export const deleteEvento = async (token, id) => {
    try {
        const response = await fetch(`${BASE_URL}/calendario/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al eliminar evento");
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateEvento = async (token, eventoData) => {
    try {
        const response = await fetch(`${BASE_URL}/calendario/edit`, {
            method: "POST", // Según tu especificación usas POST para editar
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(eventoData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al actualizar el evento");

        return data;
    } catch (error) {
        throw error;
    }
};

export const getLogs = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/logs/index`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al obtener el historial");

        return data.logs; // Retornamos el array de la respuesta
    } catch (error) {
        throw error;
    }
};

export const getDocumentos = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/documentos`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al obtener documentos");
        return data; // Retorna el array directamente según tu ejemplo
    } catch (error) {
        throw error;
    }
};

export const deleteDocumento = async (token, id) => {
    try {
        // Ajustado para coincidir con: Route::delete('documentos/{id}', ...)
        const response = await fetch(`${BASE_URL}/documentos/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al eliminar el documento");
        return data;
    } catch (error) {
        throw error;
    }
};

export const getCategoriasDoc = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/categoriadoc/index`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al obtener categorías");
        return data.categorias;
    } catch (error) {
        throw error;
    }
};

export const storeDocumento = async (token, formData) => {
    const response = await fetch(`${BASE_URL}/documentos/store`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
        body: formData,
    });

    const text = await response.text(); // Leemos como texto primero
    console.log("LOG CRITICO - RESPUESTA BRUTA:", text);

    try {
        const data = JSON.parse(text);
        if (!response.ok) {
            const detallado = data.errors ? JSON.stringify(data.errors) : data.message;
            throw new Error(detallado || "Error 422");
        }
        return data;
    } catch (e) {
        throw new Error("Respuesta del servidor: " + text);
    }
};

export const updateDocumento = async (token, formData) => {
    try {
        const response = await fetch(`${BASE_URL}/documentos/edit`, {
            method: "POST", // Tu endpoint en Laravel usa POST para recibir el FormData
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
            body: formData,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al actualizar el documento");

        return data;
    } catch (error) {
        throw error;
    }
};

export const getTemasForo = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/temas-foro`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al obtener temas");
        return data.temas;
    } catch (error) {
        throw error;
    }
};

export const getComentarios = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/comentarios`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al obtener comentarios");
        return data.comentarios;
    } catch (error) {
        throw error;
    }
};

export const postTema = async (token, temaData) => {
    try {
        const response = await fetch(`${BASE_URL}/temas-foro/store`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(temaData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al crear el tema");
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteTema = async (token, id) => {
    try {
        const response = await fetch(`${BASE_URL}/temas-foro/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al eliminar el tema");
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateTema = async (token, temaData) => {
    try {
        const response = await fetch(`${BASE_URL}/temas-foro/edit`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(temaData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al actualizar el tema");
        return data;
    } catch (error) {
        throw error;
    }
};

export const postComentario = async (token, comentarioData) => {
    try {
        const response = await fetch(`${BASE_URL}/comentarios`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(comentarioData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al crear el comentario");
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateComentario = async (token, comentarioData) => {
    try {
        const response = await fetch(`${BASE_URL}/comentarios`, {
            method: "PUT", // Método solicitado por tu endpoint
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(comentarioData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al actualizar el comentario");
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteComentario = async (token, id) => {
    try {
        const response = await fetch(`${BASE_URL}/comentarios/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al eliminar el comentario");
        return data;
    } catch (error) {
        throw error;
    }
};

export const getUsers = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/showUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al obtener usuarios');
        return data.users; // Retornamos el array de usuarios
    } catch (error) {
        throw error;
    }
};

// Obtener lista de roles para el select
export const getRoles = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/roles/index`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al obtener roles');
        return data.roles;
    } catch (error) {
        throw error;
    }
};

// Registrar nuevo usuario
export const registerUser = async (token, userData) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (!response.ok) {
            // Manejo específico para errores de validación de Laravel
            if (data.errors) {
                const firstError = Object.values(data.errors)[0][0];
                throw new Error(firstError);
            }
            throw new Error(data.message || 'Error al registrar usuario');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateUserDataBasic = async (token, userData) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/change-data-basic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData) // Mandamos el objeto tal cual
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error al actualizar');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const showError = (mensaje) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje || 'Ha ocurrido un error inesperado',
        confirmButtonColor: '#d33',
    });
};

export const showSuccess = (mensaje) => {
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: mensaje,
        timer: 2000,
        showConfirmButton: false
    });
};

export const toggleUserStatus = async (token, userId) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/disable-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ user_id: userId })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al procesar la solicitud');
        }

        return data;
    } catch (error) {
        throw error;
    }
};