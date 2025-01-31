import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

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
  }
}

const ProductCard = (props: ProductProps) => {
  const { details } = props;
  const [isHovered, setIsHovered] = useState(false);
  const {category} = useParams();
  return (
    <div className="flex justify-center">
      <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md scale-95">
        <NavLink to={`/products/${category}/${details._id}`} className="relative mx-3 mt-3 flex h-72 overflow-hidden rounded-xl">
        <img
            className="object-contain hover:scale-105 duration-300"
            src={isHovered ? details.images[1] : details.images[0]}
            alt="product image"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </NavLink>
        <div className="mt-4 px-5 pb-5">
         <NavLink to={`/products/${category}/${details._id}`} className="hover:text-primary-500">
            <h5 className="text-lg tracking-tight text-slate-900">
              {details.name}
            </h5>
          </NavLink>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p className="flex gap-1 items-center">
              <span className="text-2xl font-bold text-slate-900">${details.discountedPrice}</span>
              <span className="text-sm text-slate-900 line-through">${details.price}</span>
            </p>
            <div className="flex items-center"></div>
          </div>
          <button
            className="flex items-center gap-2 justify-center rounded-md bg-neutral-800 px-5 py-2.5 text-center text-md font-medium text-white hover:bg-neutral-700 w-full">
            <ShoppingCart width={15}/>
            <p>Add to Cart</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
