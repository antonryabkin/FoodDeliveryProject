export const cart = () => {
    const buttonCart = document.getElementById('cart-button')
    const modalCart = document.querySelector('.modal-cart')
    const modalBody = modalCart.querySelector('.modal-body')
    const modalClose = modalCart.querySelector('.close')
    const buttonSend = modalCart.querySelector('.button-primary')
    const buttonClear = modalCart.querySelector('.clear-cart')
    const modalPrice = modalCart.querySelector('.modal-pricetag')

    const resetCart = () => {
        modalBody.innerHTML = ''
        localStorage.removeItem('cart')
        modalCart.classList.remove('is-open')
    }

    const incrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item) => {
            if (item.id === id) {
                item.count++
            }

            return item
        })

        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
    }

    const decrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item) => {
            if (item.id === id) {
                item.count = item.count > 0 ? item.count - 1 : 0
            }

            return item
        })

        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
    }

    const renderItems = (data) => {
        modalBody.innerHTML = ''

        data.forEach(({ name, price, id, count }) => {
            const cartElem = document.createElement('div')
            cartElem.classList.add('food-row')

            cartElem.innerHTML = `
            <span class="food-name">${name}</span>
					<strong class="food-price">${price} ₽</strong>
					<div class="food-counter">
						<button class="counter-button btn-dec" data-index="${id}">-</button>
						<span class="counter">${count}</span>
						<button class="counter-button btn-inc" data-index="${id}">+</button>
					</div>
            `

            modalBody.append(cartElem);

        });

        const totalPrice = data.reduce((total, { count, price }) => {
            return total + (count * price)
        }, 0)

        modalPrice.textContent = `${totalPrice} ₽`

    }

    modalBody.addEventListener('click', (e) => {
        e.preventDefault()

        if (e.target.classList.contains('btn-inc')) {
            incrementCount(e.target.dataset.index)
        } else if (e.target.classList.contains('btn-dec')) {
            decrementCount(e.target.dataset.index)
        }
    })

    buttonSend.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart')
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cartArray
        })
            .then(response => {
                if (response.ok) {
                    resetCart()
                }
            })
            .catch(e => {
                console.error(e)
            })
    })

    buttonClear.addEventListener('click', () => {
        resetCart()
    })

    buttonCart.addEventListener('click', () => {
        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')));
        }
        else {
            return alert('Корзина пуста!')
        }

        modalCart.classList.add('is-open')
    })

    modalClose.addEventListener('click', () => {
        modalCart.classList.remove('is-open')
    })
}