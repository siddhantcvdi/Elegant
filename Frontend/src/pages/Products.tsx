import ProductCard from "@/components/ProductCard";
import { useLoadingStore } from "@/store/loading.store";
import axios from "axios";
import { Loader2 } from "lucide-react";
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
  rating: number;
}

const Products = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL_DEPLOY;
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const {loading, setLoading} = useLoadingStore();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading("products",true);
        const response = await axios.get(`${backendUrl}/products/getProducts`, {
          params: {
            page: 1,
            limit: 10,
            category,
          },
        });
        setProducts(response.data.data.docs);
        console.log(products);
      } catch (err) {
        setLoading("products",false);
        console.error("Error fetching products:", err);
      } finally {
        setLoading("products",false);
      }
    };

    fetchProducts();
  }, [category]);
  if (loading["products"]) {
    return (
      <div className="w-full h-nonav flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  } else if(products.length !== 0) {
    return (
      <div className="max-w-[1400px] mx-auto p-4 grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] poppins-regular">
        {products.map((product) => (
          <ProductCard key={product._id} details={product} />
        ))}
      </div>
    );
  }else{
    return (
      <div className="w-full h-nonav flex flex-col items-center justify-center">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png" alt="" 
        className="w-52"/>
        <h1 className="text-2xl">No products found</h1>
      </div>
    );
  }
  };

export default Products;
