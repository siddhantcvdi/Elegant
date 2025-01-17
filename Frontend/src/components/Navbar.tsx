import { NavLink, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import cart from "../assets/cart.svg";
import account from "../assets/account.svg";
import SideMenu from "./SideMenu";
import { useUserStore } from "@/store/user.store";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const token = useUserStore((store)=>store.token)
  const logout = useUserStore((state)=>state.logout)
  const {toast} = useToast()
const loginPage = useNavigate();
const loggedIn = false;
  return (
    <nav className="sticky top-0 z-10 ">
      <div className="w-full h-[60px] bg-neutral-100 flex items-center px-10 justify-between max-sm:px-5">
        <NavLink to={'/'}>
          <div className="logo poppins-medium text-2xl">3legant.</div>
        </NavLink>
        <div className="links gap-6 hidden md:flex">
          <NavLink to={"/"}>Home</NavLink>
          <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              Categories
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="font-semibold cursor-pointer">All Products</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Living Room</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Bed Room</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Kitchen</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Lamps</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Vases</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Paintings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/contact"}>Contact Us</NavLink>
        </div>
        <div className="flex items-center gap-4">
          
          <input placeholder="Search Products" className="max-sm:hidden poppins-light text-sm px-2 py-1.5 rounded-md shadow-sm outline-none border-[1px] focus:border-black" />
          <NavLink to={"/cart"}>
            <div className="w-8 flex items-center justify-center">
              <img src={cart} alt="" />
            </div>
          </NavLink>
          <div className="flex items-center max-sm:hidden">
            {
            (token !== '')?
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="w-8 flex items-center justify-center">
                  <img src={account} alt="" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-5"     >
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem className="p-1">
                    <button className="w-full h-full bg-neutral-800 px-2 py-1.5 text-white rounded-md"
                    onClick={()=>logout(token)
                    .then(()=>toast({description: "Logged out successfully.", className: "p-4"}))
                    .catch(()=>toast({description: "Error logging out.", className: "p-4", variant: "destructive"}))}>Log Out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            :
            <button onClick={()=>loginPage('/login')} className=" py-1.5 px-4 bg-neutral-900 text-white rounded-md">
              Sign In
            </button>
            }
          </div>
            <SideMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
