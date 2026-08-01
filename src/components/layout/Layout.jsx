import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../dashboard'
import Dashboard from '../dashboard/Dashboard'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout