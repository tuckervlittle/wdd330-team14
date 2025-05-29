import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

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