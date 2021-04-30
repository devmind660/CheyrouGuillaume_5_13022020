export default class DOM {
    static createWithClasses(tag, classes = []) {
        let elt = document.createElement(tag);
        classes.forEach(className => {
            elt.classList.add(className)
        });
        return elt;
    }
}