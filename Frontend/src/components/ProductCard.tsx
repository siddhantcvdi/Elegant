import { ShoppingCart } from "lucide-react";

interface ProductProps {
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
}

const ProductCard = (props: ProductProps) => {
  console.log(props);
  
  return (
    <div className="flex justify-center">
      <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md scale-95">
        <a
          className="relative mx-3 mt-3 flex h-72 overflow-hidden rounded-xl"
          href="#">
          <img
            className="object-contain"
            src={props.imageUrl}
            alt="product image"
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {props.discount}% OFF
          </span>
        </a>
        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-lg tracking-tight text-slate-900">
              {props.name}
            </h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p className="flex gap-1 items-center">
              <span className="text-2xl font-bold text-slate-900">${(1-(props.discount/100))*props.price}</span>
              <span className="text-sm text-slate-900 line-through">${props.price}</span>
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
