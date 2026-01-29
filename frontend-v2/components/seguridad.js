const { useState, useEffect, useRef } = React;

// --- COMPONENTE TABLA MODIFICADO ---
const UserTable = ({ users, onEdit, onDelete }) => {
    const tableRef = useRef();

    useEffect(() => {
        const table = $(tableRef.current).DataTable({
            destroy: true,
            data: users,
            autoWidth: false,
            pageLength: 5,
            lengthChange: false,
            columns: [
                { data: 'id', title: 'ID' },
                { data: 'name', title: 'Nombre' },
                { data: 'email', title: 'Correo' },
                {
                    data: 'rol_id',
                    title: 'Rol',
                    render: (data) => {
                        const roles = { 1: 'Administrador', 2: 'Supervisor', 3: 'Operador' };
                        return roles[data] || 'N/A';
                    }
                },
                { data: 'unidad_operativa', title: 'Unidad' },
                {
                    data: 'activo',
                    title: 'Estado',
                    render: function (data) {
                        const esActivo = (data === true || String(data).toLowerCase() === 't' || String(data) === '1' || String(data).toLowerCase() === 'true');
                        return esActivo
                            ? '<b class="bg-editar">Activo</b>'
                            : '<b class="bg-inhabilitar">Inactivo</b>';
                    }
                },
                {
                    data: null,
                    title: 'Acciones',
                    render: (data) => {
                        // Verificamos si el usuario está activo
                        const esActivo = (data.activo === true || String(data.activo).toLowerCase() === 't' || String(data.activo) === '1' || String(data.activo).toLowerCase() === 'true');

                        // Si NO está activo, devolvemos un mensaje o vacío en lugar de los botones
                        if (!esActivo) {
                            return '';
                        }

                        // Si está activo, mostramos los botones normalmente
                        return `
                            <button class="btn btn-sm edit-btn" data-id="${data.id}">Editar</button>
                            <button class="btn btn-sm inhabilitar-btn" data-id="${data.id}">Inhabilitar</button>
                        `;
                    }
                }
            ],
            language: { url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' }
        });

        // Delegación de eventos (solo funcionarán si los botones existen)
        $(tableRef.current).off('click').on('click', '.edit-btn', function () {
            const id = $(this).data('id');
            const user = users.find(u => u.id == id);
            if (user) onEdit(user);
        });

        $(tableRef.current).on('click', '.delete-btn', function () {
            const id = $(this).data('id');
            const user = users.find(u => u.id == id);
            if (user) onDelete(user);
        });

        return () => table.destroy();
    }, [users]);

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover" ref={tableRef} style={{ width: '100%' }}></table>
        </div>
    );
};

