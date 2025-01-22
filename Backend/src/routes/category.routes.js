import {Router } from "express";
import { createCategory, getAllCategories, deleteCategory } from "../controllers/category.controller.js";
const categoryRouter = Router();

categoryRouter.post("/create", createCategory);
categoryRouter.get("/all", getAllCategories);
categoryRouter.delete("/delete/:id", deleteCategory);
export {categoryRouter};