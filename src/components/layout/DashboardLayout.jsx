
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, SideBar } from "../common";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-full w-full bg-background p-2">
      <div className="h-full w-full rounded-2xl bg-background shadow-md">
        <div className="flex h-full min-w-0">

          {/* Desktop Sidebar */}
          <div className="hidden shrink-0 lg:block lg:w-64">
            <SideBar />
          </div>

          {/* Mobile Sidebar */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setIsSidebarOpen(false)}
              />

              <div className="relative h-full w-64 bg-background shadow-xl">
                <SideBar />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex h-full min-w-0 flex-1 flex-col">
            <Header
              onMenuClick={() => setIsSidebarOpen(true)}
            />

            <main className="w-full min-w-0 flex-1 p-2 sm:p-4 lg:p-6">
              <Outlet />
            </main>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
