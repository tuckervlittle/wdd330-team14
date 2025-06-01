import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';
import Alert from './alert.mjs';

loadHeaderFooter();

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');

const productList = new ProductList('Tents', dataSource, element);

productList.init();

const alert =new Alert();
alert.showAlert();

document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById("newsletter-form");
    const message= document.getElementById("newsletter-message");

    form.addEventListener('submit', function(e){
        e.preventDefault()
        
        const email= document.getElementById("email").value;
        console.log('user subscribe with email', email);

        message.textContent='thank you for subscribing!';
        
        form.reset();
    })
})