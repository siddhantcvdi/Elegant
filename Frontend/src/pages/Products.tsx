import ProductCard from "@/components/ProductCard";
import React from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="max-w-[1400px] mx-auto p-4 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default Products;
