'use strict';

/*
 *  APELLIDOS
 */

// #consola de video juegos
// perifericos
// componentes

let listaProductos = [{
        id: 1,
        nombre: 'Tapado',
        descripcion: 'Tapado Negro EyeBlack',
        precio: 50.000,
        imagen: 'img/card1.png',
        categoria: 'Tapados',
    },
    {
        id: 2,
        nombre: 'Tapado',
        descripcion: 'Tapado Pepermint',
        precio: 55.000,
        imagen: 'img/card7.jpg',
        categoria: 'Tapados',
    },
    {
        id: 3,
        nombre: 'Campera',
        descripcion: 'Campera Puffer Negro',
        precio: 29.500,
        imagen: 'img/card3.jpg',
        categoria: 'Puffer',
    },
    {
        id: 4,
        nombre: 'Campera',
        descripcion: 'Campera WaterProof Beige',
        precio: 30.000,
        imagen: 'img/card4.png',
        categoria: 'Puffer',
    },
    {
        id: 5,
        nombre: 'Campera Cuero',
        descripcion: 'Campera Cuero Y Corderito Brown',
        precio: 55.000,
        imagen: 'img/card2.jpg',
        categoria: 'Cuero',
    },
    {
        id: 6,
        nombre: 'Campera Cuero',
        descripcion: 'Campera Cuero Y Corderito Negro',
        precio: 60.000,
        imagen: 'img/card6.jpg',
        categoria: 'Cuero',
    },
];

class Carrito {
    constructor(listaProductos) {
        this.productosEnStock = listaProductos
        this.productosAgregados = []
    }
    agregarACarrito(idProducto) {
        let item = this.productosEnStock.find((prod) => prod.id == idProducto)
        this.productosAgregados.push(item)
    }
    quitarDeCarrito(id) {
        for (let clave in this.productosAgregados) {
            if (this.productosAgregados[clave].id == id) {
                this.productosAgregados.splice(clave, 1)
                break
            }
        }
    }
    cantProductos() {
        return this.productosAgregados.length
    }
    cantDeUnProducto(idProducto){
        let precioTotalDelProducto = 0
        for(let clave in this.productosAgregados){
            if (this.productosAgregados[clave].id == idProducto) {
                precioTotalDelProducto += this.productosAgregados[clave].precio
            }
        }
        return precioTotalDelProducto
    }
    gastoTotal() {
        let total = 0
        for (let i = 0; i < this.productosAgregados.length; i++) {
            total += this.productosAgregados[i].precio
        }
        return total
    }
    contadorProducto(idProducto) {
        let contador = 0
        this.productosAgregados.forEach((prod) => {
            if (prod.id == idProducto) {
                contador++
            }
        })
        return contador
    }
    obtenerProducto(idProducto) {
        let aux = []
        this.productosAgregados.forEach((prod) => {
            if (prod.id == idProducto) {
                aux.push(prod)
            }
        })
        return aux[0]
    }
}

const nuevoCarrito = new Carrito(listaProductos)


// GRILLA DE PRODUCTOS
////////////////////////////////////////////////////////////////////////////////////////////
function actualizaDivMinicarrito(carrito) {
    // actualiza los contadores del minicarrito
    let datosCarrito = document.getElementById("minicarrito")
    let parrafos = datosCarrito.getElementsByTagName('span')
    parrafos[0].textContent = carrito.cantProductos()
    parrafos[1].innerHTML = carrito.gastoTotal()
}

function generarCard(producto, carrito) {
    // crea cards de cada producto
    let contenedorCards = document.getElementById('cards-template')

    let cardProducto = document.createElement('div')
    cardProducto.setAttribute("class", "card")

    let imagenProducto = document.createElement('img')
    imagenProducto.src = producto.imagen

    let cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-body")

    let cardtitulo = document.createElement('h5')
    cardtitulo.setAttribute("class", "card-title")
    cardtitulo.textContent = producto.nombre

    let descripcion = document.createElement('p')
    descripcion.setAttribute("class", "card-text")
    descripcion.textContent = producto.descripcion

    let precio = document.createElement('span')
    precio.innerHTML = producto.precio

    let boton = document.createElement('button')
    boton.setAttribute("id", "agregar" + producto.id)
    boton.textContent = 'Agregar a carrito.'

    let categoria = document.createElement('span')
    categoria.setAttribute("class", "categoria")
    categoria.innerHTML = producto.categoria

    contenedorCards.append(cardProducto)
    cardProducto.append(cardBody)
    cardProducto.appendChild(imagenProducto)
    cardBody.appendChild(cardtitulo)
    cardBody.appendChild(descripcion)
    cardBody.appendChild(precio)
    cardBody.appendChild(boton)
    cardBody.appendChild(categoria)

    // agrega al carrito un producto por id del producto
    let botonActivado = document.getElementById("agregar" + producto.id)
    botonActivado.addEventListener('click', () => {
        carrito.agregarACarrito(producto.id)
        actualizaDivMinicarrito(carrito)
    })

}

