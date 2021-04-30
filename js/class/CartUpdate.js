export default class Cart {

    constructor() {
        localStorage.setItem('cart', JSON.stringify(this.content));
    }
}