document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (!token || !userData) {
    alert("Sesión no encontrada. Redirigiendo...");
    window.location.href = "/index.html";
    return;
  }

  const user = JSON.parse(userData);
  document.getElementById("user-welcome").textContent = `Hola, ${user.name}`;
  document.getElementById("user-name").textContent = user.name;

  // Cargar usuarios desde la API
  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/showUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al cargar los usuarios");
    }

    const data = await response.json();
    renderUsers(data.users);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("users-table-body").innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-danger">Error al cargar usuarios: ${error.message}</td>
      </tr>
    `;
  }

  // Renderizar tabla y activar DataTables + listeners
  function renderUsers(users) {
    const tbody = document.getElementById("users-table-body");
    tbody.innerHTML = users
      .map(
        (user) => `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${
            user.rol_id === 1
              ? "Administrador"
              : user.rol_id === 2
              ? "Supervisor"
              : "Operador"
          }</td>
          <td>${user.unidad_operativa || "—"}</td>
          <td>
            <span class="badge ${user.activo ? "bg-success" : "bg-danger"}">
              ${user.activo ? "Activo" : "Inactivo"}
            </span>
          </td>
          <td>
            ${
              user.activo
                ? `
                <button class="btn btn-sm btn-outline-info btn-editar" data-user-id="${
                  user.id
                }" data-user='${JSON.stringify(user).replace(/'/g, "&#39;")}'>
                    Editar
                </button>
                <button class="btn btn-sm btn-outline-danger btn-inhabilitar" data-user-id="${
                  user.id
                }">
                  Inhabilitar
                </button>`
                : ""
            }
          </td>
        </tr>
      `
      )
      .join("");

    // Inicializar DataTables
    new DataTable("#tabla", {
      paging: false,
      scrollCollapse: true,
      scrollY: "250px",
      autoWidth: false,
      responsive: true,
      columnDefs: [
        { width: "60px", targets: 0 },
        { width: "200px", targets: 1 },
        { width: "220px", targets: 2 },
        { width: "120px", targets: 3 },
        { width: "180px", targets: 4 },
        { width: "100px", targets: 5 },
        { width: "180px", targets: 6 },
      ],
    });

    // Listener para inhabilitar
    document.querySelectorAll(".btn-inhabilitar").forEach((button) => {
      button.addEventListener("click", async function () {
        const userId = this.getAttribute("data-user-id");
        if (!confirm(`¿Deshabilitar al usuario ID ${userId}?`)) return;

        try {
          const response = await fetch(
            "http://127.0.0.1:8000/api/auth/disable-user",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ user_id: userId }),
            }
          );

          const result = await response.json();

          if (response.ok) {
            alert("Usuario inhabilitado correctamente.");
            location.reload();
          } else {
            alert(
              "Error: " +
                (result.message || "No se pudo inhabilitar al usuario.")
            );
          }
        } catch (error) {
          console.error("Error al inhabilitar:", error);
          alert("Error de red al intentar inhabilitar al usuario.");
        }
      });
    });

    // Listener para editar
    document.querySelectorAll(".btn-editar").forEach((button) => {
      button.addEventListener("click", function () {
        const userId = this.getAttribute("data-user-id");
        const user = JSON.parse(
          this.getAttribute("data-user").replace(/&#39;/g, "'")
        );

        // Rellenar el formulario del modal
        document.getElementById("edit_user_id").value = user.id;
        document.getElementById("edit_name").value = user.name;
        document.getElementById("edit_rol_id").value = user.rol_id;
        document.getElementById("edit_unidad_operativa").value =
          user.unidad_operativa;

        // Mostrar modal
        const editModal = new bootstrap.Modal(
          document.getElementById("editUserModal")
        );
        editModal.show();
      });
    });
  }

  // Listener para el botón "Guardar" del modal (solo si existe)
  const saveBtn = document.getElementById("saveUserBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", async function () {
      const form = document.getElementById("addUserForm");
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      const password = document.getElementById("password").value;
      const passwordConfirm = document.getElementById(
        "password_confirmation"
      ).value;

      if (password !== passwordConfirm) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: password,
        password_confirmation: passwordConfirm,
        rol_id: parseInt(document.getElementById("rol_id").value),
        unidad_operativa: document.getElementById("unidad_operativa").value,
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/auth/register",
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
          alert("Usuario creado exitosamente.");
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("addUserModal")
          );
          if (modal) modal.hide();
          location.reload();
        } else {
          let msg = result.message || "Error al crear el usuario.";
          if (result.errors) {
            const firstError = Object.values(result.errors)[0];
            if (firstError) msg = firstError[0];
          }
          alert(msg);
        }
      } catch (error) {
        console.error("Error al registrar:", error);
        alert("Error de red al crear el usuario.");
      }
    });
  }

  // Limpiar formulario al cerrar modal
  const modalEl = document.getElementById("addUserModal");
  if (modalEl) {
    modalEl.addEventListener("hidden.bs.modal", function () {
      const form = document.getElementById("addUserForm");
      if (form) {
        form.reset();
        form.classList.remove("was-validated");
      }
    });
  }

  // Manejar actualización de usuario
  const updateBtn = document.getElementById("updateUserBtn");
  if (updateBtn) {
    updateBtn.addEventListener("click", async function () {
      const userId = document.getElementById("edit_user_id").value;
      const name = document.getElementById("edit_name").value;
      const rolId = parseInt(document.getElementById("edit_rol_id").value);
      const unidad = document.getElementById("edit_unidad_operativa").value;

      const updateData = {
        user_id: userId,
        name: name,
        rol_id: rolId,
        unidad_operativa: unidad,
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/auth/change-data-basic",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
          }
        );

        const result = await response.json();

        if (response.ok) {
          alert("Usuario actualizado exitosamente.");
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("editUserModal")
          );
          if (modal) modal.hide();
          location.reload();
        } else {
          let msg = result.message || "Error al actualizar el usuario.";
          if (result.errors) {
            const firstError = Object.values(result.errors)[0];
            if (firstError) msg = firstError[0];
          }
          alert(msg);
        }
      } catch (error) {
        console.error("Error al actualizar:", error);
        alert("Error de red al intentar actualizar el usuario.");
      }
    });
  }
});
