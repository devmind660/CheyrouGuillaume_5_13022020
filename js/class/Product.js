import Cart from './Cart.js';
import DOM from './DOM.js';

export default class Product {

    constructor(productData) {
        this.quantity = 1;
        Object.assign(this, productData);
    }

    displayList() {
        let productList = document.getElementById('productList');

        let column = DOM.createWithClasses('div', ['col']);
        productList.appendChild(column);

        let card = DOM.createWithClasses('article', ['card', 'shadow-sm', 'h-100']);
        card.style.overflow = 'hidden';
        column.appendChild(card);

        let link = DOM.createWithClasses('a', ['card-link']);
        link.href = 'product.html?_id=' + this._id;
        card.appendChild(link);

        let image = DOM.createWithClasses('img', ['card-img-top']);
        image.src = this.imageUrl;
        image.style.height = '250px';
        image.style.objectFit = 'cover';
        image.alt = 'Ours en peluche ' + this.name;
        link.appendChild(image);

        let body = DOM.createWithClasses('div', ['card-body']);
        card.appendChild(body);

        let name = DOM.createWithClasses('h3', ['card-title']);
        name.innerHTML = this.name;
        body.appendChild(name);

        let description = DOM.createWithClasses('p', ['card-text']);
        description.innerHTML = this.description;
        body.appendChild(description);

        let price = DOM.createWithClasses('div', ['card-footer', 'text-end', 'fs-4']);
        price.innerHTML = '<small class="text-muted">Prix : </small>' + this.price / 100 + ' €';
        card.appendChild(price);
    }

    displayProduct() {
        let title = document.getElementById('title');
        title.innerHTML = '<small>Ours en peluche</small> ' + this.name;

        let productId = document.getElementById('productId');
        productId.innerHTML = 'Réf : ' + this._id;

        let productDesc = document.getElementById('productDesc');
      
        let name = document.getElementById('subtitle');
        name.innerHTML = this.name;

        let description = document.createElement('p');
        description.innerHTML = this.description;
        productDesc.appendChild(description);

        let price = DOM.createWithClasses('h4', ['text-end']);
        price.innerHTML = '<small>Prix : </small>' + this.price / 100 + ' €';
        productDesc.appendChild(price);

        let form = document.createElement('form');
        productDesc.appendChild(form);

        let dropdown = DOM.createWithClasses('div', ['mb-3']);
        form.appendChild(dropdown);
        
        let label = document.createElement('label');
        label.setAttribute('for', 'colorSelector');
        if (this.colors.length < 2) {
            label.innerHTML = this.colors.length + ' couleur disponible :';
        } else {
            label.innerHTML = this.colors.length + ' couleurs disponibles :';
        }
        dropdown.appendChild(label);
        
        let select = DOM.createWithClasses('select', ['form-select', 'mt-2']);
        select.id = 'colorSelector';
        dropdown.appendChild(select);

        this.colors.forEach(function(item, index) {
            let option = document.createElement('option');
            option.setAttribute('value', index);
            option.innerHTML = item;
            select.appendChild(option);
        });

        let buttonGroup = DOM.createWithClasses('div', ['row']);
        productDesc.appendChild(buttonGroup);

        let buttonGrid = DOM.createWithClasses('div', ['col-12', 'col-sm-6', 'd-grid', 'mb-3', 'btn-grid']);
        buttonGroup.appendChild(buttonGrid);
        let buttonAdd = DOM.createWithClasses('button', ['btn', 'btn-primary', 'mt-3']);
        buttonAdd.innerHTML = '<strong>AJOUTER 1&ensp;<i class="fas fa-plus-square"></i></strong>';
        buttonGrid.appendChild(buttonAdd);
        buttonAdd.addEventListener("click", this._onAddToCartClick.bind(this));

        buttonGrid = DOM.createWithClasses('div', ['col-12', 'col-sm-6', 'd-grid', 'mb-3', 'btn-grid']);
        buttonGroup.appendChild(buttonGrid);
        let buttonRemove = DOM.createWithClasses('button', ['btn', 'btn-primary', 'mt-3']);
        buttonRemove.innerHTML = '<strong>RETIRER 1&ensp;<i class="fas fa-minus-square"></i></strong>';
        buttonGrid.appendChild(buttonRemove);
        buttonRemove.addEventListener("click", this._onRemoveToCartClick.bind(this));

        buttonGrid = DOM.createWithClasses('div', ['col-12', 'col-sm-6', 'd-grid', 'mb-3', 'btn-grid']);
        buttonGroup.appendChild(buttonGrid);
        let buttonBuy = DOM.createWithClasses('a', ['btn', 'btn-success', 'mt-3']);
        buttonBuy.setAttribute('role', 'button');
        buttonBuy.setAttribute('href', 'cart.html');
        buttonBuy.innerHTML = '<strong>ACHETER&ensp;<i class="fas fa-shopping-cart"></i></strong>';
        buttonGrid.appendChild(buttonBuy);
        buttonBuy.addEventListener("click", this._onBuyToCartClick.bind(this));

        buttonGrid = DOM.createWithClasses('div', ['col-12', 'col-sm-6', 'd-grid', 'mb-3', 'btn-grid']);
        buttonGroup.appendChild(buttonGrid);
        let buttonDelete = DOM.createWithClasses('button', ['btn', 'btn-danger', 'mt-3']);
        buttonDelete.innerHTML = '<strong>SUPPRIMER&ensp;<i class="fas fa-trash-alt"></i></strong>';
        buttonGrid.appendChild(buttonDelete);
        buttonDelete.addEventListener("click", this._onDeleteToCartClick.bind(this));

        let productImg = document.getElementById('productImg');

        let image = DOM.createWithClasses('img', ['w-100', 'mb-3']);
        image.src = this.imageUrl;
        image.alt = 'Ours en peluche ' + this.name;
        productImg.appendChild(image);
    }
    
    _onAddToCartClick() {
        const cart = new Cart();
        cart.add(this);

        let alert = DOM.createWithClasses('div', ['alert', 'alert-success', 'alert-dismissible', 'fade', 'show']);
        alert.setAttribute('role', 'alert');
        alert.innerHTML = '<i class="fas fa-check-circle"></i>&ensp;Une peluche ' + this.name + ' a été ajoutée au panier.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        productDesc.appendChild(alert);
    }
    _onRemoveToCartClick() {
        const cart = new Cart();
        cart.remove(this);

        let alert = DOM.createWithClasses('div', ['alert', 'alert-primary', 'alert-dismissible', 'fade', 'show']);
        alert.setAttribute('role', 'alert');
        alert.innerHTML = '<i class="fas fa-times-circle"></i>&ensp;Une peluche ' + this.name + ' a été retirée du panier.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        productDesc.appendChild(alert);
    }
    _onBuyToCartClick() {
        const cart = new Cart();
        cart.buy(this);
    }
    _onDeleteToCartClick() {
        const cart = new Cart();
        cart.delete(this);

        let alert = DOM.createWithClasses('div', ['alert', 'alert-danger', 'alert-dismissible', 'fade', 'show']);
        alert.setAttribute('role', 'alert');
        alert.innerHTML = '<i class="fas fa-times-circle"></i>&ensp;Toutes les peluches ' + this.name + '  ont été retirées du panier.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        productDesc.appendChild(alert);
    }

    displayOrder() {
        let ordertList = document.getElementById('orderList');
        
        for (const [id, productData] of Object.entries(this.content)) {
            console.log(id, productData);
    
            let column = DOM.createWithClasses('div', ['col']);
            ordertList.appendChild(column);
    
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
    }
}