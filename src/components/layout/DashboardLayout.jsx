import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../common'
import Dashboard from '../dashboard/Dashboard'
function DashboardLayout() {
  return (
    <>
      <div className="flex">
        <SideBar />

        <main className="flex-1 ml-64 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default DashboardLayout