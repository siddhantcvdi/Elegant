import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";
const productRouter = Router();

productRouter.post("/create", upload.array('images',5), createProduct);

export default productRouter;