import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  name: string;
  category: string;
  status: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  brand: string;
  images: [string];
  rating: number;
  discountedPrice: number;
}

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { productId } = useParams();
  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "http://localhost:3001/api/v1/products/getProductById/" + productId
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
    return <div className="w-full h-nonav flex items-center justify-center">{product?.name}</div>;
  }
};

export default ProductDetails;
