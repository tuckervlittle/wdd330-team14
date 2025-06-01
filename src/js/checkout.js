import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const order = new CheckoutProcess('so-cart', '.checkout-summary');
order.init();

document
  .querySelector('#zip')
  .addEventListener('blur', order.calculateOrderTotal.bind(order));
  .querySelector('#zip')
  .addEventListener('blur', order.calculateOrderTotal.bind(order));

document.querySelector('#pay-button').addEventListener('click', (e) => {
  e.preventDefault();

  order.checkout();
  e.preventDefault();
  const myForm = document.getElementById('checkout');
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) {
    order.checkout();
  }
});

