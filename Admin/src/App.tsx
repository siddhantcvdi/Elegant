import { Route, Routes } from "react-router-dom";
import './App.css'
import AddProduct from './Pages/AddProduct'
import { SidebarProvider } from './components/ui/sidebar'
import { AppSidebar } from './components/AppSidebar'
import TopBar from './components/TopBar'
import { Toaster } from "@/components/ui/toaster"

function App() {

  return (
    <SidebarProvider>
      <AppSidebar/>
      <div className='flex flex-col w-full h-screen'>
      <Toaster />
      <TopBar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
      </Routes>
      </div>
    </SidebarProvider>
  )
}

export default App
