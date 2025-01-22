import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import fs from "fs";

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    discount,
    stock,
    description,
    status,
    category,
    brand,
  } = req.body;

  if (
    [name, price, discount, stock, description, status, brand, category].some(
      (field) => field?.trim() === "" || !field
    )
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }

  if (req.files && Array.isArray(req.files) && req.files.length < 1) {
    throw new ApiError(400, "Please upload at least one image");
  }

  const sameNameProduct = await Product.findOne({ name });
  const images = req.files.map((file) => file.path);

  if (sameNameProduct) {
    images.forEach((image) => fs.unlinkSync(image));
    throw new ApiError(400, "Product with same name already exists");
  }

  const uploadedImages = await Promise.all(
    images.map((image) => uploadOnCloudinary(image))
  );
  console.log(uploadedImages);
  if (!uploadedImages || uploadedImages.length < 1) {
    throw new ApiError(500, "Failed to upload images, Please try again");
  }

  const product = await Product.create({
    name,
    price,
    discount,
    stock,
    brand,
    description,
    status,
    category,
    images: uploadedImages.map((image) => image.secure_url),
  });
  console.log("Product Added");

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product created successfully"));
});



const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const { priceMin, priceMax, brand, category, search, sort } = req.query;
  const filters = [];
  if (priceMin) filters.push({ price: { $gte: parseFloat(priceMin) } });
  if (priceMax) filters.push({ price: { $lte: parseFloat(priceMax) } });
  if (brand) filters.push({ brand });
  if (category) filters.push({ category });
  if (search) {
    filters.push({
      $or: [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search in name
        { description: { $regex: search, $options: "i" } }, // Case-insensitive search in description
      ],
    });
  }

  const pipeline = [{ $match: filters.length > 0 ? { $and: filters } : {} }]
  const options = {
    page,
    limit
  }

  if(sort){
    pipeline.push({$sort: {price: sort === "asc" ? 1 : -1}})
  }

  const aggregateQuery = Product.aggregate(pipeline);
  const result = await Product.aggregatePaginate(aggregateQuery, options);

  if(!result){
    throw new ApiError(404, "No products found");
  }

  return res.status(200).json(new ApiResponse(200, result, "Products fetched successfully"));
});

export { createProduct, getProducts };
