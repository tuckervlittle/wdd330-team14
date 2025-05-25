import { getLocalStorage } from './utils.mjs';

let cartTotal = 0;
export function renderCartContents() {
    let cartItems = getLocalStorage('so-cart');
    if (!Array.isArray(cartItems)) {
        cartItems = [];
    }
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    const cartList = document.querySelector('.cart-list')
    cartList.innerHTML = htmlItems.join('');

    console.log(cartTotal);
    const total = document.querySelector('.cart-total');
    const checkout = document.getElementById('checkout')
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
    let cartImage = null;
    if (!item.Images) {
        cartImage = item.Image;
    }
    else {
        cartImage = item.Images.PrimarySmall;
    }
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
    <img
    src="${cartImage}"
    alt="${item.Name}"
    />
    </a>
    <a href="#">
    <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
    cartTotal += item.FinalPrice;
    
    return newItem;
}