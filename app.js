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

// ====================================================================
// CARRUSEL
// ====================================================================
(function() {
    const slides = document.querySelectorAll('.slide');
    let actual = 0;

    function moverCarrusel() {
        slides.forEach(s => s.style.transform = `translateX(-${actual * 100}%)`);
    }

    function siguiente() {
        actual = (actual + 1) % slides.length;
        moverCarrusel();
    }

    // Cambia de slide cada 3 segundos
    setInterval(siguiente, 3000);
})();

