import React from 'react'
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  KanbanSquare,
  CalendarDays,
  Users,
  Bell,
  Star,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { NavLink } from 'react-router-dom';

function SideBar() {

  const sideBarItems = [
    { name: "Dashboard", path: "/dashboard", symbol: <LayoutDashboard size={24} /> },
    { name: "Projects", path: "/projects", symbol: <FolderKanban size={24} /> },
    { name: "Tasks", path: "/tasks", symbol: <CheckSquare size={24} /> },
    { name: "Kanban Board", path: "/kanban-board", symbol: <KanbanSquare size={24} /> },
    { name: "Calender", path: "/calendar", symbol: <CalendarDays size={24} /> },
    { name: "Team", path: "/team", symbol: <Users size={24} /> },
    { name: "Notifications", path: "/notifications", symbol: <Bell size={24} /> },
    { name: "Favorites", path: "/favorites", symbol: <Star size={24} /> },
    { name: "Settings", path: "/settings", symbol: <Settings size={24} /> },
    { name: "Profile", path: "/profile", symbol: <User size={24} /> },
    { name: "Logout", path: "/logout", symbol: <LogOut size={24} /> },
  ]

  const sideBarClass = ({ isActive }) => (
    `flex gap-2 w-full p-2 ease-in ${isActive ? "bg-primary text-white shadow-lg font-semibold rounded-sm" : "duration-200 ease-in hover:bg-primary/30 hover:text-black hover:font-semibold"}`
  )

  return (
    <aside className='left-0 top-0 h-full overflow-y-auto bg-surface z-20 shadow-md shrink-0 flex flex-col border-r border-r-gray-300 rounded-l-2xl'>
      <div className='flex justify-center items-center mx-auto gap-2'>
        <img src='src\assets\flowboard-logo.png' className=' size-16 bg-transparent' />
        <h1 className='my-6 mx-auto text-2xl font-semibold text-black'>FlowBoard</h1>
      </div>
      <ul className='p-4 flex flex-col space-y-2'>
        {sideBarItems.map((item) => (
          <li key={item.name} className='w-full cursor-pointer'>
            <NavLink to={item.path} className={sideBarClass}>
              {item.symbol} <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default SideBar