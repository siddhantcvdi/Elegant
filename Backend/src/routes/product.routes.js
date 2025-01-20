import { Router } from "express";
import { createProduct, getProducts } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";
const productRouter = Router();

productRouter.post("/create", upload.array('images',5), createProduct);
productRouter.get("/getProducts", getProducts);

export default productRouter;