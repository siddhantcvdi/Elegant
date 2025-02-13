import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL_DEPLOY;
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const signup = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (
      !name ||
      !email ||
      !password ||
      [name, email, password].some((field) => field.trim() === "")
    ) {
      toast({
        variant: "destructive",
        className: "p-4 ",
        description: "Enter all Details",
      });
      return;
    } else if (confirmPassword !== password) {
      toast({
        variant: "destructive",
        description: "Passwords do not match!",
      });
      return;
    }
    const url = `${backendUrl}/users/register`;
    try {
      setIsLoading(true);
      await axios.post(url, { displayName: name, email, password });
      toast({ description: "Account created successfully.", className: "p-4" });
      navigate("/login");
    } catch (err: any) {
      setIsLoading(false);
      toast({
        description: `${err.response?.data?.message || "An error occurred"}`,
        variant: "destructive",
        className: "p-4",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-nonav flex justify-center items-center poppins-regular">
      <div className="bg-white sm:bg-neutral-50 h-full w-full sm:h-fit sm:w-[400px] rounded-2xl p-6 flex flex-col gap-8 sm:-mt-16">
        <div className="flex flex-col gap-2">
          <p className="poppins-regular text-3xl text-neutral-700">Sign Up</p>
          <div className="text-[12px]  poppins-light flex gap-1">
            <p className=" text-neutral-500">Already have an account?</p>
            <NavLink to={"/login"} className={"text-emerald-400"}>
              Sign in
            </NavLink>
          </div>
        </div>
        <input
          placeholder="Your Name"
          className="poppins-light text-sm p-2 rounded-md shadow-sm outline-none border-[1px] focus:border-black"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="Your email"
          className="poppins-light text-sm p-2 rounded-md shadow-sm outline-none border-[1px] focus:border-black"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="Password"
          className="poppins-light text-sm p-2 rounded-md shadow-sm outline-none border-[1px] focus:border-black"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          placeholder="Confirm Password"
          className="poppins-light text-sm p-2 rounded-md shadow-sm outline-none border-[1px] focus:border-black"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button
          className={`w-full p-2 bg-neutral-900 poppins-light text-white rounded-lg ${isLoading ? "disabled bg-neutral-400 cursor-wait" : ""}`}
          onClick={() => signup(name, email, password, confirmPassword)}>
          {isLoading ? (
            <div className={`flex items-center justify-center gap-2 `}>
              <Loader2 className="animate-spin" />
              Creating Account
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </div>
  );
};

export default Signup;
