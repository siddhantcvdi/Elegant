import {
  Sheet,
  SheetContent,
  // SheetDescription,
  // SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import hamburger from '../assets/hamburger.svg'
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate()
  return (
    <Sheet>
      <div className="w-8 flex justify-center items-center md:hidden">
      <SheetTrigger>
        <div className="w-8 flex items-center justify-center">
          <img src={hamburger} alt="" className="w-8"/>
        </div>
      </SheetTrigger>
      </div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="w-full text-left poppins-medium text-2xl flex flex-col gap-3">3legant.
            <button onClick={()=>navigate('/login')}>Sign In</button>
          </SheetTitle>
          <div className="pt-4 flex flex-col justify-between h-full">
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
