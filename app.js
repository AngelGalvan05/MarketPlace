// ====================================================================
// VISTAS DE LOS FORMULARIOS (Abrir y cerrar ventanas)
// ====================================================================

window.mostrarLogin = function() {
    document.getElementById("authContainer").style.display = "flex";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("mensaje").innerText = "";
}

window.mostrarRegistro = function() {
    document.getElementById("authContainer").style.display = "flex";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("mensaje").innerText = "";
}

window.cerrarForm = function() {
    document.getElementById("authContainer").style.display = "none";
}

window.irARegistro = function() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("mensaje").innerText = "";
}

window.irALogin = function() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("mensaje").innerText = "";
}
