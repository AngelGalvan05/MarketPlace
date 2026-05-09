/**
 * Lógica de UI para TechMarket
 * Maneja la navegación de formularios y el carrusel.
 */

// ==================== LÓGICA DE MODALES (LOGIN/REGISTRO) ====================

window.mostrarLogin = function() {
    const container = document.getElementById("authContainer");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const mensaje = document.getElementById("mensaje");

    document.getElementById('detallesContainer').style.display = 'none';
    container.style.display = "flex";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    mensaje.innerText = ""; 
}

window.mostrarRegistro = function() {
    const container = document.getElementById("authContainer");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const mensaje = document.getElementById("mensaje");

    document.getElementById('detallesContainer').style.display = 'none';
    container.style.display = "flex";
    registerForm.style.display = "block";
    loginForm.style.display = "none";
    mensaje.innerText = "";
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

// ==================== LÓGICA DEL CARRUSEL AUTOMÁTICO ====================
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function moveSlider() {
    // Si no hay slides, no hace nada (evita errores)
    if (slides.length === 0) return; 

    currentIndex++;

    // Si llega al final, regresa a la primera imagen (0)
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    // Desplaza horizontalmente el contenedor
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
}

// Cambia de imagen automáticamente cada 4 segundos
setInterval(moveSlider, 4000);