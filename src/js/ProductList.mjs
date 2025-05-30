
import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    // Calculate discount if needed
  const discount = product.SuggestedRetailPrice && product.FinalPrice
  ? product.SuggestedRetailPrice - product.FinalPrice : 0;

  // Only show discount if there is one
  const discountHtml = discount > 0
    ? `<p class="discount-indicator">Save $${discount.toFixed(2)}!</p>`
    : "";

    // Add a class if discounted
    const discountedClass = discount > 0 ? " discounted" : "";

    return `<li class="product-card${discountedClass}">
        <a href="../product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
            <h2 class="card_brand">${product.Brand.Name}</h2>
            <h3 class="card_name">${product.Name}</h3>
            <p class="product-card_price">$${product.FinalPrice}</p>
            ${discountHtml}
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
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        let categoryName = this.category;
        console.log(categoryName);
        categoryName = categoryName.replace(categoryName.charAt(0), categoryName.charAt(0).toUpperCase());
        // categoryName = categoryName.toUpperCase();
        document.querySelector(".category-title").textContent = categoryName;
    }
    
    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}