function principal() {

    let productos = [
        { id: 1, nombre: "mate argentina campeon 1", color: "azul", precio: 5000, rutaImagen: "mate-arg-campeon-azul.webp", categoria: "shop" },
        { id: 2, nombre: "mate mundi", color: "blanco", precio: 3500, rutaImagen: "mate-moli-XL-blanco.webp", categoria: "shop" },
        { id: 3, nombre: "mate moli borgoña", color: "rosa", precio: 2000, rutaImagen: "mate-moli-XL-borgoña.webp", categoria: "shop" },
        { id: 4, nombre: "mate moli", color: "blanco", precio: 2500, rutaImagen: "mate-moli-personalizado.webp", categoria: "shop" },
        { id: 5, nombre: "mate argentina campeon 2", color: "negro", precio: 5000, rutaImagen: "mate-arg-campeon-negro.webp", categoria: "shop" },
        { id: 6, nombre: "mate moli oliva", color: "verde", precio: 3200, rutaImagen: "mate-moli-verde-oliva.webp", categoria: "shop" },
        { id: 7, nombre: "combo 1", color: "azul", precio: 6000, rutaImagen: "cAzulconDorado.webp", categoria: "promo" },
        { id: 8, nombre: "combo 2", color: "azul", precio: 6000, rutaImagen: "cAzulconPlateado.webp", categoria: "promo" },
        { id: 9, nombre: "combo 3", color: "blanco", precio: 6000, rutaImagen: "cBlancoconDorado.webp", categoria: "promo" },
        { id: 10, nombre: "combo 4", color: "negro", precio: 6000, rutaImagen: "cNegroconNegro.webp", categoria: "promo" },
        { id: 11, nombre: "combo 5", color: "negro", precio: 6000, rutaImagen: "cNegroconPlateado.webp", categoria: "promo" },
        { id: 12, nombre: "combo 6", color: "oliva", precio: 6000, rutaImagen: "cOlivaconNegro.webp", categoria: "promo" },
    ];

    let carritoJSON = JSON.parse(localStorage.getItem("carrito"))
    let carrito = carritoJSON ? carritoJSON : []  //op ternario para resumir el if de abajo
    let contenedor = document.getElementById("contenedor")
    
    renderizar(productos, contenedor)
    renderizarCarrito(carrito)
    
    let botonFinalizarCompra = document.getElementById("finalizarCompra")
    botonFinalizarCompra.addEventListener("click", () => finalizarCompra(carrito))
    

} 

principal()

function finalizarCompra(carrito) {
    let carritoFisico = document.getElementById("carrito")
    carritoFisico.innerHTML = ""
    localStorage.removeItem("carrito")
    carrito = []
    renderizarCarrito ([])

}


/*if (carritoJSON) {
    carrito = carritoJSON
} else {
    carrito = []
}*/


function renderizar(arrayDeElementos, contenedor) {

    let contenedor = document.getElementById("contenedor")
    contenedor.innerHTML = ""

    arrayDeElementos.forEach(({ nombre, rutaImagen, precio, id }) => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.innerHTML = `
        <h2>${nombre}</h2>
        <img src=./imagenes/${rutaImagen}>
        <p> Precio: $${precio}</p>
        <button id=${id}>Agregar al carrito</button>
        `
        contenedor.appendChild(tarjetaProducto)
        let botonAgregarAlCarrito = document.getElementById(id)
        botonAgregarAlCarrito.addEventListener("click", agregarAlCarrito)
    })
}

function agregarAlCarrito(e) {

    let productoBuscado = productos.find(producto => producto.id === Number(e.target.id))
    carrito.push({
        id: productoBuscado.id,
        nombre: productoBuscado.nombre,
        precio: productoBuscado.precio
    })
    renderizarCarrito(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function renderizarCarrito(carrito) {

    let carritoFisico = document.getElementById("carrito");
    carritoFisico.innerHTML = "";
    carrito.forEach((nombre, precio) => {
        carritoFisico.innerHTML += `<p>${nombre} ${precio}</p>\n`;
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

let botonBorrarCarrito = document.getElementById("botonBorrarCarrito");
botonBorrarCarrito.addEventListener("click", borrarCarrito);

function borrarCarrito() {

    carrito = [];
    localStorage.removeItem("carrito");
    renderizarCarrito(carrito);
}

let input = document.getElementById("input")
let boton = document.getElementById("botonBuscar")
boton.addEventListener("click", () => filtrarYRenderizar(productos, input.value)) //boton o input
input.addEventListener("input", () => filtrarYRenderizar(productos, input.value))

function filtrarYRenderizar(arrayDeElementos, valorFiltro) {

    let elementosFiltrados = arrayDeElementos.filter(elemento => elemento.nombre.toLowerCase().includes(valorFiltro.toLowerCase()))
    renderizar(elementosFiltrados)
}

let botonesFiltros = document.getElementsByClassName("filtro")

for (const botonFiltro of botonesFiltros) {
    botonFiltro.addEventListener("click", filtrarYRenderizarPorCategoria)
}

function filtrarYRenderizarPorCategoria(e) {

    let elementosFiltrados = productos.filter(producto => producto.categoria === e.target.value)
    renderizar(elementosFiltrados)
}

let botonCarrito = document.getElementById("botonCarrito")
botonCarrito.addEventListener("click", mostrarOcultar)

function mostrarOcultar() {

    let padreContenedor = document.getElementById("productos")
    let carrito = document.getElementById("contenedorCarrito")
    padreContenedor.classList.toggle("oculto")
    carrito.classList.toggle("oculto")
}