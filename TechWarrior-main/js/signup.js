
const signupForm = document.querySelector('#signupForm')

signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const Users = JSON.parse(localStorage.getItem('users')) || []

    const isUserRegistered = Users.find(user => user.email === email)

    if(isUserRegistered){
        Swal.fire({
            icon: 'error',
            title: 'Error de Datos',
            text: 'El correo que ingresaste ya esta registrado'
        })
        return
    }

    Users.push({name,email,password})
    localStorage.setItem('users', JSON.stringify(Users))
    Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'Tu registro se ha realizado con exito'
    }).then(() => {
        window.location.href = 'login.html'
    })
})