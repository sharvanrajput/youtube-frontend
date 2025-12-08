import { AppSidebar } from '@/components/AppSidebar'
import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (


    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <Navbar />
        <div className="p-2">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>

  )
}

export default Layout