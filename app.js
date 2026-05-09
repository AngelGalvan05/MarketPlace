// ====================================================================
// 1. CONFIGURACIÓN DEL USUARIO Y CONTROL DE ACCESO (LOCAL)
// ====================================================================
let carrito = [];
let usuarioLogueado = false; // Empieza oculto hasta que simules el registro
let nombreDeLaCuenta = "";   

function verificarAcceso() {
    const seccionVentas = document.getElementById('seccion-ventas');
    if (!seccionVentas) return;

    if (!usuarioLogueado) {
        seccionVentas.classList.add('ocultar-tienda');
        console.log("Acceso restringido: Registrate para comprar.");
    } else {
        seccionVentas.classList.remove('ocultar-tienda');
        console.log("Acceso concedido a: " + nombreDeLaCuenta);
    }
}

// Bloqueamos la tienda al cargar la página
verificarAcceso();

// ====================================================================
// 2. VISTAS DE LOS FORMULARIOS (Abrir y cerrar ventanas)
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
// 3. REGISTRO LOCAL (Guarda el nombre directo del formulario)
// ====================================================================
window.register = function() {
    const nombre = document.getElementById("nombreRegister").value.trim();
    const email = document.getElementById("emailRegister").value.trim();
    const pass = document.getElementById("passwordRegister").value;
    const passConfirm = document.getElementById("passwordConfirm").value;
    const mensaje = document.getElementById("mensaje");

    if (nombre === "" || email === "" || pass === "" || passConfirm === "") {
        mensaje.innerText = "Error: Llena todos los campos obligatorios.";
        mensaje.style.color = "#d93025";
        return;
    }
    if (pass !== passConfirm) {
        mensaje.innerText = "Las contraseñas no coinciden.";
        mensaje.style.color = "#d93025";
        return;
    }

    // Guardamos el nombre en el sistema local
    nombreDeLaCuenta = nombre;
    usuarioLogueado = true;

    // Actualizamos el menú de la cabecera (Header) con tu nombre
    document.getElementById('ui-invitado').style.display = 'none';
    const uiUsuario = document.getElementById('ui-usuario');
    uiUsuario.style.display = 'flex';
    uiUsuario.innerHTML = `
        <span style="font-weight: bold; color: #2d3277;">Hola, ${nombreDeLaCuenta}</span>
        <button class="btn-auth" onclick="cerrarSesion()">Cerrar sesión</button>
    `;

    // Desbloquear la tienda de inmediato
    verificarAcceso();

    alert(`¡Bienvenido(a) a TechMarket, ${nombreDeLaCuenta}!`);
    cerrarForm();
};

// Función para cerrar sesión de manera local
window.cerrarSesion = function() {
    usuarioLogueado = false;
    nombreDeLaCuenta = "";
    carrito = [];
    document.getElementById('cantidad-carrito').innerText = "0";
    
    // Restauramos los botones del Header
    document.getElementById('ui-invitado').style.display = 'flex';
    document.getElementById('ui-usuario').style.display = 'none';
    
    verificarAcceso();
    alert("Has cerrado sesión.");
};

// Iniciar sesión simulado
window.login = function() {
    const email = document.getElementById("emailLogin").value.trim();
    const pass = document.getElementById("passwordLogin").value;

    if (email === "" || pass === "") {
        alert("Por favor rellena los datos.");
        return;
    }

    // Como es de prueba, dejamos que entre con cualquier dato
    nombreDeLaCuenta = "Usuario de Prueba";
    usuarioLogueado = true;

    document.getElementById('ui-invitado').style.display = 'none';
    const uiUsuario = document.getElementById('ui-usuario');
    uiUsuario.style.display = 'flex';
    uiUsuario.innerHTML = `
        <span style="font-weight: bold; color: #2d3277;">Hola, ${nombreDeLaCuenta}</span>
        <button class="btn-auth" onclick="cerrarSesion()">Cerrar sesión</button>
    `;

    verificarAcceso();
    cerrarForm();
};

// ====================================================================
// 4. FUNCIONES DEL CARRITO
// ====================================================================
window.agregarAlCarrito = function(nombre, precio) {
    if (!usuarioLogueado) {
        alert("Error: Debes iniciar sesión o registrarte primero.");
        return;
    }
    carrito.push({ nombre, precio });
    document.getElementById('cantidad-carrito').innerText = carrito.length;
    alert(`"${nombre}" se agregó al carrito.`);
};

window.verCarrito = function() {
    if (!usuarioLogueado) {
        alert("Inicia sesión para ver tu carrito.");
        mostrarLogin();
        return;
    }

    const modal = document.getElementById('modal-carrito');
    const lista = document.getElementById('lista-items');
    const displayUsuario = document.getElementById('nombre-usuario-display');
    const displayTotal = document.getElementById('precio-total');

    if (displayUsuario) displayUsuario.innerText = nombreDeLaCuenta;
    
    if (lista) {
        lista.innerHTML = ""; 
        let total = 0;

        if (carrito.length === 0) {
            lista.innerHTML = "<p style='text-align:center; color:gray;'>Tu carrito está vacío.</p>";
        } else {
            carrito.forEach(item => {
                lista.innerHTML += `
                    <div class="item-lista" style="display:flex; justify-content:space-between; margin-bottom:8px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                        <span>${item.nombre}</span>
                        <span>$${item.precio}</span>
                    </div>`;
                total += item.precio;
            });
        }
        if (displayTotal) displayTotal.innerText = total;
    }
    
    if (modal) modal.style.display = "block";
};

window.cerrarCarrito = function() {
    document.getElementById('modal-carrito').style.display = "none";
};

window.procesarPago = function() {
    if (carrito.length === 0) {
        alert("No hay productos en el carrito.");
        return;
    }
    const metodo = document.getElementById('metodo-pago').value;
    alert(`Gracias ${nombreDeLaCuenta}. Pagaste con ${metodo}. ¡Tu pedido va en camino!`);
    carrito = []; 
    document.getElementById('cantidad-carrito').innerText = "0";
    cerrarCarrito();
};

// ====================================================================
// 5. DETALLES DEL PRODUCTO
// ====================================================================
window.verDetalles = function(nombre, precio, imagen, categoria) {
    const contenido = document.getElementById('contenidoDetalles');
    if (contenido) {
        contenido.innerHTML = `
            <img src="${imagen}" alt="${nombre}" style="width: 150px; height: 150px; object-fit: contain; margin-bottom: 15px;">
            <span class="category-tag" style="display: inline-block; margin-bottom: 10px;">${categoria}</span>
            <h2 style="margin-bottom: 10px; color: #0F1111;">${nombre}</h2>
            <h1 style="color: #B12704; margin-bottom: 20px;">$${precio}</h1>
            <p style="color: #555; margin-bottom: 20px;">Este es un producto de alta calidad de la categoría ${categoria}.</p>
            <button class="btn-primary" onclick="agregarAlCarrito('${nombre}', ${precio}); cerrarDetalles();">Agregar al carrito</button>
        `;
    }
    document.getElementById('detallesContainer').style.display = 'flex';
};

window.cerrarDetalles = function() {
    document.getElementById('detallesContainer').style.display = 'none';
};