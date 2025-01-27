import { Router } from "express";
import { createProduct, getProducts, deleteProduct, getProductById, editProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";
const productRouter = Router();

productRouter.post("/create", upload.array('images',5), createProduct);
productRouter.get("/getProducts", getProducts);
productRouter.delete("/deleteProduct/:id", deleteProduct);
productRouter.get("/getProductById/:id", getProductById);
productRouter.post("/editProduct", upload.array('images',5), editProduct);

export default productRouter;