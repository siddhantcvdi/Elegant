import { ChartNoAxesGantt, CircleUser, LayoutDashboardIcon, Package, PlusSquare, ShoppingCartIcon, Star } from "lucide-react"

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
import { NavLink } from "react-router-dom"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Add Product",
    url: '/addproduct',
    icon: PlusSquare
  },
  {
    title: "Categories",
    url: "/categories",
    icon: ChartNoAxesGantt,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingCartIcon,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: CircleUser,
  },
  {
    title: "Reviews",
    url: "/reviews",
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
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
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
