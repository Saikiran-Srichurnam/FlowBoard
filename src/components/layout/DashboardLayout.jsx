import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, SideBar } from '../common'
import Dashboard from '../../pages/DashboardPage/Dashboard'
function DashboardLayout() {
  return (
    <div className='w-full h-full bg-background p-2'>

      {/* Big Dashboard Card */}
      <div className='bg-background w-full h-full rounded-2xl shadow-md'>

        <div className='flex h-full'>
          <div className="flex">
            <div className='md:w-64'>
              <SideBar />
            </div>
          </div>
          <div className='flex flex-col h-full flex-1 shrink-0'>
            <Header />
            <main className="flex-1 p-4 mx-2 my-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div >
  )
}

export default DashboardLayout