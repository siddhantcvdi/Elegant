import { BoxesIcon, BoxIcon, BoxSelectIcon, BrickWall, Calendar, CircleUser, Home, HomeIcon, Inbox, LayoutDashboardIcon, LineChartIcon, LucideBox, Package, Package2, PersonStanding, ReceiptText, Search, Settings, ShoppingBasket, ShoppingCartIcon, Star } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Products",
    url: "#",
    icon: Package,
  },
  {
    title: "Orders",
    url: "#",
    icon: ShoppingCartIcon,
  },
  {
    title: "Customers",
    url: "#",
    icon: CircleUser,
  },
  {
    title: "Reviews",
    url: "#",
    icon: Star,
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="floating" >
      <SidebarContent>
        <SidebarGroup className="pr-10">
          <SidebarGroupLabel>Admin Portal</SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="ml-3">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