function generarGrillaCards(listaProductos) {
    let carrito = nuevoCarrito
    listaProductos.forEach((producto) => {
        generarCard(producto, carrito)
    })
}

function filtroPorCategoria(botonesCategoria, contenedorCard) {
    botonesCategoria.forEach(boton => {
        boton.addEventListener("click", () => {
            contenedorCard.forEach((card) => {
                
                let categoria = card.querySelector(".categoria").textContent
                let categoriaAFiltrar = boton.textContent
                // cuando se activa algun boton de categoria oculta las etiquetas que no son de esa categoria 
                if (categoria != categoriaAFiltrar && "borrar" != categoriaAFiltrar) {
                    card.style.display = "none"
                } else {
                    card.style.display = "block"
                }
            })
        });
    });
}

// CARITO
////////////////////////////////////////////////////////////////////////////////////////////

function filaDeCadaProducto(producto, contenedorTablas, carrito) {
    // genera cada fila de la tabla que muestra el carrito
    let filaProduct = document.createElement("tr")
    filaProduct.setAttribute("class", "contenido")

    let thprod = document.createElement("th")
    thprod.setAttribute("scope", "row")
    thprod.innerHTML = carrito.contadorProducto(producto.id)

    let tduno = document.createElement("td")
    tduno.textContent = producto.nombre

    let tddos = document.createElement("td")
    tddos.textContent = producto.descripcion

    let tdtres = document.createElement("td")
    tdtres.innerHTML = carrito.cantDeUnProducto(producto.id)

    let botonQuitar = document.createElement("button")
    botonQuitar.setAttribute("onclick", `eliminarDelCarrito(${producto.id})`)
    botonQuitar.setAttribute("class", "boton-eliminar")
    botonQuitar.textContent = "Quitar"

    contenedorTablas.append(filaProduct)
    filaProduct.appendChild(thprod)
    filaProduct.appendChild(tduno)
    filaProduct.appendChild(tddos)
    filaProduct.appendChild(tdtres)
    filaProduct.appendChild(botonQuitar)

}

function crearCarrito(carrito, contenedorTablas){
    while (contenedorTablas.firstChild) {
        contenedorTablas.removeChild(contenedorTablas.firstChild);
    }
    listaProductos.forEach((producto) => {
        if (carrito.productosAgregados.includes(producto)) {
            filaDeCadaProducto(producto, contenedorTablas, carrito)
        }
    })

    let totalPrecios = document.createElement("div")
    totalPrecios.innerHTML = carrito.gastoTotal()
    contenedorTablas.appendChild(totalPrecios)
}


function mostrarCarrito(botonVerCarrito, contenedorTablas, listaProductos) {
    let carrito = nuevoCarrito
    botonVerCarrito.addEventListener('click', () => {
        let modal = document.querySelector(".modal")
        modal.style.display = "block"
        crearCarrito(carrito, contenedorTablas)
    })
}

function eliminarDelCarrito(id){
    const contenedorTablas = document.querySelector(".tabla-contenido")
    nuevoCarrito.quitarDeCarrito(id)
    crearCarrito(nuevoCarrito, contenedorTablas)
}

function cerrarCarrito(botonesCerrarCarrito, contenedorTablas, contenedorModal) {
    botonesCerrarCarrito.forEach((boton) => {
        boton.addEventListener('click', () => {

            // borra las etiquetas ya creadas para que no se acumulen
            while (contenedorTablas.firstChild) {
                contenedorTablas.removeChild(contenedorTablas.firstChild);
            }
            // oculta el carrito
            contenedorModal.style.display = "none"
        })
    })
}

// mostrar grilla/catalogo de productos 
generarGrillaCards(listaProductos)

// mostrar/filtrar por categoria 
const botonesCategoria = document.querySelectorAll(".btn-categorias");
const contenedorCard = document.querySelectorAll(".card")
filtroPorCategoria(botonesCategoria, contenedorCard)

// modal del carrito
const contenedorModal = document.querySelector(".modal")
const botonVerCarrito = document.querySelector(".ver-carrito")
const botonesCerrarCarrito = document.querySelectorAll(".cerrar-modal")
const contenedorTablas = document.querySelector(".tabla-contenido")
mostrarCarrito(botonVerCarrito, contenedorTablas, listaProductos)
cerrarCarrito(botonesCerrarCarrito, contenedorTablas, contenedorModal)