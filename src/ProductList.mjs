import { renderListWithTemplate } from "./js/utils.mjs";

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
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
}

function productCardTemplate(product) {
  // Calculate discount if needed
  const discount = product.SuggestedRetailPrice && product.FinalPrice
    ? product.SuggestedRetailPrice - product.FinalPrice : 0;
  
  // Only show discount if there is one
  const discountHtml = discount > 0
    ? `<div class="discount-indicator">Save $${discount.toFixed(2)}!</div>`
    : "";
  
    return `
      <li class="product-card">
        <a href="product_pages/?product=${product.Id ?? ''}">
          <img src="${product.Image ?? ''}" alt="Image of ${product.Name ?? ''}">
          <h3 class="card__brand">${product.Brand?.Name ?? ''}</h3>
          <h2 class="card__name">${product.Name ?? ''}</h2>
          <p class="product-card__price">$${product.FinalPrice ?? ''}</p>
          ${discountHtml}
        </a>
      </li>
    `;
}