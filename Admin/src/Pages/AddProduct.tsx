import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Delete,
  LucideDelete,
  PlusCircle,
  PlusSquareIcon,
  Trash,
} from "lucide-react";

import { ChangeEvent, useState } from "react";

const AddProduct = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      setSelectedFiles(imageFiles);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <div className="grid sm:grid-cols-2 p-5 gap-y-6">
          <div className="flex flex-col text-xs gap-1 text-neutral-600 font-medium">
            <label htmlFor="prod_name">Product Name</label>
            <input
              type="text"
              id="prod_name"
              className="text-sm w-full sm:w-[70%] p-2 border-[1px] border-gray-200 rounded-md"
            />
          </div>
          <div className="flex flex-col text-xs gap-1 text-neutral-600 font-medium">
            <label htmlFor="stock_status">Stock Status</label>
            <Select>
              <SelectTrigger className="w-[70%] max-sm:w-full font-normal">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="comingSoon">Coming Soon</SelectItem>
                  <SelectItem value="outOfStock">Out of stock</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col text-xs gap-1 text-neutral-600 font-medium">
            <label htmlFor="prod_price">Price</label>
            <input
              type="text"
              id="prod_price"
              className="text-sm w-full sm:w-[70%] p-2 border-[1px] border-gray-200 rounded-md"
            />
          </div>
          <div className="flex flex-col text-xs gap-1 text-neutral-600 font-medium">
            <label htmlFor="prod_qty">Available Quantity</label>
            <input
              type="text"
              id="prod_qty"
              className="text-sm w-full sm:w-[70%] p-2 border-[1px] border-gray-200 rounded-md"
            />
          </div>
          <div className="flex flex-col text-xs gap-1 text-neutral-600 font-medium">
            <label htmlFor="stock_status">Select Category</label>
            <Select>
              <SelectTrigger className="w-[70%] max-sm:w-full font-normal">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="comingSoon">Coming Soon</SelectItem>
                  <SelectItem value="outOfStock">Out of stock</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col text-xs gap-1">
            <label htmlFor="prod_units">Units</label>
            <input
              type="number"
              id="prod_units"
              className="text-sm w-full sm:w-[70%] p-2 border-[1px] border-gray-200 rounded-md"
            />
          </div>
          <div className="flex flex-col text-xs gap-1 text-neutral-600 font-medium ">
            <label>Add Images</label>
            <div className="flex w-[70%] max-md:w-full">
              <label
                htmlFor="img_selector"
                className="w-[70%] max-md:w-full text-sm flex flex-1 items-center justify-center border border-gray-300 rounded-md h-9 bg-white cursor-pointer hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500"
              >
                <PlusCircle className="w-4" color="#555" />
              </label>
              <button
                className="rounded-lg bg-red-500 w-9 flex justify-center items-center ml-2"
                onClick={() => setSelectedFiles([])}
              >
                <Trash className="w-4" color="#fff" />
              </button>
            </div>
            <input
              type="file"
              id="img_selector"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
            {selectedFiles.length > 0 && (
              <div className="max-sm:w-full w-[70%]">
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-full h-24 rounded-md overflow-hidden border border-gray-300"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Selected ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col text-xs gap-1">
              <label htmlFor="prod_desc">Description</label>
              <textarea
                id="prod_desc"
                className="text-sm w-full sm:w-[70%] p-2 border-[1px] border-gray-200 rounded-md h-32 resize-none"
              />
            </div>
            <button className="max-md:w-full w-[70%] bg-neutral-800 text-white rounded-xl font-light p-3">
              Add Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
