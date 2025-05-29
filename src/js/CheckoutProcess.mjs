import { getLocalStorage } from './utils.mjs';

export function renderTotal() {
    let cartItems = getLocalStorage('so-cart');
    const subTotalElem = document.getElementById('subTotal');
    const taxElem = document.getElementById('tax');
    const shipElem = document.getElementById('ship');
    const totalElem = document.getElementById('total');
 
    let items = -1;
    let subTotal;
    if (!Array.isArray(cartItems)) {
        cartItems = [];
    }
    cartItems.map((item) => {
        subTotal += item.FinalPrice;
        items++;
    });
   
    const tax = subTotal + subTotal * .06;
    const shipping = 10 + items * 2;
    const total = subTotal + tax + shipping;
 
    subTotalElem.innerHTML = `<b>Subtotal: $${subTotal.toFixed(2)}</b>`;
    taxElem.innerHTML = `<b>Tax: $${tax.toFixed(2)}</b>`;
    shipElem.innerHTML = `<b>Shipping: $${shipping.toFixed(2)}</b>`;
    totalElem.innerHTML = `<b>Total: $${total.toFixed(2)}</b>`;
}