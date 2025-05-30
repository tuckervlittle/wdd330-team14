import { loadHeaderFooter, getLocalStorage } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';
import { submitOrder } from './ExternalServices.mjs';

loadHeaderFooter();

const checkout = new CheckoutProcess();
checkout.init();

// Calculate order total when the zip code is entered
const zipInput = document.querySelector('input[name="zip"]');
if (zipInput) {
    zipInput.addEventListener('input', () => {
        checkout.calculateOrderTotal();
    });
}

document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const cart = getLocalStorage('so-cart') || [];

    // Convert cart to items array
    const items = cart.map(item => ({
        id: item.Id,
        name: item.Name,
        price: Number(item.FinalPrice),
        quantity: item.quantity || 1
    }));

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = +(subtotal * 0.06).toFixed(2);
    const shipping = items.length > 0 ? 10 + (items.length - 1) * 2 : 0;
    const orderTotal = +(subtotal + tax + shipping).toFixed(2);

    // Build order object with correct keys
    const orderData = {
        orderDate: new Date().toISOString(),
        fname: form.firstName.value,
        lname: form.lastName.value,
        street: form.street.value,
        city: form.city.value,
        state: form.state.value,
        zip: form.zip.value,
        cardNumber: form.ccnum.value,
        expiration: form.exp.value,
        code: form.cvv.value,
        items,
        orderTotal: orderTotal.toFixed(2),
        shipping,
        tax: tax.toFixed(2)
    };

    try {
        await submitOrder(orderData);
        alert('Order submitted successfully!');
        // Optionally redirect or clear cart here
    } catch (err) {
        alert('Order failed: ' + err.message);
    }
});