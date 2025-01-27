import Category from "@/components/Category";
import Input from "@/components/Input";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Container from "@/components/Container";

type CategoryType = {
  _id: string;
  name: string;
};

const Categories = () => {
  const [catName, setCatName] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const { toast } = useToast();
  const addCategory = () => {
    setLoading(true);
    if (catName.trim() === "") {
      toast({
        variant: "destructive",
        title: "Please enter a category name.",
      });
      setLoading(false);
      return;
    }
    axios
      .post("http://localhost:3001/api/v1/categories/create", {
        name: catName,
      })
      .then((res) => {
        if (res?.data?.data) {
          setCatName("");
          console.log(res.data);
          setCategories([...categories, res.data.data]);
          toast({
            title: "Category added successfully.",
          });
          setLoading(false);
        }
      })
      .catch((err: any) => {
        toast({
          variant: "destructive",
          title: "Error adding category.",
          description:
            err?.response?.data?.message || "Please try again later.",
        });
        setLoading(false);
      });
  };

  const deleteCategory = (id: string) => {
    axios
      .delete(`http://localhost:3001/api/v1/categories/delete/${id}`)
      .then((res) => {
        if (res?.data?.data) {
          toast({
            title: "Category deleted successfully.",
          });
        }
        setCategories(categories.filter((category) => category._id !== id));
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error deleting category.",
          description:
            err?.response?.data?.message || "Please try again later.",
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/categories/all")
      .then((res) => {
        if (res?.data.data && Array.isArray(res.data.data)) {
          setCategories(res.data.data);
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Error loading categories.",
        });
      });
  }, []);

  return (
    <Container>
      <div className="h-full py-2  overflow-hidden flex flex-col">
        <div className="min-w-[50%] w-fit h-54 border-[1px] border-neutral-200 rounded-lg flex flex-col gap-2 p-2 max-sm:w-full">
          <p className="font-bold text-lg">Add Category</p>
          <Input
            id="cat_name"
            type="text"
            title="Category Name"
            setState={setCatName}
            state={catName}
            className="w-full"
          />
          <button
            className={`w-full bg-neutral-800 p-1 rounded-lg text-white disabled:opacity-70`}
            disabled={loading}
            onClick={addCategory}
          >
            {loading ? (
              <div className="flex justify-center gap-2">
                <Loader2 className="animate-spin w-5" />
                Adding Category
              </div>
            ) : (
              "Add Category"
            )}
          </button>
        </div>
        <ScrollArea className="flex-1 mt-2">
          <div className="grid py-2 grid-cols-[repeat(auto-fill,minmax(208px,1fr))] gap-2">
            {categories.map((category) => (
              <Category
                name={category.name}
                categoryId={category._id}
                deleteCategory={deleteCategory}
                key={category._id}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </Container>
  );
};

export default Categories;
