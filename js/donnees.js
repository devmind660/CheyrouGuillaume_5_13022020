/* var request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/api/teddies");
request.addEventListener("load", () => {
    console.log (request);
    if (request.status === 200) {
        let jsonResponse = request.response;
        let response = JSON.parse(jsonResponse);
        console.log(response);
    }
    else {
        console.error(request.status);
    }
});
request.send(); */

fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(products => {
    console.log(products);
    products.forEach(product => {
        product = new Product(product);
        product.display()
    })
});

class Product {
    constructor(productData) {
        Object.assign(this, productData);
    }
    display() {
        // let product = document.createElement("div");
        let image = document.getElementById('image');
        image.innerHTML = this.imageUrl;
        // <img class=”card-img-top” src="imageUrl" alt "Peluche Ours">
        let title = document.getElementById('title');
        title.innerHTML = this.name;
        let description = document.getElementById('description');
        description.innerHTML = this.description;
        let reference = document.getElementById('reference');
        reference.innerHTML = this._id;
        let color = document.getElementById('color');
        color.innerHTML = this.colours;
        let price = document.getElementById('price');
        price.innerHTML = this.price / 100 + ' €';
    }
}