import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ExternalServices();
const productId = getParam('product');

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// add listener to Add to Cart button
// document
// document.getElementById('addToCart').addEventListener('click', addToCartHandler);
