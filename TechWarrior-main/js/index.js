//Obtenemos el boton de login
const login = document.querySelector("#login")

//Redirigimos a la pagina de login
login.addEventListener('click', () => {
    window.location.href = 'login.html'
})

const perfil = document.querySelector("#perfil") // Boton de Perfil
const user = JSON.parse(localStorage.getItem('login_success')) || false //Usuarios dentro del localStorage

const carritoContainer = document.querySelector('#carrito') //Boton del carrito

let cantidadArticulosEnCarrito = parseInt(localStorage.getItem('cantidadArticulosEnCarrito')) || 0; // Cantidad de productos
const productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [] //Inforamcion de los productos dentro del localStorage

//Validacion del login
if(user){
    login.classList.add('disable')
    perfil.classList.remove('disable')
    carritoContainer.classList.remove('disable')
    document.querySelector('#carrito-numero').textContent = cantidadArticulosEnCarrito
}

//boton del logout
const logout = document.querySelector('#logout')

//validaciones del logout
logout.addEventListener('click', () => {
    Swal.fire({
        icon: 'info',
        title: 'Cerrar Sesion',
        text: 'Estas seguro de que quieres cerra sesion?',
        showCancelButton: true,
        confirmButtomText: 'Si, cerrar sesion',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false
    }).then((result) => {
        if(result.isConfirmed){
            localStorage.removeItem('login_success')

            Swal.fire({
                icon: 'success',
                title: 'Sesion Cerrada',
                text: 'Tu sesion ha sido cerrada correctamente',
                confirmButtomText: 'OK',
                allowOutsideClick: false
            }).then(() => {
                login.classList.remove('disable')
                perfil.classList.add('disable')
                carritoContainer.classList.add('disable')
            })
        }
    })
})

//Menu del perfil
function toggleMenu() {
    var menu = document.getElementById('opcionesMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

//Botones de las cards de productos
let botones = document.querySelectorAll('#boton')

botones.forEach(boton => {
    boton.addEventListener('click', agregarACarrito);
});

// Funcion para agregar al carrito
let id = 0
function agregarACarrito(event) {
    let boton = event.target
    let productoInfo = boton.closest('.product-details')

    //Seleccion de la informacion de la card
    let productoNombre = productoInfo.querySelector('h3').textContent
    let productoDescripcion = productoInfo.querySelector('p').textContent
    let productoPrecio = productoInfo.querySelector('.product-price').textContent

    cantidadArticulosEnCarrito++
    id = cantidadArticulosEnCarrito

    //Envio de inforamcion al localStorage
    productosCarrito.push({id,productoNombre,productoDescripcion,productoPrecio})
    localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
    document.querySelector('#carrito-numero').textContent = cantidadArticulosEnCarrito
    localStorage.setItem('cantidadArticulosEnCarrito', cantidadArticulosEnCarrito);
}