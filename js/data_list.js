/* var request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/api/teddies");
request.addEventListener("load", () => {
    console.log (request);
    if (request.status === 200) {
        let jsonResponse = request.response;
        let response = JSON.parse(jsonResponse);
        console.log(response);
    }
    else {
        console.error(request.status);
    }
});
request.send(); */

import Product from './class/Product.js';

import Cart from './class/Cart.js';
new Cart();

fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(products => {
    products.forEach(product => {
        product = new Product(product);
        product.displayList()
    });
});