export const menu = () => {
    const cardsMenu = document.querySelector('.cards-menu')

    const changeInfo = (restaurant) => {
        const { name, stars, price, kitchen } = restaurant
        const restaurantTitle = document.querySelector('.restaurant-title')
        const restaurantRating = document.querySelector('.rating')
        const restaurantPrice = document.querySelector('.price')
        const restaurantCategory = document.querySelector('.category')
        restaurantTitle.textContent = name
        restaurantRating.textContent = stars
        restaurantPrice.textContent = `От ${price} ₽`
        restaurantCategory.textContent = kitchen
    }

    const addToCart = (cartItem) => {
        const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

        if (cartArray.some((item) => item.id === cartItem.id)) {
            cartArray.map((item) => {
                if (item.id === cartItem.id) {
                    item.count++
                }
                return item;
            })
        }
        else {
            cartArray.push(cartItem)
        }

        localStorage.setItem('cart', JSON.stringify(cartArray))
    }

    const renderItems = (data) => {
        data.forEach(({ description, id, image, name, price }) => {
            const card = document.createElement('div')
            card.classList.add('card')
            console.log(description)
            card.innerHTML = `
        <img src = "${image}" alt = "${name}" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">${description}</div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">${price} ₽</strong>
                </div>
                `
            card.querySelector('.button-add-cart').addEventListener('click', () => {
                addToCart({ name, id, price, count: 1 })
            })

            cardsMenu.append(card)
        })
    }

    if (localStorage.getItem('restaurant') && localStorage.getItem('user')) {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'))
        changeInfo(restaurant)
        fetch(`https://fooddeliveryproject-8b416-default-rtdb.firebaseio.com/db/${restaurant.products}`)
            .then((response) => response.json())
            .then((data) => {
                renderItems(data)
            })
    } else {
        window.location.href = '/'
    }
}