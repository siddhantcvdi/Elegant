import Category from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createCategory = asyncHandler(async (req, res) => {
    const {name} = req.body;
    if(name.trim() === "" || !name){
        throw new ApiError(400, "Category name is required");
    }
    const existingCategory = await Category.findOne({name});

    if(existingCategory){
        throw new ApiError(400, "Category already exists");
    }

    const newCategory = await Category.create({name});

    res.status(201).json(new ApiResponse(201,  newCategory,"Category created successfully"));
    
})

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    if(!categories){
        throw new ApiError(404, "Error fetching categories");
    }
    res.status(200).json(new ApiResponse(200, categories,"Categories retrieved successfully"));
})

const deleteCategory = asyncHandler(async (req, res) => {
    const id = req.params?.id;
    if(!id || id.trim() === ""){
        throw new ApiError(400, "Category id is required");
    }
    const category = await Category.findById(id);
    if(!category){
        throw new ApiError(404, "Category not found");
    }
    const deletedCat = await Category.findByIdAndDelete(id);
    if(!deletedCat){
        throw new ApiError(500, "Error deleting category, Try again later.");
    }
    res.status(200).json(new ApiResponse(200, deletedCat, "Category deleted successfully"));
})

export {createCategory, deleteCategory, getAllCategories};