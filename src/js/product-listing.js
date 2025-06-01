import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter, initSearchForm } from './utils.mjs';

loadHeaderFooter().then(() => {
  initSearchForm();
});

const category = getParam('category');
const dataSource = new ExternalServices();
const element = document.querySelector('.product-list');
const searchQuery = getParam('search');

const productList = new ProductList(category, dataSource, element);

async function handleSearch(query) {
  const categories = ['tents', 'backpacks', 'sleeping-bags', 'hammocks'];
  let all = [];

  for (let cat of categories) {
    const results = await dataSource.getData(cat);
    results.forEach((product) => (product.Category = cat));
    all = all.concat(results);
  }

  const filtered = all.filter(
    (product) =>
      product.Name.toLowerCase().includes(query.toLowerCase()) ||
      product.Brand.Name.toLowerCase().includes(query.toLowerCase()) ||
      product.Category?.toLowerCase().includes(query.toLowerCase()),
  );

  productList.renderList(filtered);
  document.querySelector('.category-title').textContent =
    `Results for "${query}"`;
}

if (searchQuery) {
  handleSearch(searchQuery);
} else {
  productList.init();
}
