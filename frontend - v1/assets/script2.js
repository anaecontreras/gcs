document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (!token || !userData) {
    alert("Sesión no encontrada. Redirigiendo...");
    window.location.href = "/index.html";
    return;
  }

  const user = JSON.parse(userData);

  // document.getElementById("user-token").textContent = token;
  // document.getElementById("user-id").textContent = user.id || "N/A";

  document.getElementById("user-name").textContent = user.name || "N/A";
  console.log("rol_id: ", user.rol_id);

  let menuItems = [];

  if (user.rol_id === 1) {
    menuItems = [
      { text: "Blog", url: "/dashboard.html" },
      { text: "Documentos", url: "/dashboard.html" },
      { text: "Foro", url: "/dashboard.html" },
      { text: "Calendario", url: "dashboard.html" },
      {
        text: "CambiarClave",
        action: () => {
          const modal = new bootstrap.Modal(
            document.getElementById("changePasswordModal")
          );
          modal.show();
        },
      },
      { text: "Seguridad", url: "/seguridad.html" },
      {
        text: "Acerca",
        action: () => {
          const modal = new bootstrap.Modal(
            document.getElementById("exampleModal")
          );
          modal.show();
        },
      },
    ];
  } else {
    menuItems = [
      { text: "Blog", url: "/dashboard.html" },
      { text: "Documentos", url: "/dashboard.html" },
      { text: "Foro", url: "/dashboard.html" },
      { text: "Calendario", url: "/dashboard.html" },
      {
        text: "CambiarClave",
        action: () => {
          const modal = new bootstrap.Modal(
            document.getElementById("changePasswordModal")
          );
          modal.show();
        },
      },
      {
        text: "Acerca",
        action: () => {
          const modal = new bootstrap.Modal(
            document.getElementById("exampleModal")
          );
          modal.show();
        },
      },
    ];
  }

  const menuList = document.getElementById("navbar-menu");

  menuItems.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    if (item.url) {
      a.href = item.url;
      a.textContent = item.text;
    } else if (item.action) {
      a.href = "#"; // o "javascript:void(0)"
      a.textContent = item.text;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        item.action();
      });
    }

    li.appendChild(a);
    menuList.appendChild(li);
  });

  // LOGOUT CON API
  document
    .getElementById("btn-logout")
    .addEventListener("click", async function () {
      if (confirm("¿Cerrar sesión?")) {
        try {
          // Llamada a tu API logout
          const response = await fetch(
            "http://127.0.0.1:8000/api/auth/logout",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // ← Bearer token
              },
            }
          );

          const data = await response.json();
          console.log("🚪 Logout API:", data);

          if (response.ok) {
          } else {
            console.warn("Logout API falló pero continuando...:", data.message);
          }
        } catch (error) {
          console.error("Error logout API:", error);
        } finally {
          // Siempre limpia localStorage
          localStorage.clear();
          window.location.href = "/index.html";
        }
      }
    });

  // Manejar cambio de contraseña
  const savePasswordBtn = document.getElementById("savePasswordBtn");
  if (savePasswordBtn) {
    savePasswordBtn.addEventListener("click", async function () {
      const current = document.getElementById("current_password").value;
      const newPassword = document.getElementById("new_password").value;
      const confirm = document.getElementById(
        "new_password_confirmation"
      ).value;

      if (!current || !newPassword || !confirm) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      if (newPassword !== confirm) {
        alert("Las nuevas contraseñas no coinciden.");
        return;
      }

      const formData = {
        current_password: current,
        new_password: newPassword,
        new_password_confirmation: confirm,
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/auth/change-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        const result = await response.json();

        if (response.ok) {
          // Si la API devuelve un nuevo token, actualízalo
          if (result.access_token) {
            localStorage.setItem("token", result.access_token);
          }
          alert("Contraseña actualizada exitosamente.");
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("changePasswordModal")
          );
          if (modal) modal.hide();
        } else {
          alert(
            "Error: " + (result.message || "No se pudo cambiar la contraseña.")
          );
        }
      } catch (error) {
        console.error("Error al cambiar contraseña:", error);
        alert("Error de red al intentar cambiar la contraseña.");
      }
    });
  }

  // Limpiar formulario al cerrar modal
  document
    .getElementById("changePasswordModal")
    ?.addEventListener("hidden.bs.modal", function () {
      document.getElementById("changePasswordForm")?.reset();
    });
});
