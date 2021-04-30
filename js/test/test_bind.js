import DOM from '../class/DOM.js';

class Product {
    constructor(productData) {
        Object.assign(this, productData);
    }
    display() {
        let productList = document.getElementById('productList');

        let column = DOM.createWithClasses('div', ['col-12', 'col-sm-6', 'col-lg-4']);
        productList.appendChild(column);

        let card = DOM.createWithClasses('article', ['card', 'shadow', 'mx-xl-3', 'mb-5']);
        card.style.overflow = 'hidden'
        column.appendChild(card);

        let link = DOM.createWithClasses('a', ['card-link'])
        link.href = 'produit.html/' + this._id;
        card.appendChild(link);

        let image = DOM.createWithClasses('img', ['card-img-top']);
        image.src = this.imageUrl;
        image.alt = 'Ours en peluche ' + this.name;
        image.style.height = '200px';
        link.appendChild(image);

        let body = DOM.createWithClasses('div', ['card-body']);
        card.appendChild(body);

        let title = DOM.createWithClasses('h3', ['card-title']);
        title.innerHTML = this.name;
        body.appendChild(title);

        let text = DOM.createWithClasses('div', ['card-text']);
        body.appendChild(text);

        let description = document.createElement('p');
        description.innerHTML = this.description;
        text.appendChild(description);

        let price = DOM.createWithClasses('h5', ['text-end']);
        price.innerHTML = this.price / 100 + ' €';
        price.addEventListener('click', this.test.bind(this, 'test paramètre'));
        text.appendChild(price);
        console.log(this)
    }
    test(msg) {
    console.log(this)
    alert(msg);  
    }
}

