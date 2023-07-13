class ProductManager {

  #products;
  #productDirPath;
  #productFilePath;
  #fileSystem;

  constructor() {
    this.#products = [];
    this.productId = 1;
    this.#productDirPath = "./files";
    this.#productFilePath = this.#productDirPath + "/Products.json";
    this.#fileSystem = require("fs");
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {

    const existingProduct = this.products.find(product => product.code === code);
    if (existingProduct) {
      throw new Error('Ya existe un producto con ese código');
    }

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error('Todos los campos son obligatorios');
    }
    
    let newProduct = new Product(title, description, price, thumbnail, code, stock);
      console.log("Crear Producto: producto a registrar:");
      console.log(newProduct);

    try {
        await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });
        if (!this.#fileSystem.existsSync(this.#productFilePath)) {
            await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
        }

        //leemos el archivo
        let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8"); // []

        //Cargamos los productos encontrados para agregar el nuevo:
        //Obtenemos el JSON String 
        console.info("Archivo JSON obtenido desde archivo: ");
        console.log(productsFile);
        this.#products = JSON.parse(productsFile);

        console.log("Productos encontrados: ");
        console.log(this.#products);
        this.#products.push(newProduct);
        console.log("Lista actualizada de productos: ");
        console.log(this.#products);

        //Se sobreescribe el archivos de productos para persistencia.
        await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2, '\t'));
    } catch (error) {
        console.error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
        throw Error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
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

  getProducts= async () => {
    try {
      await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });

      if (!this.#fileSystem.existsSync(this.#productFilePath)) {
          await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
      }

      let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");

      console.info("Archivo JSON obtenido desde archivo: ");
      console.log(productsFile);
      this.#products = JSON.parse(productsFile);
      console.log("Productos encontrados: ");
      console.log(this.#products);
      return this.#products;

    } catch (error) {
        console.error(`Error consultando los usuarios por archivo, valide el archivo: ${this.#productDirPath}, 
          detalle del error: ${error}`);
        throw Error(`Error consultando los usuarios por archivo, valide el archivo: ${this.#productDirPath},
          detalle del error: ${error}`);
    }
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      console.error('Not found');
    }
    return product;
  }
}


module.exports = ProductManager;