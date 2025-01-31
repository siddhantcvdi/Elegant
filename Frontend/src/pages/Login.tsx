import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "@/store/user.store";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserStore();
  const { toast } = useToast();
  
  return (
    <div className="w-full h-nonav flex justify-center items-center poppins-regular">
      <div className="bg-white sm:bg-neutral-50 h-full w-full sm:h-fit sm:w-[400px] rounded-2xl p-6 flex flex-col gap-8 sm:-mt-16">
        <div className="flex flex-col gap-2">
          <p className="poppins-regular text-3xl text-neutral-700">Sign In</p>
          <div className="text-[12px] poppins-light flex gap-1">
            <p className=" text-neutral-500">Don't have an account yet?</p>
            <NavLink to={"/signup"} className={"text-emerald-400"}>
              Sign Up
            </NavLink>
          </div>
        </div>
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
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="w-full p-2 bg-neutral-900 text-white rounded-lg"
          onClick={() =>
            login({ email, password })
              .then(() => {
                const user = useUserStore.getState().user
                return toast({
                  description: `Welcome ${user.displayName}`,
                  className: "p-4",
                });
              })
              .catch((err) =>
                toast({
                  description: `${err}`,
                  className: "p-4",
                  variant: "destructive",
                })
              )
          }>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
