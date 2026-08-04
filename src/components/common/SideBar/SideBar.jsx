import React from 'react'
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  KanbanSquare,
  CalendarDays,
  ChartColumn,
  Users,
  Bell,
  Star,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { li } from 'framer-motion/client';

function SideBar() {

  const sideBarItems = [
    { name: "Dashboard", symbol: <LayoutDashboard size={24} /> },
    { name: "Projects", symbol: <FolderKanban size={24} /> },
    { name: "Tasks", symbol: <CheckSquare size={24} /> },
    { name: "Kanban Board", symbol: <KanbanSquare size={24} /> },
    { name: "Calender", symbol: <CalendarDays size={24} /> },
    { name: "Team", symbol: <Users size={24} /> },
    { name: "Notifications", symbol: <Bell size={24} /> },
    { name: "Favorites", symbol: <Star size={24} /> },
    { name: "Settings", symbol: <Settings size={24} /> },
    { name: "Profile", symbol: <User size={24} /> },
    { name: "Logout", symbol: <LogOut size={24} /> },
  ]

  return (
    <ul className='fixed bg-surface p-6 mt-16 md:mt-20 h-full flex flex-col justify-between items-center z-20 shadow-xl '>
      {sideBarItems.map((item) => (
        <li className='flex gap-2 w-full'>{item.symbol}{item.name}</li>
      ))}
    </ul>
  )
}

export default SideBar