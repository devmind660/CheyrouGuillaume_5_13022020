import DOM from './DOM.js';

export default class Cart {

// get.Item Cart et si inexistant créer un object vide avec set.Item
    constructor() {
        let content = localStorage.getItem('cart');
        console.log(content);
        if (content) {
            content = JSON.parse(content);
        } else {
            content = {};
            localStorage.setItem('cart', JSON.stringify(content));
        }
        console.log(content);
        this.content = content;
    }


        // let objetARecuperer = 'abcd';
        /*let fakeCart = {
            'abcd': {_id: 'abcd', name: 'Object1'},
            '1234': {_id: '1234', name: 'Object2'}
        };
        localStorage.setItem('cart', JSON.stringify(fakeCart));
        console.log(fakeCart[objetARecuperer]) // syntaxe pour avoir la valeur objetARecuperer de l'objet fakeCart
        // stocker le contenu de get.Item
        // this.content =
    }*/

    add(product) {
        this.content[product._id] = product;
        this.updateLocalStorage();
    } // Ajouter dans this.content / Penser à enregistrer dans la session à chaque modif du panier avec set.Item

    removeToCart() {
        this.content[product._id] = product;
        this.updateLocalStorage();
    } // Retirer de this.content / Penser à enregistrer dans la session à chaque modif du panier avec set.Item

    updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.content));
    }

    display() {
        let cartList = document.getElementById('cartList');

        let product = document.createElement('div');
        cartList.appendChild(product);

        let title = document.createElement('h2');
        title.innerHTML = this.name;
        product.appendChild(title);

        let reference = document.createElement('p');
        reference.innerHTML = this._id;
        product.appendChild(reference);

        let price = DOM.createWithClasses('h4', ['text-end']);
        price.innerHTML = this.price / 100 + ' €';
        product.appendChild(price);

        let button = DOM.createWithClasses('button', ['btn', 'btn-danger', 'mb-3'])
        button.innerHTML = 'Supprimer';
        product.appendChild(button);
        button.addEventListener('click', this._onRemoveToCartClick.bind(this));
    }
    _onRemoveToCartClick() {
        const cart = new Cart();
        cart.remove(this);
    }
}