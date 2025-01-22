import { Check, Pen, Trash } from "lucide-react";
import Input from "./Input";
import { useEffect, useState } from "react";
import axios from "axios";

interface CategoryProps {
  name: string;
  categoryId: string;
  deleteCategory: (id: string) => void;
}

const Category = (props: CategoryProps) => {
  
  return (
    <div className="min-w-52 w-full max-sm:w-full border-[1px] border-neutral-200 rounded-lg p-2 flex gap-2 h-fit justify-between">
      <p className="font-bold text-lg">{props.name}</p>
      <div className="flex gap-2 w-fit justify-end">
        <button className=" bg-red-500 p-1 rounded-lg flex items-center justify-center w-8 h-8 text-white"
        onClick={() => props.deleteCategory(props.categoryId)}>
          <Trash className="w-4" />
        </button>
      </div>
    </div>
  );
};

export default Category;
