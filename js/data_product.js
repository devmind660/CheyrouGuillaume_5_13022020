import Product from './class/Product.js';

import Cart from './class/Cart.js';
new Cart();

let currentId = window.location.search;
currentId = currentId.slice(5);
console.log(currentId);

fetch("http://localhost:3000/api/teddies/" + currentId)
.then(response => response.json())
.then(product => {
    console.log(product);
    product = new Product(product);
    product.displayProduct()
});