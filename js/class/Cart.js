import DOM from './DOM.js';

export default class Cart {

// get.Item Cart et si inexistant créer un object vide avec set.Item
    constructor() {
        let content = localStorage.getItem('cart');
        if (content) {
            content = JSON.parse(content);
        } else {
            content = {};
            localStorage.setItem('cart', JSON.stringify(content));
        }
        this.content = content;
    }

    /*let objetARecuperer = 'abcd';
        let fakeCart = {
            'abcd': {_id: 'abcd', name: 'Object1'},
            '1234': {_id: '1234', name: 'Object2'}
        };
        localStorage.setItem('cart', JSON.stringify(fakeCart));
        console.log(fakeCart[objetARecuperer]) // syntaxe pour avoir la valeur objetARecuperer de l'objet fakeCart
        // stocker le contenu de get.Item
        // this.content =
    }*/

    add(product) {
        if (this.content[product._id]) {
            this.content[product._id].quantity++;
        } else {
            this.content[product._id] = product;
        }
        this.updateLocalStorage();
    }
    remove(product) {
        if (!this.content[product._id]) {
            return;
        }
        this.content[product._id].quantity--;

        if (this.content[product._id].quantity <= 0) {
            this.delete(product);
        }
        this.updateLocalStorage();
    }
    buy(product) {
        if (!this.content[product._id]) {
            this.content[product._id] = product;
        }
        this.updateLocalStorage();
    }
    delete(product) {
        if (!this.content[product._id]) {
            return;
        }
        this.content[product._id] = undefined;
        this.updateLocalStorage();
    }

    clear() {
        this.content = {};
        this.updateLocalStorage();
    }
    updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.content));
    }

    display() {
        let cartList = document.getElementById('cartList');

        let quantityCount = 0;
        let totalCount = 0;
        
        for (const [id, productData] of Object.entries(this.content)) {
            console.log(id, productData);

            let column = DOM.createWithClasses('div', ['col']);
            cartList.appendChild(column);
    
            let card = DOM.createWithClasses('article', ['card', 'shadow-sm']);
            card.style.overflow = 'hidden';
            column.appendChild(card);

            let row = DOM.createWithClasses('div', ['row', 'g-0']);
            card.appendChild(row);

            let productImg = DOM.createWithClasses('div', ['col-sm-4', 'col-md-12', 'col-lg-4', 'bg-light']);
            row.appendChild(productImg);

            let link = DOM.createWithClasses('a', ['card-link']);
            link.href = 'product.html?_id=' + productData._id;
            productImg.appendChild(link);

            let image = DOM.createWithClasses('img', ['card-img-top', 'h-100']);
            image.src = productData.imageUrl;
            image.style.objectFit = 'cover';    
            image.alt = 'Ours en peluche ' + productData.name;
            link.appendChild(image);

            let productDesc = DOM.createWithClasses('div', ['col-sm-8', 'col-md-12', 'col-lg-8']);
            row.appendChild(productDesc);

            let body = DOM.createWithClasses('div', ['card-body', 'row']);
            productDesc.appendChild(body);
    
            let name = DOM.createWithClasses('div', ['card-title', 'fs-4', 'text-truncate', 'col-12']);
            name.innerHTML = productData.name;
            body.appendChild(name);
        
            let quantity = DOM.createWithClasses('div', ['card-text', 'text-end', 'text-truncate', 'fs-5', 'col-4']);
            quantity.innerHTML = '<small class="text-muted">Quantité<br></small>' + '× ' + productData.quantity;
            body.appendChild(quantity);

            let unitPrice = DOM.createWithClasses('div', ['card-text', 'text-end', 'text-truncate', 'fs-5', 'col-4']);
            unitPrice.innerHTML = '<small class="text-muted">Prix unitaire<br></small>' + productData.price / 100 + ' €';
            body.appendChild(unitPrice);

            let totalPrice = DOM.createWithClasses('div', ['card-text', 'text-end', 'text-truncate', 'fs-5', 'col-4']);
            totalPrice.innerHTML = '<small class="text-muted">Sous-total<br></small>' + productData.price * productData.quantity / 100 + ' €';
            body.appendChild(totalPrice);
            
            quantityCount += productData.quantity;
            totalCount += productData.quantity * productData.price;
        }
        if (quantityCount > 0) {
            let cartTotal = DOM.createWithClasses('h4', ['text-end']);
            cartTotal.innerHTML = 'TOTAL (' + quantityCount + ') : ' + totalCount / 100 + ' €';
            cartList.appendChild(cartTotal);
        } else {
            cartList.innerHTML = 'Votre panier est vide.';
            let formSection = document.getElementById('formSection');
            formSection.style.display = 'none';
        }
    }
}