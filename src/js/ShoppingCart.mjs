import { getLocalStorage } from './utils.mjs';

let cartTotal = 0;
export function renderCartContents() {
    let cartItems = getLocalStorage('so-cart');
    if (!Array.isArray(cartItems)) {
        cartItems = [];
    }
    const itemMap = new Map();
    cartTotal = 0;

    cartItems.forEach((item) => {
        const key = item.Id;
        if (itemMap.has(key)) {
            const existing = itemMap.get(key);
            existing.quantity += 1;
        } else {
            itemMap.set(key, { ...item, quantity: 1 });
        }
    });

    const htmlItems = Array.from(itemMap.values()).map((item) => cartItemTemplate(item));
    const cartList = document.querySelector('.cart-list')
    cartList.innerHTML = htmlItems.join('');

    console.log(cartTotal);
    const total = document.querySelector('.cart-total');
    const checkout = document.getElementById('checkout-button')
    total.innerHTML = `<b>Total: $${cartTotal.toFixed(2)}</b>`;
    if (cartTotal > 0) {
        total.parentElement.classList.remove('hide');
        checkout.classList.remove('hide');
    }
    else {
        cartList.innerHTML = `
        <p>It looks like your cart is empty...</p>
        <p>Come back when you've decided on some gear!</p>`
    }
}

function cartItemTemplate(item) {
    let cartImage = item.Images ? item.Images.PrimarySmall : item.Image;
    const itemTotal = item.FinalPrice * item.quantity;

    const newItem = `<li class="cart-card divider">
        <a href="#" class="cart-card__image">
            <img src="${cartImage}" alt="${item.Name}" />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: ${item.quantity}</p>
        <p class="cart-card__price">$${itemTotal.toFixed(2)}</p>
    </li>`;

    cartTotal += itemTotal;

    return newItem;
}