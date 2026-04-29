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
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    mensaje.innerText = ""; // Limpia mensajes previos
}

// Muestra el contenedor principal y activa el formulario de Registro
window.mostrarRegistro = function() {
    const container = document.getElementById("authContainer");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const mensaje = document.getElementById("mensaje");

    container.style.display = "flex";
    registerForm.style.display = "block";
    loginForm.style.display = "none";
    mensaje.innerText = "";
}

// Cierra el modal de autenticación
window.cerrarForm = function() {
    document.getElementById("authContainer").style.display = "none";
}

// Cambia la vista interna de Login a Registro
window.irARegistro = function() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("mensaje").innerText = "";
}

// Cambia la vista interna de Registro a Login
window.irALogin = function() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("mensaje").innerText = "";
}
