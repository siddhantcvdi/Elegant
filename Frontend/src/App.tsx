import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { useUserStore } from "./store/user.store";
import useCategoriesStore from "./store/categories.store";
import Products from "./pages/Products";

const App = () => {
  const refreshAccessToken = useUserStore(store=>store.refreshAccessToken);
  const fetchCategories = useCategoriesStore(store=>store.fetchCategories);
  useEffect(()=>{
    refreshAccessToken()
    fetchCategories().then(()=>console.log("Categories fetched")).catch(err=>console.log('Error fetching categories',err))
  },[])
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products/:id" element={<Products />} />
      </Routes>
    </>
  );
};

export default App;
