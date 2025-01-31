import { ImageDisplay } from "@/components/ImageDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Heart, Loader2, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown'

interface Product {
  name: string;
  category: string;
  status: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  brand: string;
  images: string[];
  rating: number;
  discountedPrice: number;
}

const ProductDetails = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL_DEPLOY;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${backendUrl}/products/getProductById/` + productId
        );
        setProduct(res.data.data);
      } catch (_) {
        toast({
          variant: "destructive",
          title: "Error loading product.",
        });
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProductDetails();
  }, []);
  if (isLoading) {
    return (
      <div className="w-full h-nonav flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  } else {
    return (
      <div className="w-full h-nonav poppins-regular">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product?.images && <ImageDisplay images={product?.images} />}
            {/* Product Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-current text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">11 Reviews</span>
              </div>

              <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-2xl font-bold">
                  ₹{product?.discountedPrice}
                </span>
                <span className="text-gray-500 line-through">
                  ₹{product?.price}
                </span>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}>
                    +
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-6">
                <Button variant={"outline"} className="w-full md:w-1/2">
                  Add to Cart
                </Button>
                <Button className="w-full md:w-1/2">Buy Now</Button>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold border p-3 rounded-t-xl">Product Description</h2>
            <div className="p-3 pt-4 border border-t-0 rounded-b-xl prose leading-relaxed tracking-wide">
              {product?.description}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <div className="border-b">
              <div className="flex gap-8 mb-4">
                <button className="font-medium border-b-2 border-black pb-4">
                  Reviews
                </button>
              </div>
            </div>

            <div className="py-8">
              <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-current text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">11 Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetails;
