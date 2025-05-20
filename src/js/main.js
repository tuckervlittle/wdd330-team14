import ProductList from "../ProductList.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const productListElement = document.querySelector("#tents-list");
const productList = new ProductList("tents", dataSource, productListElement);

productList.init();