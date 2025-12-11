document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-login");
  const emailField = document.getElementById("usuario");
  const passField = document.getElementById("clave");
  const btn = document.getElementById("btn-login");

  btn.addEventListener("click", async function (e) {
    e.preventDefault();

    const email = emailField.value.trim();
    const password = passField.value.trim();

    if (!email || !password) {
      alert("Por favor completa correo y contraseña");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Ingresa un correo válido");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // ✅ Comillas agregadas
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      // 🔍 DEBUG - MIRA ESTO EN F12 > Console
      console.log("📡 STATUS:", response.status);
      console.log("📦 HEADERS:", response.headers.get("content-type"));
      console.log("📄 DATA COMPLETA:", data);
      console.log("🔑 TOKEN:", data.token);
      console.log("👤 USER:", data.user);

      if (
        (response.status === 200 || response.status === 201) &&
        (data.access_token || data.token)
      ) {
        localStorage.setItem("token", data.access_token || data.token);

        // ✅ Guardar TODOS los datos del usuario
        localStorage.setItem("token", data.access_token || data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // Guarda usuario completo

        // Opcional: guardar datos específicos
        if (data.user) {
          localStorage.setItem("userRole", data.user.rol || data.user.role);
          localStorage.setItem("userName", data.user.nombre || data.user.name);
        }

        window.location.href = "/dashboard.html";
      } else {
        alert(data.message || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión con la API");
    }
  });

  // Feedback visual mejorado
  emailField.addEventListener(
    "input",
    () => (emailField.style.border = "none")
  );
  passField.addEventListener("input", () => (passField.style.border = "none"));
});
