let carrito = []; // Para almacenar los productos del carrito

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    const producto = { nombre, precio };
    carrito.push(producto);
    actualizarCarrito();
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

// Función para actualizar el contenido del carrito y el contador
function actualizarCarrito() {
    const carritoElemento = document.getElementById('carrito');
    const totalElemento = document.getElementById('total');
    const contadorCarrito = document.getElementById('contador-carrito');
    
    // Limpiar el carrito
    carritoElemento.innerHTML = '';

    // Agregar los productos al carrito
    carrito.forEach((producto, indice) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;

        // Crear botón de eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar');
        botonEliminar.addEventListener('click', () => eliminarDelCarrito(indice));

        li.appendChild(botonEliminar);
        carritoElemento.appendChild(li);
    });

    // Actualizar el total
    const total = carrito.reduce((acumulado, producto) => acumulado + producto.precio, 0);
    totalElemento.textContent = `Total: $${total}`;

    // Actualizar el contador del carrito
    contadorCarrito.textContent = carrito.length;
}

// Función para mostrar u ocultar el carrito
function toggleCarrito() {
    const carritoContenedor = document.getElementById('carrito-contenedor');
    carritoContenedor.style.display = (carritoContenedor.style.display === 'block') ? 'none' : 'block';
}

// Añadir eventos a los botones de agregar al carrito
document.querySelectorAll('.agregar').forEach(boton => {
    boton.addEventListener('click', (e) => {
        const producto = e.target.closest('.producto');
        const nombre = producto.getAttribute('data-nombre');
        const precio = parseFloat(producto.getAttribute('data-precio'));
        agregarAlCarrito(nombre, precio);
    });
});

// Evento para mostrar/ocultar el carrito al hacer clic en el ícono
document.getElementById('icono-carrito').addEventListener('click', toggleCarrito);

// Evento para cerrar el carrito
document.getElementById('cerrar-carrito').addEventListener('click', toggleCarrito);