import List from "../../ui/list/List"
import React from 'react'
import Button from "../../../components/ui/Button/index"
import Input from "../../../components/ui/Input/Input"
import { PlusIcon, Bell, User, ChevronDown } from "lucide-react"


function Header() {

  return (
    <header className=" w-full flex justify-end px-8 py-4">
      <div className="flex justify-between items-center gap-6 ">
        <div className="flex items-center gap-2">
          <Input
            name="search"
            id="search"
            type="text"
            placeholder="Search Anything ..."
            className="bg-surface w-80 lg:w-96 px-3"
          />
          <Button className="h-12 w-12 flex items-center justify-center cursor-pointer"> <PlusIcon size={20} /> </Button>
        </div>

        {/* notification -bell button */}
        <button className="w-12 h-12 flex items-center justify-center bg-surface rounded-md shadow-sm cursor-pointer hover:scale-[1.05]"
          aria-label="Notifications" >
          <Bell className="" size={20} />
        </button>

        {/* card */}
        <div className="bg-surface py-2 px-4 rounded-xl shadow-sm flex gap-2 group cursor-pointer">
          <div className="p-2 border  border-gray-100 rounded-full ">
            <User size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-black">Saikiran</h3>
            <h4 className="font-semibold text-xs">Admin</h4>
          </div>
          <button className="p-2 cursor-pointer hover:shadow-sm hover:rounded-full bg-transparent"><ChevronDown size={20} className="text-primary" /></button>
        </div>
      </div>
    </header >
  )
}

export default Header