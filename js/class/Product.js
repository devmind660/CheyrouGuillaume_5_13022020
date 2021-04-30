import Cart from './Cart.js';
import DOM from './DOM.js';

export default class Product {

    constructor(productData) {
        Object.assign(this, productData);
    }

    displayList() {
        let productList = document.getElementById('productList');

        let column = DOM.createWithClasses('div', ['col-12', 'col-sm-6', 'col-lg-4']);
        productList.appendChild(column);

        let card = DOM.createWithClasses('article', ['card', 'shadow', 'mx-xl-3', 'mb-5']);
        card.style.overflow = 'hidden'
        column.appendChild(card);

        let link = DOM.createWithClasses('a', ['card-link'])
        link.href = 'product.html?_id=' + this._id;
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
        text.appendChild(price);
    }

    displayProduct() {
        let productId = document.getElementById('productId');
        productId.innerHTML = this._id;

        let productDesc = document.getElementById('productDesc');
        
        let title = document.createElement('h2');
        title.innerHTML = this.name;
        productDesc.appendChild(title);

        let description = document.createElement('p');
        description.innerHTML = this.description;
        productDesc.appendChild(description);

        let price = DOM.createWithClasses('h4', ['text-end']);
        price.innerHTML = this.price / 100 + ' €';
        productDesc.appendChild(price);

        /*let form = document.createElement('form');
        productDesc.appendChild(form);

        let dropdown = DOM.createWithClasses('div', ['mb-3']);
        form.appendChild(dropdown);
        
        let label = DOM.createWithClasses('label', ['colorSelector']);
        label.innerHTML = colors + ' couleurs disponibles';
        dropdown.appendChild(label);
        
        let select = DOM.createWithClasses('select', ['form-select', 'mt-2']);
        select.id = 'colorSelector';
        dropdown.appendChild(select);

        object.object


        <form>
            <div class="mb-3">
                <label for="colorSelector">4 couleurs disponibles</label>
                <select class="form-select mt-2" id="colorSelector">
                    <option value="" selected>Couleurs</option>
                    <option value="1">Couleur 1</option>
                    <option value="2">Couleur 2</option>
                    <option value="3">Couleur 3</option>
                    <option value="4">Couleur 4</option>
                </select>
            </div>
        </form>*/

        let button = DOM.createWithClasses('button', ['btn', 'btn-primary', 'mb-3'])
        button.innerHTML = 'Ajouter au panier';
        productDesc.appendChild(button);
        button.addEventListener('click', this._onAddToCartClick.bind(this));

        let productImg = document.getElementById('productImg');

        let image = DOM.createWithClasses('img', ['w-100', 'mb-3']);
        image.src = this.imageUrl;
        image.alt = 'Ours en peluche ' + this.name;
        productImg.appendChild(image);
    }
    _onAddToCartClick() {
        const cart = new Cart();
        cart.add(this);
    }
}