// --- APLICACIÓN PRINCIPAL ---
const SeguridadApp = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState({
        name: '', email: '', rol_id: 3, unidad_operativa: '', password: '', password_confirmation: ''
    });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!token || !storedUser) {
            window.location.href = "/index.html";
        } else {
            setCurrentUser(JSON.parse(storedUser));
            fetchUsers();
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/showUsers", {
                headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
            });
            const data = await response.json();
            setUsers(data.users || []);
        } catch (error) { console.error("Error al obtener usuarios"); }
    };

    const closeAndCleanup = () => {
        const modalElement = document.getElementById('userModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();

        setTimeout(() => {
            document.body.classList.remove('modal-open');
            document.body.style = "";
            document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        }, 150);
    };

    const handleSaveUser = async (e) => {
        e.preventDefault();
        const isEdit = !!selectedUser.id;

        const url = isEdit ? "http://127.0.0.1:8000/api/auth/change-data-basic" : "http://127.0.0.1:8000/api/auth/register";
        const body = isEdit ? {
            user_id: selectedUser.id,
            name: selectedUser.name,
            rol_id: selectedUser.rol_id,
            unidad_operativa: selectedUser.unidad_operativa
        } : selectedUser;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                alert(isEdit ? "Usuario actualizado" : "Usuario registrado");
                closeAndCleanup();
                fetchUsers();
            }
        } catch (error) { alert("Error de conexión"); }
    };

    const toggleStatus = async (user) => {
        // Determinamos la acción basada en el campo 'activo' que manda tu API
        const accion = user.activo ? "inhabilitar" : "habilitar";
        if (!confirm(`¿Estás seguro de que deseas ${accion} a ${user.name}?`)) return;

        try {
            // URL exacta que confirmaste que funciona en tu HTML/Postman
            const response = await fetch("http://127.0.0.1:8000/api/auth/disable-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                },
                body: JSON.stringify({ user_id: user.id })
            });

            if (response.ok) {
                // Refrescamos la lista para que React redibuje la tabla con el nuevo estado
                await fetchUsers();
                alert(`Usuario ${user.name} actualizado con éxito.`);
            } else {
                const errorData = await response.json();
                alert("Error: " + (errorData.message || "No se pudo cambiar el estado"));
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Error de conexión con el servidor");
        }
    };

    if (!currentUser) return null;

    return (
        <div>
            <header>
                <div className="head">
                    <img className="logo1" src="./../assets/image/cintillo Mincyt.png" alt="Cintillo" />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ color: 'white', fontWeight: '600' }}>Hola, {currentUser.name}</span>
                        <a href="./dashboard.html" className="btn btn-sm button1">← Volver al Dashboard</a>
                    </div>
                </div>
                <nav className="navbar">
                    <h3>Gestión de Usuarios</h3>
                </nav>
            </header>

            <main className="container mt-4">
                <UserTable users={users}
                    onEdit={(u) => {
                        setSelectedUser({ ...u, password: '', password_confirmation: '' });
                        new bootstrap.Modal(document.getElementById('userModal')).show();
                    }}
                    onDelete={toggleStatus}
                />

                <div className="text-end mt-4">
                    <button className="btn btn-primary" onClick={() => {
                        setSelectedUser({ name: '', email: '', rol_id: 3, unidad_operativa: '', password: '', password_confirmation: '' });
                        new bootstrap.Modal(document.getElementById('userModal')).show();
                    }}>+ Agregar Usuario</button>
                </div>
            </main>

            {/* MODAL */}
            <div className="modal fade" id="userModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{selectedUser.id ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={closeAndCleanup}></button>
                        </div>
                        <form onSubmit={handleSaveUser}>
                            <div className="modal-body">
                                <label className="form-label">Nombre Completo</label>
                                <input type="text" className="form-control mb-3" required value={selectedUser.name} onChange={e => setSelectedUser({ ...selectedUser, name: e.target.value })} />
                                {!selectedUser.id && (
                                    <>
                                        <label className="form-label">Correo</label>
                                        <input type="email" className="form-control mb-3" required value={selectedUser.email} onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })} />
                                        <label className="form-label">Contraseña</label>
                                        <input type="password" class="form-control mb-3" required value={selectedUser.password} onChange={e => setSelectedUser({ ...selectedUser, password: e.target.value })} />
                                        <label className="form-label">Confirmar Contraseña</label>
                                        <input type="password" class="form-control mb-3" required value={selectedUser.password_confirmation} onChange={e => setSelectedUser({ ...selectedUser, password_confirmation: e.target.value })} />
                                    </>
                                )}
                                <label className="form-label">Rol</label>
                                <select className="form-select mb-3" value={selectedUser.rol_id} onChange={e => setSelectedUser({ ...selectedUser, rol_id: parseInt(e.target.value) })}>
                                    <option value="1">Administrador</option>
                                    <option value="2">Supervisor</option>
                                    <option value="3">Operador</option>
                                </select>
                                <label className="form-label">Unidad Operativa</label>
                                <input type="text" className="form-control" required value={selectedUser.unidad_operativa} onChange={e => setSelectedUser({ ...selectedUser, unidad_operativa: e.target.value })} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeAndCleanup}>Cancelar</button>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SeguridadApp />);