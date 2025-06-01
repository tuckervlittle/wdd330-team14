import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const order = new CheckoutProcess('so-cart', '.checkout-summary');
order.init();

document
  .querySelector('#zip')
  .addEventListener('blur', order.calculateOrderTotal.bind(order));

// Updated validation for button click
document.querySelector('#pay-button').addEventListener('click', (e) => {
  e.preventDefault();
  const myForm = document.getElementById('checkout');
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) {
    order.checkout();
  }
});
