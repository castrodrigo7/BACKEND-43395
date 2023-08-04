import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import * as path from "path";
import viewRouter from "./router/views.routes.js";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import ProductManager from "./controllers/ProductManager.js";

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor Express Puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

const product = new ProductManager(__dirname + "/models/products.json");

app.engine("handlebars", engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + "/views"));



app.get("/", async (req, res) => {
  let allProducts = await product.getProducts()
  res.render("home", {
    title: "Express Avanzado / Handlebars",
    products: allProducts,
  })
})
app.get("/:id", async (req, res) => {
  let prod = await product.getProductsById(req.params.id)
  res.render("prod", {
    title: "Express Avanzado / Handlebars",
    products: prod,
  })
})

app.use('/',express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/products", ProductRouter);
app.use("/carts", CartRouter);
app.use("/",viewRouter)

socketServer.on("connection",async (socket)=>{
  console.log("cliente conectado con id:" ,socket.id)
  const products = await product.getProducts({});
  socket.emit('productos', products);

  socket.on('addProduct', async data => {
      await product.addProduct(data);
      const updatedProducts = await product.getProducts({});
  socket.emit('productosupdated', updatedProducts);
    });

    socket.on("deleteProduct", async (id) => {
      console.log("ID del producto a eliminar:", id);
      const deletedProduct = await product.deleteProduct(id);
      const updatedProducts = await product.getProducts({});
      socketServer.emit("productosupdated", updatedProducts);
    });
   

})