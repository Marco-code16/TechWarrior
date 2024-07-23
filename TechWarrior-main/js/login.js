
const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const Users = JSON.parse(localStorage.getItem('users')) || []

    const isUserLogin = Users.find(user => user.email === email && user.password === password)

    if(!isUserLogin){
        Swal.fire({
            icon: 'error',
            title: 'Error de Datos',
            text: 'El usuario y/o contraseña son incorrectos'
        })
        return
    }

    Swal.fire({
        icon: 'success',
        title: 'Inicio de Sesion Exitoso',
        text: `Bienvenido ${isUserLogin.name}`
    })

    localStorage.setItem('login_success', JSON.stringify(isUserLogin))
    window.location.href = 'index.html'
})