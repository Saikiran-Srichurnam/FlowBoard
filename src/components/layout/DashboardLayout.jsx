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
          <div className='flex justify-between'>

            <SideBar />
            <Header />
          </div>
          {/* <main className="flex-1 h-full p-6 overflow-y-auto">
            <Outlet />
          </main> */}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout