// ====================================================================
// 1. CONFIGURACIÓN DEL USUARIO Y CONTROL DE ACCESO
// ====================================================================
let carrito = [];
let usuarioLogueado = true; // Empieza en false (bloqueado) hasta registrarse
let nombreDeLaCuenta = "";   // Se llenará al crear la cuenta

// Función para verificar si tiene acceso a la tienda
function verificarAcceso() {
    const seccionVentas = document.getElementById('seccion-ventas');
    if (!seccionVentas) return; // Evita errores si aún no se renderiza la sección

    if (!usuarioLogueado) {
        seccionVentas.classList.add('ocultar-tienda');
        console.log("Acceso restringido: Inicia sesión para comprar.");
    } else {
        seccionVentas.classList.remove('ocultar-tienda');
        console.log("Acceso concedido a: " + nombreDeLaCuenta);
    }
}

// Llamada inicial para bloquear la tienda al entrar a la página
verificarAcceso();


// ====================================================================
// 2. VISTAS DEL FORMULARIO DE ACCESO (Tus funciones originales)
// ====================================================================
window.mostrarLogin = function() {
    const container = document.getElementById("authContainer");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const mensaje = document.getElementById("mensaje");

    container.style.display = "flex";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    if (mensaje) mensaje.innerText = ""; 
}

window.mostrarRegistro = function() {
    const container = document.getElementById("authContainer");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const mensaje = document.getElementById("mensaje");

    container.style.display = "flex";
    registerForm.style.display = "block";
    loginForm.style.display = "none";
    if (mensaje) mensaje.innerText = "";
}

window.cerrarForm = function() {
    document.getElementById("authContainer").style.display = "none";
}

window.irARegistro = function() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    const mensaje = document.getElementById("mensaje");
    if (mensaje) mensaje.innerText = "";
}

window.irALogin = function() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    const mensaje = document.getElementById("mensaje");
    if (mensaje) mensaje.innerText = "";
}


// ====================================================================
// 3. LOGICA DE REGISTRO (¡Esta es la que hace la magia!)
// ====================================================================
window.register = function() {
    const inputNombre = document.getElementById('nombreRegister');
    const inputEmail = document.getElementById('emailRegister');
    const inputPassword = document.getElementById('passwordRegister');
    const inputPasswordConfirm = document.getElementById('passwordConfirm');

    // Validación: que no haya campos obligatorios vacíos
    if (!inputNombre.value || !inputEmail.value || !inputPassword.value || !inputPasswordConfirm.value) {
        alert("Por favor, llena todos los campos obligatorios.");
        return;
    }

    // Validación: que las contraseñas coincidan
    if (inputPassword.value !== inputPasswordConfirm.value) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Guardamos el nombre ingresado en el HTML
    nombreDeLaCuenta = inputNombre.value;
    
    // Iniciamos la sesión del usuario
    usuarioLogueado = true;

    // Actualizamos el acceso para mostrar la tienda de inmediato
    verificarAcceso();

    // Notificación y cerramos la ventana de registro
    alert(`¡Cuenta creada con éxito! Bienvenido(a), ${nombreDeLaCuenta}`);
    cerrarForm();
};


// ====================================================================
// 4. FUNCIONES DEL CARRITO
// ====================================================================
window.agregarAlCarrito = function(nombre, precio) {
    if (!usuarioLogueado) {
        alert("Error: Debes iniciar sesión primero.");
        return;
    }
    carrito.push({ nombre, precio });
    
    // Asegúrate de que tienes un elemento con id="cantidad-carrito" en tu HTML (como en tu header)
    const badge = document.getElementById('cantidad-carrito');
    if (badge) badge.innerText = carrito.length;
};

window.verCarrito = function() {
    if (!usuarioLogueado) return;

    const modal = document.getElementById('modal-carrito');
    const lista = document.getElementById('lista-items');
    const displayUsuario = document.getElementById('nombre-usuario-display');
    const displayTotal = document.getElementById('precio-total');

    if (displayUsuario) displayUsuario.innerText = nombreDeLaCuenta;
    if (lista) {
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

        if (displayTotal) displayTotal.innerText = total;
    }
    
    if (modal) modal.style.display = "block";
};

window.cerrarCarrito = function() {
    const modal = document.getElementById('modal-carrito');
    if (modal) modal.style.display = "none";
};

window.procesarPago = function() {
    const metodoHTML = document.getElementById('metodo-pago');
    const metodo = metodoHTML ? metodoHTML.value : "Visa";
    
    alert(`Gracias ${nombreDeLaCuenta}. Pagaste con ${metodo}. ¡Tu pedido va en camino!`);
    carrito = []; // Vaciamos carrito
    
    const badge = document.getElementById('cantidad-carrito');
    if (badge) badge.innerText = "0";
    
    cerrarCarrito();
};