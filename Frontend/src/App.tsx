import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { useUserStore } from "./store/user.store";

const App = () => {
  const refreshAccessToken = useUserStore(store=>store.refreshAccessToken);
  useEffect(()=>{
    refreshAccessToken()
  },[])
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
