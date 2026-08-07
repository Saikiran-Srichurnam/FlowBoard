import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, SideBar } from '../common'
import Dashboard from '../dashboard/Dashboard'
function DashboardLayout() {
  return (
    <div className='w-full h-full bg-white p-2'>

      {/* Big Dashboard Card */}
      <div className='bg-background w-full h-full rounded-2xl shadow-md'>

        <div className="flex h-full">
          <div className='md:w-64 h-full shrink-0'>
            <SideBar />
          </div>
          <div className='flex flex-col h-full flex-1'>
            <Header />
            <main className="flex-1 p-6 overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout