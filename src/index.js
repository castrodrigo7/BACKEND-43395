import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";


const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/products", ProductRouter);
app.use("/carts", CartRouter);

app.listen(PORT, () =>{
  console.log(`Servidor Express Puerto ${PORT}`);
});
