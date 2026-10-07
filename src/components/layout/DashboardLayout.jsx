import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Header, SideBar } from "../common"

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="w-full h-full bg-background p-2">

      {/* Big Dashboard Card */}
      <div className="bg-background w-full h-full rounded-2xl shadow-md">

        <div className="flex h-full min-w-0">

          {/* Desktop Sidebar */}
          <div className="hidden lg:block shrink-0 lg:w-64">
            <SideBar />
          </div>

          {/* Mobile Sidebar */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">

              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setIsSidebarOpen(false)}
              />

              {/* Sidebar */}
              <div className="relative h-full w-64 bg-background shadow-xl">
                <SideBar />
              </div>

            </div>
          )}

          {/* Main Content */}
          <div className="flex flex-col h-full flex-1 min-w-0">
            <Header
              onMenuClick={() => setIsSidebarOpen(true)}
            />

            <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6 mx-2 my-auto">
              <Outlet />
            </main>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DashboardLayout