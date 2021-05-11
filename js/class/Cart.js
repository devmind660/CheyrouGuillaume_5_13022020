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
    } // Ajouter dans this.content / Penser à enregistrer dans la session à chaque modif du panier avec set.Item

    remove(product) {
        if (this.content[product._id].quantity > 1) {
            this.content[product._id].quantity--;
        } else {
            this.content[product._id] = undefined;
        }
        this.updateLocalStorage();
    } // Retirer de this.content / Penser à enregistrer dans la session à chaque modif du panier avec set.Item

    updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.content));
    }

    display() {
        let cartList = document.getElementById('cartList');

        let quantityCount = 0;
        let totalCount = 0;
        
        for (const [id, productData] of Object.entries(this.content)) {
            console.log(id, productData);
        
            let product = DOM.createWithClasses('div', ['row', 'cart-grid', 'mb-3']);
            cartList.appendChild(product);

            let productImg = DOM.createWithClasses('div', ['col-12', 'col-lg-4']);
            product.appendChild(productImg);

            let link = document.createElement('a');
            link.href = 'product.html?_id=' + productData._id;
            productImg.appendChild(link);

            let image = DOM.createWithClasses('img', ['w-100', 'mb-3']);
            image.src = productData.imageUrl;
            image.alt = 'Ours en peluche ' + productData.name;
            link.appendChild(image);

            let productDesc = DOM.createWithClasses('div', ['col-12', 'col-lg-8']);
            product.appendChild(productDesc);

            let title = DOM.createWithClasses('h4', ['text-uppercase', 'mb-3']);
            title.innerHTML = '×' + productData.quantity + '&ensp;' + productData.name;
            productDesc.appendChild(title);

            let price = DOM.createWithClasses('h5', ['text-end']);
            price.innerHTML = 'Prix : ' + productData.price / 100 + ' €';
            productDesc.appendChild(price);

            let productTotal = DOM.createWithClasses('h5', ['text-end']);
            productTotal.innerHTML = 'Sous-total : ' + productData.price * productData.quantity / 100 + ' €';
            productDesc.appendChild(productTotal);

            quantityCount += productData.quantity;
            totalCount += productData.quantity * productData.price;
        }
        if (quantityCount > 0) {
            let cartTotal = DOM.createWithClasses('h4', ['text-end']);
            cartTotal.innerHTML = 'TOTAL (' + quantityCount + ') : ' + totalCount / 100 + ' €';
            cartList.appendChild(cartTotal);
        } else {
            cartList.innerHTML = 'Votre panier est vide.';
        }
    }
}