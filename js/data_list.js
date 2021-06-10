import Product from './class/Product.js';

import Cart from './class/Cart.js';
new Cart();

fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(products => {
    products.forEach(product => {
        product = new Product(product);
        product.displayList()
    })
})