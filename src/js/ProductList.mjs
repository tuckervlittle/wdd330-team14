
import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    // Calculate discount if needed
  const discount = product.SuggestedRetailPrice && product.FinalPrice
  ? product.SuggestedRetailPrice - product.FinalPrice : 0;

  // Only show discount if there is one
  const discountHtml = discount > 0
    ? `<div class="discount-indicator">Save $${discount.toFixed(2)}!</div>`
    : "";
  
    
  return `<li class="product-card">
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="${product.Name}">
            <h2 class="card_brand">${product.Brand.Name}</h2>
            <h3 class="card_name">${product.Name}</h3>
            <p class="product-card_price">$${product.FinalPrice}</p>
        </a>
    </li>
    `;
}

export default class ProductList {

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
    
    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}