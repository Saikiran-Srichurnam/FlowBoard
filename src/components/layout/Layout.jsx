import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer,SideBar } from '../common'
import Dashboard from '../dashboard/Dashboard'
function Layout() {
  return (
    <>
      <Header />
      <SideBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout