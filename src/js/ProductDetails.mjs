import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { alertMessage } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        let cartItems = getLocalStorage("so-cart") || []; 
        if (!Array.isArray(cartItems)) {
            cartItems = [];
        }
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);

        //Show feedback to the user
        alertMessage('Item added to cart!');
    }

    renderProductDetails() {
        buildProductDetails(this.product);
    }
}

function buildProductDetails(product) {
    document.querySelector('h3').textContent = product.Brand.Name;
    document.querySelector('h2').textContent = product.NameWithoutBrand;

    const image = document.getElementById('productImage');
    image.src = product.Images.PrimaryLarge;
    image.alt = product.NameWithoutBrand;
    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors.ColorName;
    document.getElementById('productDescription').innerHTML = product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = product.Id;
}