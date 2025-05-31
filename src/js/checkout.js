import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const order = new CheckoutProcess('so-cart', '.checkout-summary');
order.init();

document
  .querySelector('#zip')
  .addEventListener('blur', order.calculateOrderTotal.bind(order));
// listening for click on the button
document.querySelector('#pay-button').addEventListener('click', (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status)

  order.checkout();
});
