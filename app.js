/**
 * Lógica de Autenticación para TechMarket
 * Maneja la navegación de formularios, validaciones de registro y login.
 */

// --- FUNCIONES DE NAVEGACIÓN (UI) ---

// Muestra el contenedor principal y activa el formulario de Login
window.mostrarLogin = function() {
    const container = document.getElementById("authContainer");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const mensaje = document.getElementById("mensaje");

    container.style.display = "flex";
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    mensaje.innerText = ""; // Limpia mensajes previos
}

// Muestra el contenedor principal y activa el formulario de Registro
window.mostrarRegistro = function() {
    const container = document.getElementById("authContainer");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const mensaje = document.getElementById("mensaje");

    container.style.display = "flex";
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
    mensaje.innerText = "";
}

// Cierra el modal de autenticación
window.cerrarForm = function() {
    document.getElementById("authContainer").style.display = "none";
}

// Cambia la vista interna de Login a Registro
window.irARegistro = function() {
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("registerForm").classList.add("active");
    document.getElementById("mensaje").innerText = "";
}

// Cambia la vista interna de Registro a Login
window.irALogin = function() {
    document.getElementById("registerForm").classList.remove("active");
    document.getElementById("loginForm").classList.add("active");
    document.getElementById("mensaje").innerText = "";
}

// --- LÓGICA DE NEGOCIO (DATOS) ---

// Procesa el registro de nuevos usuarios (Estándar de validación)
window.register = function() {
    const nombre = document.getElementById("nombreRegister").value.trim();
    const email = document.getElementById("emailRegister").value.trim();
    const tel = document.getElementById("telRegister").value.trim();
    const pass = document.getElementById("passwordRegister").value;
    const passConfirm = document.getElementById("passwordConfirm").value;
    const mensaje = document.getElementById("mensaje");

    // Validar campos vacíos
    if (nombre === "" || email === "" || pass === "" || passConfirm === "") {
        mensaje.innerText = "Error: Todos los campos obligatorios deben llenarse.";
        mensaje.style.color = "#d93025";
        return;
    }

    // Validar longitud de contraseña (Estilo Amazon: mín 6 caracteres)
    if (pass.length < 6) {
        mensaje.innerText = "La contraseña es demasiado corta (mínimo 6 caracteres).";
        mensaje.style.color = "#d93025";
        return;
    }

    // Validar que las contraseñas coincidan
    if (pass !== passConfirm) {
        mensaje.innerText = "Las contraseñas no coinciden. Inténtalo de nuevo.";
        mensaje.style.color = "#d93025";
        return;
    }

    // Simulación de guardado exitoso
    console.log("Datos enviados al servidor:", { nombre, email, tel, pass });
    
    mensaje.innerText = "¡Cuenta creada con éxito! Redirigiendo...";
    mensaje.style.color = "#28a745";

    // Limpiar campos y cerrar después de un delay
    setTimeout(() => {
        irALogin();
        mensaje.innerText = "";
    }, 2000);
}

// Procesa el inicio de sesión
window.login = function() {
    const email = document.getElementById("emailLogin").value.trim();
    const pass = document.getElementById("passwordLogin").value;
    const mensaje = document.getElementById("mensaje");

    if (email === "" || pass === "") {
        mensaje.innerText = "Por favor, ingresa tu correo y contraseña.";
        mensaje.style.color = "#d93025";
        return;
    }

    // Aquí iría la validación contra base de datos (Firebase/SQL)
    console.log("Intentando iniciar sesión con:", email);
    
    mensaje.innerText = "Iniciando sesión...";
    mensaje.style.color = "#007185";

    setTimeout(() => {
        cerrarForm();
        alert("Bienvenido a TechMarket");
        mensaje.innerText = "";
    }, 1500);
}