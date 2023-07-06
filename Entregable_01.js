class ProductManager {
    constructor() {
      this.products = [];
      this.productId = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      const existingProduct = this.products.find(product => product.code === code);
      if (existingProduct) {
        throw new Error('Ya existe un producto con ese código');
      }
  
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error('Todos los campos son obligatorios');
      }
  
      const product = {
        id: this.productId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(product);
      this.productId++;
      return product;
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
          console.error('Not found');
        }
        return product;
    }
}

const productManager = new ProductManager();

productManager.addProduct("Zapatillas", "Zapatillas sports running ", 7999.99, "zapatillas.jpg", "ZAPATILLAS001", 8);
productManager.addProduct("Remera", "Remera de algodon reciclado", 2999.99, "remera.jpg", "REMERA001", 10);
productManager.addProduct("Jeans", "Slim-fit jeans", 4999.99, "jeans.jpg", "JEANS001", 5);


console.log(productManager.getProducts());

console.log(productManager.getProductById(5));