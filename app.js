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

// ====================================================================
// 1. CONFIGURACIÓN DEL USUARIO Y CONTROL DE ACCESO
// ====================================================================
let carrito = [];
let usuarioLogueado = false; // Empieza en false hasta que se registre o inicie sesión
let nombreDeLaCuenta = "";   // Empezará vacío y se llenará al registrarse

// Función para verificar si tiene acceso a la tienda
function verificarAcceso() {
    const seccionVentas = document.getElementById('seccion-ventas');
    if (!seccionVentas) return; // Evita errores si no existe el elemento aún

    if (!usuarioLogueado) {
        seccionVentas.classList.add('ocultar-tienda');
        console.log("Acceso restringido: Inicia sesión para comprar.");
    } else {
        seccionVentas.classList.remove('ocultar-tienda');
        console.log("Acceso concedido a: " + nombreDeLaCuenta);
    }
}

// Llamada inicial
verificarAcceso();

// ====================================================================
// 2. NUEVA FUNCIÓN DE REGISTRO
// ====================================================================
window.register = function() {
    // 1. Capturamos el input del nombre
    const inputNombre = document.getElementById('nombreRegister');
    const inputEmail = document.getElementById('emailRegister');
    const inputPassword = document.getElementById('passwordRegister');
    const inputPasswordConfirm = document.getElementById('passwordConfirm');

    // Validación básica de campos vacíos
    if (!inputNombre.value || !inputEmail.value || !inputPassword.value || !inputPasswordConfirm.value) {
        alert("Por favor, llena todos los campos obligatorios.");
        return;
    }

    // Validación de contraseñas iguales
    if (inputPassword.value !== inputPasswordConfirm.value) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // 2. Guardamos el nombre en nuestra variable global
    nombreDeLaCuenta = inputNombre.value;
    
    // 3. Activamos la sesión
    usuarioLogueado = true;

    // 4. Actualizamos la tienda para que ya se pueda ver y comprar
    verificarAcceso();

    // 5. Mensaje de bienvenida y cerramos el formulario de registro
    alert(`¡Cuenta creada con éxito! Bienvenido(a), ${nombreDeLaCuenta}`);
    cerrarForm();
};

// 3. FUNCIONES DEL CARRITO
window.agregarAlCarrito = function(nombre, precio) {
    if (!usuarioLogueado) {
        alert("Error: Debes iniciar sesión primero.");
        return;
    }
    carrito.push({ nombre, precio });
    document.getElementById('cantidad-carrito').innerText = carrito.length;
};

window.verCarrito = function() {
    if (!usuarioLogueado) return;

    const modal = document.getElementById('modal-carrito');
    const lista = document.getElementById('lista-items');
    const displayUsuario = document.getElementById('nombre-usuario-display');
    const displayTotal = document.getElementById('precio-total');

    displayUsuario.innerText = nombreDeLaCuenta;
    lista.innerHTML = ""; // Limpiamos lista previa
    let total = 0;

    carrito.forEach(item => {
        lista.innerHTML += `
            <div class="item-lista">
                <span>${item.nombre}</span>
                <span>$${item.precio}</span>
            </div>`;
        total += item.precio;
    });

    displayTotal.innerText = total;
    modal.style.display = "block";
};

window.cerrarCarrito = function() {
    document.getElementById('modal-carrito').style.display = "none";
};

window.procesarPago = function() {
    const metodo = document.getElementById('metodo-pago').value;
    alert(`Gracias ${nombreDeLaCuenta}. Pagaste con ${metodo}. ¡Tu pedido va en camino!`);
    carrito = []; // Vaciamos carrito
    document.getElementById('cantidad-carrito').innerText = "0";
    cerrarCarrito();
};