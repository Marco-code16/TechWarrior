const perfil = document.querySelector("#perfil")
const user = JSON.parse(localStorage.getItem('login_success')) || false
const carritoContainer = document.querySelector('#carrito')
let cantidadArticulosEnCarrito = parseInt(localStorage.getItem('cantidadArticulosEnCarrito')) || 0;
const productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || []

if(user){
    login.classList.add('disable')
    perfil.classList.remove('disable')
    carritoContainer.classList.remove('disable')
    document.querySelector('#carrito-numero').textContent = cantidadArticulosEnCarrito
}

function estadoDelCarrito(){
    let carrito = document.querySelector(".pago-container")
    let container = document.querySelector(".productos-section")
    if(productosCarrito.length == 0){
        carrito.classList.add('hiddenCarrito')
        container.classList.add('sinProductos')
    }
}




function cardsProductos(){
    estadoDelCarrito()
    let cardsProductos = document.querySelector('#productosContainer')
    
    productosCarrito.forEach(product => {
        let card = document.createElement('article');
        card.classList.add('product-card')
        let cardInfo = agregarInfo(product)
        card.innerHTML = cardInfo
        cardsProductos.appendChild(card)
    });
}

cardsProductos()

function agregarInfo(product){
    return `
        <img src="img/tarjeta1.jpeg" alt="">
        <div class="product-details">
            <h3>${product.productoNombre}</h3>
            <p>${product.productoDescripcion}</p>
            <p class="product-price">${product.productoPrecio}</p>
            <div class="product-btn">
                <span class="disable">${product.id}</span>
                <button id="boton" type="button">Eliminar del Carrito</button>
            </div>
        </div>`
}

let botones = document.querySelectorAll('#boton')

botones.forEach(boton => {
    boton.addEventListener('click', quitarDelCarrito);
});

function quitarDelCarrito(event){
    if(cantidadArticulosEnCarrito > 0){
        let card = event.target.parentNode.parentNode.parentNode
        let product = event.target.parentNode
        let productId = parseInt(product.querySelector('span').textContent) 

        let cardPago = document.querySelector(`#id-${productId}`).parentNode

        cantidadArticulosEnCarrito--
        document.querySelector('#carrito-numero').textContent = cantidadArticulosEnCarrito;
        localStorage.setItem('cantidadArticulosEnCarrito', cantidadArticulosEnCarrito);


        const productIndex = productosCarrito.findIndex(product => product.id === productId);
        productosCarrito.splice(productIndex, 1);
        localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito))
        card.remove()
        cardPago.remove()
    }
    estadoDelCarrito()
    actualizarTotalCarrito()
}

function agregarItemsAPago() {
    let pagoContenedor = document.querySelector('.pago-items-container')
    productosCarrito.forEach(product => {
        let cardPago = document.createElement('div');
        let precio = Math.round(product.productoPrecio * 100)/100;
        let cardInfo = `
            <span id="id-${product.id}" class=" disable"></span>
            <div class="carrito-item-detalles">
                <div class="carrito-info">
                    <span class="carrito-item-titulo">${product.productoNombre}</span>
                    <span class="carrito-item-precio">${'$'+precio.toLocaleString("es") + ",00"}</span>
                </div>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
            </div>
        `
        cardPago.innerHTML = cardInfo
        pagoContenedor.appendChild(cardPago)

        //Agregmos al funcionalidad restar cantidad del nuevo item
        let botonRestarCantidad = cardPago.getElementsByClassName('restar-cantidad')[0];
        botonRestarCantidad.addEventListener('click',restarCantidad);

        //Agregamos la funcionalidad sumar cantidad del nuevo item
        let botonSumarCantidad = cardPago.getElementsByClassName('sumar-cantidad')[0];
        botonSumarCantidad.addEventListener('click',sumarCantidad);
    });
    actualizarTotalCarrito()
}

//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    let total = 0;
    productosCarrito.forEach(product => {
        let cardPago = document.querySelector(`#id-${product.id}`).parentNode
        let cantidad = cardPago.getElementsByClassName('carrito-item-cantidad')[0].value;
        total += (product.productoPrecio * cantidad)
    })
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";
}

agregarItemsAPago()