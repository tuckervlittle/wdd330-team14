import { loadHeaderFooter } from './utils.mjs';
import { renderCartContents } from './ShoppingCart.mjs';
import { renderTotal } from './CheckoutProcess.mjs';

loadHeaderFooter();
if (!document.getElementById('checkout')) {
   renderTotal();
} else {
    
  renderCartContents();
}
