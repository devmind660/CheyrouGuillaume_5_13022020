import Cart from './class/Cart.js';

const cart = new Cart();

let form = document.getElementById('orderForm');

// Écoute de la modification des champs de texte
form.lastName.addEventListener("change", function() {
    textValid(this);
});
form.firstName.addEventListener("change", function() {
    textValid(this);
});
form.email.addEventListener("change", function() {
    emailValid(this);
});
form.address.addEventListener("change", function() {
    addressValid(this);
});
form.city.addEventListener("change", function() {
    textValid(this);
});

// Validation de l'input text
let textValid = function(textInput) {

    // RegExp text
    let textRegExp = new RegExp('.{2,}', 'g');
    
    // Récupération de la balise <small>
    let errorMessage = textInput.nextElementSibling;

    // Test de la RegExp
    if(!textRegExp.test(textInput.value)) {
        errorMessage.innerHTML = 'Ce champ texte doit comporter au moins 2 caractères';
        errorMessage.classList.add('text-danger');
        return false
    } else {
        errorMessage.innerHTML = '';
        errorMessage.classList.remove('text-danger');
        return true;
    }
};

// Validation de l'input email
const emailValid = function(emailInput) {

    // RegExp email
    let emailRegExp = new RegExp('^[a-z0-9.-_]+([@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10})$', 'g');

    // Récupération de la balise <small>
    let errorMessage = emailInput.nextElementSibling;

    // Test de la RegExp
    if(!emailRegExp.test(emailInput.value)) {
        errorMessage.innerHTML = 'L\'adresse mail doit être au format exemple@mail.fr';
        errorMessage.classList.add('text-danger');
        return false
    } else {
        errorMessage.innerHTML = '';
        errorMessage.classList.remove('text-danger');
        return true;
    }
};

// Validation de l'input address
const addressValid = function(addressInput) {

    // RegExp address
    let addressRegExp = new RegExp('.{5,}', 'g');

    // Récupération de la balise <small>
    let errorMessage = addressInput.nextElementSibling;

    // Test de la RegExp
    if(!addressRegExp.test(addressInput.value)) {
        errorMessage.innerHTML = 'L\'adresse postale doit comporter au moins 5 caractères';
        errorMessage.classList.add('text-danger');
        return false
    } else {
        errorMessage.innerHTML = '';
        errorMessage.classList.remove('text-danger');
        return true;
    }
};

// Écoute de la soumission du formulaire
form.addEventListener('submit', (e) => { 
    e.preventDefault(); // Empêche le bouton submit d'envoyer les données
    if(textValid(form.lastName) && textValid(form.firstName) && emailValid(form.email) && addressValid(form.address) && textValid(form.city) ) {

        let contact = {
            lastName : form.lastName.value,
            firstName : form.firstName.value,
            email : form.email.value,
            address : form.address.value,
            city : form.city.value
        }

        let productId = Object.keys(cart.content);

        let body = {
            contact : contact,
            products : productId
        }

        fetch("http://localhost:3000/api/teddies/order", {
            method: 'POST',
            headers: {
                'content-type' : "application/json"
            },
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(function (response) {
            if (response.orderId) {
                localStorage.setItem('orderId', response.orderId);
                window.location.href = "order.html";    
            } else {
                throw 'Pas de numéro de commande'
            }
        }) .catch(function (error) {
            console.error(error);
        })
    }
});