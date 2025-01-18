import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from 'fs';

const createProduct = asyncHandler(async (req, res) => {

    const { name, price, discount, rating, stock, description, status, categories } = req.body;

    if([name, price, discount, rating, stock, description, status, categories].some((field)=> field?.trim() === '' || !field)){
        throw new ApiError(400, 'Please fill all the fields');

    }

    if(req.files && Array.isArray(req.files) && req.files.length < 1){
        throw new ApiError(400, 'Please upload at least one image');
    }

    const sameNameProduct = await Product.findOne({name});
    const images = req.files.map((file) => file.path);

    if(sameNameProduct){
        images.forEach((image) => fs.unlinkSync(image));
        throw new ApiError(400, 'Product with same name already exists');
    }

    const uploadedImages = await Promise.all(images.map((image) => uploadOnCloudinary(image)));
    console.log(uploadedImages);
    if(!uploadedImages || uploadedImages.length < 1){
        throw new ApiError(500, 'Failed to upload images, Please try again');
    }

    const product = await Product.create({
        name,
        price,
        discount,
        rating,
        stock,
        description,
        status,
        categories,
        images: uploadedImages.map((image) => image.secure_url)
    });

    return res.status(200).json(new ApiResponse(200,product, 'Product created successfully'));
});

export {createProduct}