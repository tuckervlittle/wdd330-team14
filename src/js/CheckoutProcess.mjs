
import { getLocalStorage } from './utils.mjs';
import { submitOrder } from './ExternalServices.mjs';

export default class CheckoutProcess {
    constructor(key = "so-cart", outputSelector = "#order-summary") {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
        // Calculate subtotal and display it
        this.itemTotal = this.list.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
        const subtotalElem = document.querySelector(`${this.outputSelector} #subtotal`);
        if (subtotalElem) subtotalElem.innerText = this.itemTotal.toFixed(2);
    }

    calculateOrderTotal() {
        // Tax: 6% of subtotal
        this.tax = this.itemTotal * 0.06;
        // Shipping: $10 for first item, $2 for each additional
        this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const taxElem = document.querySelector(`${this.outputSelector} #tax`);
        const shippingElem = document.querySelector(`${this.outputSelector} #shipping`);
        const totalElem = document.querySelector(`${this.outputSelector} #order-total`);
        if (taxElem) taxElem.innerText = this.tax.toFixed(2);
        if (shippingElem) shippingElem.innerText = this.shipping.toFixed(2);
        if (totalElem) totalElem.innerText = this.orderTotal.toFixed(2);
    }

    packageItems(items) {
        // Convert cart items to the required format for the order
        return items.map(item => ({
            id: item.Id,
            name: item.Name,
            price: Number(item.FinalPrice),
            quantity: item.quantity || 1 // default to 1 if not tracked
        }));
    }

    formDataToJSON(formElement) {
        const formData = new FormData(formElement),
            convertedJSON = {};
        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });
        return convertedJSON;
    }

    async checkout(form) {
        // Get form data as object
        const order = this.formDataToJSON(form);

        // Add required fields
        order.orderDate = new Date().toISOString();
        order.items = this.packageItems(getLocalStorage(this.key) || []);
        order.orderTotal = this.orderTotal.toFixed(2);
        order.shipping = this.shipping;
        order.tax = this.tax.toFixed(2);

        // Rename fields to match API requirements
        order.fname = order.firstName;
        order.lname = order.lastName;
        order.cardNumber = order.ccnum;
        order.expiration = order.exp;
        order.code = order.cvv;

        // Remove old keys
        delete order.firstName;
        delete order.lastName;
        delete order.ccnum;
        delete order.exp;
        delete order.cvv;

        // DEBUG: Log the order object
        console.log("ORDER TO SUBMIT:", order);

        // Submit order
        return await submitOrder(order);
    }
}