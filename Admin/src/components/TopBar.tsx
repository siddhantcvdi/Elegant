import { SidebarTrigger } from "./ui/sidebar"

const TopBar = () => {
  return (
    <div className="w-[99%] h-[60px] bg-neutral-50 drop-shadow-sm border-[1px] border-neutral-200 sticky top-0 z-10 flex items-center px-2 mt-2 rounded-lg">
        <SidebarTrigger className="w-10 h-10"/>
    </div>
  )
}

export default TopBar