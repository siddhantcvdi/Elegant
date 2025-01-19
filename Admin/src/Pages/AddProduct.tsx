import DropInput from "@/components/DropInput";
import ImageInput from "@/components/ImageInput";
import Input from "@/components/Input";

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
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [units, setUnits] = useState();
  const [productDesc, setProductDesc] = useState("");
  const [productBrand, setProductBrand] = useState("");

  return (
    <>
      <div className="w-full h-screen">
        <div className="grid sm:grid-cols-2 p-5 gap-y-6">
          <Input
            id="prod_name"
            type="text"
            title="Product Name"
            setValue={setProductName}
            value={productName}
          />
          <DropInput
            items={["Available", "Out of Stock", "Coming Soon"]}
            title="Set Status"
            values={["av", "oos", "cs"]}
            setState={setProductStatus}
          />
          <Input
            id="prod_price"
            type="number"
            title="Price"
            setValue={setProductPrice}
            value={productPrice}
          />
          <Input
            id="prod_brand"
            type="text"
            title="Brand"
            setValue={setProductBrand}
            value={productBrand}
          />
          <DropInput
            items={["Cat1", "Cat2", "Cat3"]}
            title="Category"
            values={["12qw", "45rt", "89io"]}
            setState={setProductCategory}
          />
          <Input
            id="prod_sku"
            type="number"
            title="Units"
            setValue={setUnits}
            value={units}
          />
          <ImageInput
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />
          <div className="flex flex-col gap-6">
            <Input
              id="prod_desc"
              type="area"
              title="Description"
              setValue={setProductDesc}
              value={productDesc}
            />
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
