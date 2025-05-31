import { setLocalStorage, getLocalStorage, alertMessage} from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  }

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
      }

      init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
      }
    
      calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        const summaryElement = document.querySelector(
          this.outputSelector + " #subTotal"
        );
        const itemNumElement = document.querySelector(
          this.outputSelector + " #num-items"
        );
          itemNumElement.innerText = `Total Items: ${this.list.length}`;
        // calculate the total of all the items in the cart
        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = `Subtotal: $${this.itemTotal.toFixed(2)}`;
      }

      calculateOrderTotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.tax = (this.itemTotal * .06);
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.orderTotal = (
          parseFloat(this.itemTotal) +
          parseFloat(this.tax) +
          parseFloat(this.shipping)
        )
        // display the totals.
        this.displayOrderTotals();
      }
    
      displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);
    
        tax.innerText = `Tax: $${this.tax.toFixed(2)}`;
        shipping.innerText = `Shipping Estimate: $${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `Order Total: $${this.orderTotal.toFixed(2)}`;
      }
    
      async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);
    
        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        console.log(order);
    
        try {
          const response = await services.checkout(order);
          console.log(response);
          setLocalStorage("so-cart", []);
          location.assign("/checkout/success.html");
        } catch (err) {
          console.log(err);
        }
      }
    }