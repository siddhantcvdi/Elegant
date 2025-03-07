import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    throw new ApiError(400, "Please provide product id and quantity");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.cartItems[itemIndex].quantity += quantity;
      cart.cartItems[itemIndex].price =
        product.price * cart.cartItems[itemIndex].quantity;
      cart.cartItems[itemIndex].discountedPrice = 
        product.discountedPrice * cart.cartItems[itemIndex].quantity;
    } else {
      cart.cartItems.push({
        product: productId,
        quantity,
        price: product.price * quantity,
        discountedPrice: product.discountedPrice * quantity
      });
    }

    cart.totalItems = cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.price, 0);
    cart.totalDiscountedPrice = cart.cartItems.reduce((acc, item) => acc + item.discountedPrice, 0);

    await cart.save();
    return res
      .status(200)
      .json(new ApiResponse(200, cart, "Product added to cart successfully"));
  } else {
    const newCart = new Cart({
      user: req.user._id,
      cartItems: [
        {
          product: productId,
          quantity,
          price: product.price * quantity,
          discountedPrice: product.discountedPrice * quantity
        },
      ],
      totalItems: 1,
      totalPrice: product.price * quantity,
      totalDiscountedPrice: product.discountedPrice * quantity,
    });

    await newCart.save();
    return res
      .status(201)
      .json(
        new ApiResponse(201, newCart, "Product added to cart successfully")
      );
  }
});


const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    
    if (!productId) {
        throw new ApiError(400, "Please provide product id");
    }
    
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }
    
    const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId
    );
    
    if (itemIndex > -1) {
        cart.cartItems.splice(itemIndex, 1);
        cart.totalItems = cart.cartItems.length;
        cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.price, 0);
    
        await cart.save();
        return res
        .status(200)
        .json(new ApiResponse(200, cart, "Product removed from cart successfully"));
    } else {
        throw new ApiError(404, "Product not found in cart");
    }
})

const getCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const cart = await Cart.findOne({ user: user._id }).populate("cartItems.product", "name images price discountedPrice");
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }
  res.status(200).json(new ApiResponse(200, cart, "Cart fetched successfully"));
});


export { addToCart, removeFromCart, getCart };