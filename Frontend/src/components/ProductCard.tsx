import { Loader2, Star } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { useUserStore } from "@/store/user.store";
import { useToast } from "@/hooks/use-toast";

interface ProductProps {
  details: {
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
  };
}

const ProductCard = (props: ProductProps) => {
  const { details } = props;
  const imageRef = useRef<HTMLImageElement>(null);
  const { token } = useUserStore();
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();
  const addToCart = (productId: string, qty: number = 1) => {
    setIsLoading(true);
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL_DEPLOY,
      withCredentials: true,
    });
    axiosInstance
      .post(
        `${import.meta.env.VITE_BACKEND_URL_DEPLOY}/cart/add`,
        {
          productId,
          quantity: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setIsLoading(false);
        toast({
          title: "Added to Cart",
          description: "Product added to cart successfully",
        })
        console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "There was a problem adding product to cart",
          variant: "destructive"})
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center poppins-regular">
      <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md scale-95">
        <NavLink
          to={`/products/${category}/${details._id}`}
          className="relative  mx-3 mt-3 flex justify-center h-44 md:h-72 overflow-hidden rounded-xl">
          <img
            ref={imageRef}
            className="object-contain bg-gray-100 h-full hover:scale-105 duration-300"
            alt="product image"
            src={details.images[0]}
            onMouseEnter={() => (imageRef.current!.src = details.images[1])}
            onMouseLeave={() => (imageRef.current!.src = details.images[0])}
          />
        </NavLink>
        <div className="mt-4 px-2  md:px-5 pb-2 md:pb-5">
          <div className="flex gap-1 text-xs justify-start items-center rounded-full border w-fit px-2 h-fit py-0.5 mb-1">
            {details.rating}
            <Star width={12} height={12} color="#efbf04" fill="#efbf04" />
          </div>
          <NavLink
            to={`/products/${category}/${details._id}`}
            className="hover:text-primary-500 ">
            <h5 className="text-sm md:text-lg tracking-tight text-slate-900 text-ellipsis overflow-hidden text-nowrap ">
              {details.name}
            </h5>
          </NavLink>
          <div className="mt-1 mb-2 md:mb-3 flex items-center justify-between">
            <p className="flex gap-1 items-center">
              <span className="text-lg md:text-2xl font-bold text-slate-900">
                ₹{details.discountedPrice}
              </span>
              <span className="text-xs md:text-sm text-slate-900 line-through">
                ₹{details.price}
              </span>
            </p>
            <div className="flex items-center text-red-500">
              -{details.discount}%
            </div>
          </div>
          <Button
            className="w-full hidden md:block"
            onClick={() => addToCart(details._id)}>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Adding to Cart...
              </div>
            ) : (
              "Add to Cart"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
