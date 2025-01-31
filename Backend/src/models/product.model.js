import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
    },
    discount: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


productSchema.pre("save", function (next) {
  this.discountedPrice = this.price - (this.price * this.discount) / 100;
  next();
});

productSchema.plugin(aggregatePaginate);
const Product = mongoose.model("Product", productSchema);

export default Product;
