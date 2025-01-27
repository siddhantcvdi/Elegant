import { SidebarTrigger } from "./ui/sidebar";

const TopBar = () => {
  return (
    <div className="max-md:p-2 p-2 pl-2 sticky top-0 z-10">
      <div className="h-[60px] pl-2 bg-neutral-50 drop-shadow-sm border-[1px] border-neutral-200 flex items-center rounded-lg">
        <SidebarTrigger className="w-10 h-10" />
      </div>
    </div>
  );
};

export default TopBar;
