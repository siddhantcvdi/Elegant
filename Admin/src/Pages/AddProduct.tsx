import DropInput from "@/components/DropInput";
import ImageInput from "@/components/ImageInput";
import Input from "@/components/Input";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader, Loader2 } from "lucide-react";

interface Product {
  name: string;
  category: string;
  status: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  brand: string;
  images: File[];
}

type CategoryType = {
  _id: string;
  name: string;
};


const AddProduct = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [units, setUnits] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const { toast } = useToast();

  const handleAddProduct = async () => {
    if ([productName, productStatus, productDesc, productBrand].some((field) => field.trim() === "") ||
        [productPrice, discount, units].some((field) => field === undefined || field === null)) {
      toast({
        variant: "destructive",
        title: "Please fill all the fields.",
      });
      return;
    }

    if (productPrice! <= 0) {
      toast({
        variant: "destructive",
        title: "Price and Units must be greater than 0.",
      });
      return;
    }

    if (discount! < 0 || discount! > 100) {
      toast({
        variant: "destructive",
        title: "Discount must be between 0 and 100.",
      });
      return;
    }

    if (selectedFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Please upload atleast one image.",
      });
      return;
    }

    const product: Product = {
      name: productName,
      category: productCategory,
      status: productStatus,
      price: productPrice!,
      discount: discount!,
      stock: units!,
      description: productDesc,
      brand: productBrand,
      images: selectedFiles,
    };

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("status", product.status);
    formData.append("price", product.price.toString());
    formData.append("discount", product.discount.toString());
    formData.append("stock", product.stock.toString());
    formData.append("description", product.description);
    formData.append("brand", product.brand);

    product.images.forEach((file) => {
      formData.append("images", file);
    });

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast({
        title: "Product added successfully.",
      });
      console.log("Response:", response.data);

    } catch (err: any) {
      console.error("Error adding product:", err);
      toast({
        variant: "destructive",
        title: "Failed to add product. ",
        description: `${err.response.data.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/categories/all")
    .then(res => {
      if(res?.data.data && Array.isArray(res.data.data)) {
        setCategories(res.data.data);
      }
    })
    .catch(() => {
      toast({
        variant: "destructive",
        title: "Error loading categories.",
      });
    })
  },[])
  return (
    <>
      <div className="w-full flex-1">
        <div className="grid sm:grid-cols-2 p-5 gap-y-6">
          <Input
            id="prod_name"
            type="text"
            title="Product Name"
            setState={setProductName}
            state={productName}
            className="w-full sm:w-[70%]"
          />
          <DropInput
            items={["Available", "Out of Stock", "Coming Soon"]}
            title="Set Status"
            values={["Available", "Out of Stock", "Coming Soon"]}
            setState={setProductStatus}
            className="w-full sm:w-[70%]"
          />
          <Input
            id="prod_price"
            type="number"
            title="Price"
            setState={setProductPrice}
            state={productPrice}
            className="w-full sm:w-[70%]"
          />
          <Input
            id="prod_brand"
            type="text"
            title="Brand"
            setState={setProductBrand}
            state={productBrand}
            className="w-full sm:w-[70%]"
          />
          <DropInput
            items={categories.map((category) => category.name)}
            title="Category"
            values={categories.map((category) => category._id)}
            setState={setProductCategory}
            className="w-full sm:w-[70%]"
          />
          <Input
            id="prod_units"
            type="number"
            title="Units"
            setState={setUnits}
            state={units}
            className="w-full sm:w-[70%]"
          />
          <ImageInput
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />
          <div className="flex flex-col gap-6">
            <Input
              id="prod_discount"
              type="number"
              title="Discount"
              setState={setDiscount}
              state={discount}
              className="w-full sm:w-[70%]"
            />
            <Input
              id="prod_desc"
              type="area"
              title="Description"
              setState={setProductDesc}
              state={productDesc}
              className="w-full sm:w-[70%]"
            />
            <button
              className={`max-md:w-full w-[70%] bg-neutral-800 text-white rounded-xl font-light p-3 ${isLoading ? "cursor-not-allowed bg-neutral-700 disabled" : "cursor-pointer"}`}
              onClick={handleAddProduct}
            >
              {isLoading ? <div className="flex gap-2 w-full justify-center"><Loader2 className="animate-spin" />Adding Product</div> : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
