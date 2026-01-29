const { useState, useEffect } = React;

// --- COMPONENTES MENORES ---

const Header = ({ userName, onLogout }) => (
    <header>
        <div className="head">
            <img className="logo1" src="./../assets/image/cintillo Mincyt.png" alt="Cintillo institucional" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'white', fontWeight: '600' }}>Hola, {userName}</span>
                <button onClick={onLogout} className="button1" style={{ padding: '0.3rem 1rem', fontSize: '0.9rem' }}>Salir</button>
            </div>
        </div>
    </header>
);

const Footer = () => (
    <footer>
        <p>&copy; 2025 Ana Contreras / Diana Sierra / Darwin Colmenares. Todos los derechos reservados.</p>
    </footer>
);

// --- COMPONENTE PRINCIPAL ---

const DashboardApp = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');

    // Estado para el formulario de cambio de clave
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!storedToken || !storedUser) {
            window.location.href = "/index.html";
        } else {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/index.html";
    };

    const openModal = (id) => {
        const modalElement = document.getElementById(id);
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.new_password !== passwordData.new_password_confirmation) {
            alert("Las contraseñas nuevas no coinciden");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(passwordData)
            });

            const result = await response.json();
            if (response.ok) {
                alert("Contraseña actualizada con éxito");
                setPasswordData({ current_password: '', new_password: '', new_password_confirmation: '' });
                bootstrap.Modal.getInstance(document.getElementById('changePasswordModal')).hide();
            } else {
                alert(result.message || "Error al cambiar contraseña");
            }
        } catch (error) {
            alert("Error de conexión");
        }
    };

    if (!user) return null;

    // Lógica del Menú por Rol
    const renderMenu = () => {
        const items = [
            { text: "Blog", url: "/pages/dashboard.html", roles: [1, 2, 3] },
            { text: "Documentos", url: "/pages/dashboard.html", roles: [1, 2, 3] },
            { text: "Foro", url: "/pages/dashboard.html", roles: [1, 2, 3] },
            { text: "Calendario", url: "/pages/dashboard.html", roles: [1, 2, 3] },
            { text: "Cambiar Clave", action: () => openModal('changePasswordModal'), roles: [1, 2, 3] },
            { text: "Seguridad", url: "/pages/seguridad.html", roles: [1] }, // Solo Admin
            { text: "Acerca", action: () => openModal('aboutModal'), roles: [1, 2, 3] },
        ];

        return items
            .filter(item => item.roles.includes(user.rol_id))
            .map((item, index) => (
                <li key={index}>
                    {item.url ? (
                        <a href={item.url}>{item.text}</a>
                    ) : (
                        <a href="#" onClick={(e) => { e.preventDefault(); item.action(); }}>{item.text}</a>
                    )}
                </li>
            ));
    };

    return (
        <div className="dashboard-container">
            <Header userName={user.name} onLogout={handleLogout} />

            <nav className="navbar">
                <ul className="navbar-menu">
                    {renderMenu()}
                </ul>
                <h3>Usuario: <span>{user.name}</span></h3>
            </nav>

            <main style={{ padding: '2rem', textAlign: 'center' }}>
                <img className="portada" src="./../assets/image/portada.png" alt="Portada" />
            </main>

            <Footer />

            {/* MODAL: CAMBIAR CONTRASEÑA */}
            <div className="modal fade" id="changePasswordModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cambiar Contraseña</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleChangePassword}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Contraseña actual</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        required
                                        value={passwordData.current_password}
                                        onChange={e => setPasswordData({ ...passwordData, current_password: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nueva contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        required
                                        minLength="8"
                                        value={passwordData.new_password}
                                        onChange={e => setPasswordData({ ...passwordData, new_password: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirmar nueva contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        required
                                        value={passwordData.new_password_confirmation}
                                        onChange={e => setPasswordData({ ...passwordData, new_password_confirmation: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* MODAL: ACERCA DE */}
            <div className="modal fade" id="aboutModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Acerca del Sistema</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body text-center">
                            <h6>Plataforma WEB Centralizada para la Gestión de Contingencias Satelitales</h6>
                            <br />
                            <h6>CANTV / GGPM / Gerencia Programa Plataforma Satelital</h6>
                            <p>Versión 1.0</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DashboardApp />);