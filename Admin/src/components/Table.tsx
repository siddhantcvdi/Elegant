import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";

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
}

export default function ProductTable() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const deleteProduct = (id: string) => {
    axios
      .delete(`http://localhost:3001/api/v1/products/deleteProduct/${id}`)
      .then((response) => {
        console.log(response.data);
        setProducts(products.filter((product) => product._id !== id));
        toast({
          title: "Product deleted successfully.",
        });
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
        toast({
          variant: "destructive",
          title: "Failed to delete product. ",
          description: `${err.response.data.message}`,
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/products/getProducts", {
        params: {
          page: currentPage,
          limit: 15,
        },
      })
      .then((response) => {
        console.log(response?.data);
        setTotalPages(response?.data?.data?.totalPages);
        console.log(totalPages);
        setProducts(response?.data?.data?.docs);
      });
  }, [currentPage]);

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-hidden pt-2 px-2">
      <ScrollArea className="rounded-md border overflow-scroll">
        <Table className="text-nowrap">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Product</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-[80px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">
                  <div className="w-10 h-10 flex justify-center items-center overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-cover rounded-sm"
                    />
                  </div>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                <TableCell>
                  {product.status.toLowerCase() === "out of stock" ? (
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20">
                      {product.status}
                    </span>
                  ) : product.status.toLowerCase() === "available" ? (
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20">
                      {product.status}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                      {product.status}
                    </span>
                  )}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => navigate("/editProduct/" + product._id)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
          }
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={
            currentPage === 1
              ? "bg-neutral-800 text-white hover:bg-neutral-800 hover:text-white"
              : ""
          }
          onClick={() => setCurrentPage(1)}
        >
          1
        </Button>
        {totalPages > 1 ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className={
                totalPages < 3
                  ? "hidden"
                  : currentPage > 1 && currentPage < totalPages
                  ? "bg-neutral-800 hover:bg-neutral-800 hover:text-white text-white"
                  : ""
              }
              onClick={() =>
                setCurrentPage((curr) => {
                  if (curr === 1) return curr + 1;
                  if (curr === totalPages) return curr - 1;
                  return curr;
                })
              }
            >
              {currentPage === totalPages
                ? currentPage - 1
                : currentPage === 1
                ? currentPage + 1
                : currentPage}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={
                currentPage === totalPages
                  ? "bg-neutral-800 hover:bg-neutral-800 hover:text-white text-white"
                  : ""
              }
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        ) : (
          <></>
        )}
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((currentPage) =>
              Math.min(currentPage + 1, totalPages)
            )
          }
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
