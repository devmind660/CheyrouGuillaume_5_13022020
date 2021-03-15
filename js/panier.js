let productsCount = 0;
let priceCount = 0;

const productsTotal = document.getElementById('productsTotal');
productsTotal.innerHTML = productsCount
const priceTotal = document.getElementById('priceTotal');
priceTotal.innerHTML = priceCount / 100 + ' €'

const btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', () => {
    btnAdd.classList.toggle('add')
    btnAdd.classList.toggle('btn-primary')
    btnAdd.classList.toggle('btn-danger')
})

/*

const btnAdd = document.getElementById('btnAdd');
let inCart = false;
const add = document.getElementById('add');
const remove = document.getElementById('remove');

const addToCart = () => {
    if (inCart) = false {
        add.style.display = block
        remove.style.display = none
        productsTotal =+ 1        
        priceTotal =+ this.price
    } else {
        add.style.display = none
        remove.style.display = block
        productsTotal =- 1
        priceTotal =- this.price
    }
}

addToCart()
btnAdd.addEventListener('click', () => addToCart()) */

/* alert('Votre panier est vide') */