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
};

// ====================================================================
// CARRUSEL
// ====================================================================
(function() {
    const slides = document.querySelectorAll('.slide');
    const total = slides.length;
    let actual = 0;

    // Duplicamos el primer slide al final para el efecto infinito
    const primerClone = slides[0].cloneNode(true);
    document.querySelector('.slider-container').appendChild(primerClone);

    const todasLasSlides = document.querySelectorAll('.slide');

    function moverCarrusel() {
        todasLasSlides.forEach(s => {
            s.style.transform = `translateX(-${actual * 100}%)`;
        });
    }

    function siguiente() {
        actual++;
        moverCarrusel();

        // Cuando llega al clon del primero, brincamos sin animación al real
        if (actual === total) {
            setTimeout(() => {
                todasLasSlides.forEach(s => s.style.transition = 'none');
                actual = 0;
                moverCarrusel();
                setTimeout(() => {
                    todasLasSlides.forEach(s => s.style.transition = 'transform 0.8s ease-in-out');
                }, 50);
            }, 800);
        }
    }

    setInterval(siguiente, 3000);
})();

