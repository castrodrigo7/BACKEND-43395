import {promises as fs} from 'fs';
import { nanoid } from 'nanoid';
import ProductManager from './ProductManager.js';

const productAll = new ProductManager();

class CartManager {
    constructor(){
        this.path = "./src/models/carts.json";
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8");
        return JSON.parse(carts);
    }

    writeCarts = async (carts) => {
        await fs.writeFile(this.path, JSON.stringify(carts));
    }

    exist = async (id) => {
        let carts = await this.readCarts();
        return carts.find((cart) => cart.id === id);
    };

    deleteCart = async (id) => {
        let carts = await this.readCarts();
        let filterCarts = carts.filter((cart) => cart.id != id);
        await this.writeCarts(filterCarts);
        return filterCarts;
    };

    addCarts = async (carts) => {
        let cartsOld = await this.readCarts()
        let id = nanoid()
        let cartConcat = [{id :id, products : []}, ...cartsOld];
        await this.writeCarts(cartConcat)
        return "Carrito Agregado";
    }

    getCartsById = async (id) =>{
        let cartsById = await this.exist(id)
        if (!cartsById) return "Carrito no encontrado"
        return cartsById
      }
    
    addProductsInCarts = async (cartId, productId) =>{
        let cartsById = await this.exist(cartId)
        if (!cartsById) return "Carrito no encontrado"
        let productsById = await productAll.exist(productId)
        if (!productsById) return "Producto no encontrado"

        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter((cart) => cart.id != cartId);

        if (cartsById.products.some((prod) => prod.id === productId)) {
            let moreProductInCart = cartsById.products.find(prod => prod.id === productId)
            moreProductInCart.cantidad++
            let cartConcat = [cartsById, ...cartFilter]
            await this.writeCarts(cartConcat)
            return "Producto sumado al Carrito"
        }

        cartsById.products.push({ id : productsById.id, cantidad: 1})

        let cartConcat = [cartsById, ...cartFilter]
        await this.writeCarts(cartConcat)
        return "Producto Agregado al Carrito"
        
      }
}

export default CartManager