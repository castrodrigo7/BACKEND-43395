const ProductManager = require("./ProductManager.js");
let productManager = new ProductManager();
console.log(productManager);

let persistirProduct = async () => {
    let product = await productManager.createProduct('Cafe', 'Cafe tostado Juan Valdez', 2000, "http://cafe.png", "CA45CO", 35);


    let products = await productManager.productList();
    console.log(`Productos encontrados en Product Manager: ${products.length}`);
    console.log(products);
};
persistirProduct();

const productManager = new ProductManager();

productManager.addProduct("Zapatillas", "Zapatillas sports running ", 7999.99, "zapatillas.jpg", "ZAPATILLAS001", 8);
productManager.addProduct("Remera", "Remera de algodon reciclado", 2999.99, "remera.jpg", "REMERA001", 10);
productManager.addProduct("Jeans", "Slim-fit jeans", 4999.99, "jeans.jpg", "JEANS001", 5);


console.log(productManager.getProducts());

console.log(productManager.getProductById(5));