export const auth = () => {
    const buttonAuth = document.querySelector('.button-auth')
    const buttonOut = document.querySelector('.button-out')
    const userName = document.querySelector('.user-name')
    const buttonCart = document.querySelector('.button-cart')
    const modalAuth = document.querySelector('.modal-auth')
    const modalError = document.querySelector('.modal-error')
    const closeAuth = document.querySelector('.close-auth')
    const loginForm = document.getElementById('logInForm')
    const inputLogin = document.getElementById('login')
    const inputPassword = document.getElementById('password')

    const login = (user) => {
        buttonAuth.style.display = 'none'
        buttonOut.style.display = 'flex'
        userName.style.display = 'flex'
        userName.textContent = user.login
        buttonCart.style.display = 'flex'
        modalAuth.style.display = 'none'
    }

    const logout = (user) => {
        buttonAuth.style.display = 'flex'
        buttonOut.style.display = 'none'
        userName.style.display = 'none'
        userName.textContent = ''
        buttonCart.style.display = 'none'
        localStorage.removeItem('user')
        if (window.location.pathname === '/restaurant.html') {
            window.location.href = '/'
        }
    }

    buttonAuth.addEventListener('click', () => {
        modalAuth.style.display = 'flex'
    })

    closeAuth.addEventListener('click', () => {
        modalAuth.style.display = 'none'
    })

    buttonOut.addEventListener('click', () => {
        logout()
    })

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = {
            login: inputLogin.value,
            password: inputPassword.value
        }
        if (user.login.trim() === '') {
            modalError.style.display = 'flex'
            modalError.textContent = 'Не заполнено поле Логин!'
        }
        else if (user.password.trim() === '') {
            modalError.style.display = 'flex'
            modalError.textContent = 'Не заполнено поле Пароль!'
        }
        else {
            login(user)
            localStorage.setItem('user', JSON.stringify(user))
        }
        inputLogin.addEventListener('input', () => {
            modalError.style.display = 'none'
            modalError.textContent = ''
        })
    })

    if (localStorage.getItem('user')) {
        login(JSON.parse(localStorage.getItem('user')));
    }
}