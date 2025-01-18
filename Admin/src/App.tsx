import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddProduct from './Pages/AddProduct'
import { SidebarProvider } from './components/ui/sidebar'
import { AppSidebar } from './components/AppSidebar'
import TopBar from './components/TopBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <SidebarProvider>
      <AppSidebar/>
      <div className='flex flex-col w-full h-screen'>
      <TopBar/>
      <AddProduct/>
      </div>
    </SidebarProvider>
  )
}

export default App
