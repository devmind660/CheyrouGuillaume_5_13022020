import Cart from './class/Cart.js';

const cart = new Cart();

cart.displayCart();
cart.clearCart();

let orderId = localStorage.getItem('orderId');
let number = document.getElementById('orderId');
number.innerHTML = orderId;