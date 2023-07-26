let carritoJSON = JSON.parse(localStorage.getItem("carrito")) || []
let carrito = carritoJSON ? carritoJSON : []
let contenedor = document.getElementById("contenedor")

const url = './db.json'
let productos = []

fetch(url)
    .then(response => response.json())
    .then(data => {
        productos = data.productos
        console.log(productos)
        renderizar(productos)
    })
    .catch(err => container.innerHTML = '<h1>No existe producto</h2>');

function renderizar(arrayDeElementos) {
    let contenedor = document.getElementById("contenedor")
    contenedor.innerHTML = ""

    arrayDeElementos.forEach(producto => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.classList.add("card", "m-3")
        tarjetaProducto.innerHTML = `
            <img src="./imagenes/${producto.rutaImagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h2 class="card-title">${producto.nombre}</h2>
                <p class="card-text">Precio: $${producto.precio}</p>
                <button id="${producto.id}" class="btn btn-pink">Agregar al carrito</button>
            </div>
        `
        contenedor.appendChild(tarjetaProducto)
        let botonAgregarAlCarrito = document.getElementById(producto.id)
        botonAgregarAlCarrito.addEventListener("click", () => agregarAlCarrito(producto))
    })
}

function agregarAlCarrito(producto) {
    carrito.push(producto)
    renderizarCarrito(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))

    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #df98b2, #d23bed)",
        }

    }).showToast();
}

function calcularTotal(carrito) {
    let total = 0
    carrito.forEach(producto => {
        total += producto.precio
    })
    return total
}

function renderizarCarrito(carrito) {
    let carritoFisico = document.getElementById("carrito")
    carritoFisico.innerHTML = ""

    carrito.forEach(producto => {
        carritoFisico.innerHTML += `<p>${producto.nombre} $${producto.precio}</p>\n`
    })

    let total = calcularTotal(carrito)
    carritoFisico.innerHTML += `<p>Total: $${total}</p>`
}


let botonBorrarCarrito = document.getElementById("botonBorrarCarrito")
botonBorrarCarrito.addEventListener("click", borrarCarrito)

function borrarCarrito() {
    carrito = []
    localStorage.removeItem("carrito")
    renderizarCarrito(carrito)
}

let botonFinalizarCompra = document.getElementById("finalizarCompra")
botonFinalizarCompra.addEventListener("click", finalizarCompra)

function finalizarCompra() {
    carrito = []
    localStorage.removeItem("carrito")
    renderizarCarrito(carrito)

    Swal.fire({
        title: 'Gracias por su compra!!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    })
}

let input = document.getElementById("input")
let boton = document.getElementById("botonBuscar")
boton.addEventListener("click", () => filtrarYRenderizar(productos, input.value))
input.addEventListener("input", () => filtrarYRenderizar(productos, input.value))

function filtrarYRenderizar(arrayDeElementos, valorFiltro) {
    let elementosFiltrados = arrayDeElementos.filter(elemento => elemento.nombre.toLowerCase().includes(valorFiltro.toLowerCase()))
    renderizar(elementosFiltrados)
}

let botonesFiltros = document.getElementsByClassName("filtro")

for (const botonFiltro of botonesFiltros) {
    botonFiltro.addEventListener("click", () => filtrarYRenderizarPorCategoria(botonFiltro.value))
}

function filtrarYRenderizarPorCategoria(categoria) {
    let elementosFiltrados = productos.filter(producto => producto.categoria === categoria)
    renderizar(elementosFiltrados)
}

let botonCarrito = document.getElementById("botonCarrito")
botonCarrito.addEventListener("click", mostrarOcultar)

function mostrarOcultar() {
    let padreContenedor = document.getElementById("productos")
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    padreContenedor.classList.toggle("oculto")
    contenedorCarrito.classList.toggle("oculto")
}
