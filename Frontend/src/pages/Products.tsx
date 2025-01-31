import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  category: string;
  status: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  brand: string;
  images: string[];
  discountedPrice: number;
}

const Products = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL_DEPLOY;
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/products/getProducts`, {
          params: {
            page: 1,
            limit: 10,
            category
          },
        });
        setProducts(response.data.data.docs);
        console.log(products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
  
    fetchProducts();
  }, [category]);
  return (
    <div className="max-w-[1400px] mx-auto  p-4 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] poppins-regular">
      {
        products.map((product) => (
          <ProductCard
            key={product._id}
            details={product}
          />
        ))
      }
    </div>
  );
};

export default Products;
