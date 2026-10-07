import Button from "../../../components/ui/Button/index"
import Input from "../../../components/ui/Input/Input"
import { PlusIcon, Bell, User, ChevronDown, Menu } from "lucide-react"


function Header({ onMenuClick }) {

  // get the username from localstorage
  const storedUserName = localStorage.getItem("userName")

  return (
    <header className="w-full flex justify-between items-center px-3 sm:px-4 lg:px-8 py-4">

      {/* Mobile Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden w-10 h-10 flex items-center justify-center bg-surface rounded-md shadow-sm cursor-pointer"
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>

      <div className="flex justify-end items-center gap-3 sm:gap-6 w-full">

        {/* Search + Add */}
        <div className="flex items-center gap-2">

          <Input
            name="search"
            id="search"
            type="text"
            placeholder="Search Anything ..."
            className="hidden lg:block bg-surface w-80 lg:w-96 px-3"
          />

          <Button className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center cursor-pointer">
            <PlusIcon size={20} />
          </Button>

        </div>

        {/* Notifications */}
        <button
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-surface rounded-md shadow-sm cursor-pointer hover:scale-[1.05]"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        {/* User Card */}
        <div className="hidden sm:flex bg-surface py-2 px-4 rounded-xl shadow-sm gap-2 group cursor-pointer">
          <div className="p-2 border border-gray-100 rounded-full">
            <User size={20} className="text-primary" />
          </div>

          <div>
            <h3 className="font-bold text-sm text-black">
              {storedUserName || "User"}
            </h3>
            <h4 className="font-semibold text-xs">
              Admin
            </h4>
          </div>

          <button className="p-2 cursor-pointer hover:shadow-sm hover:rounded-full bg-transparent">
            <ChevronDown size={20} className="text-primary" />
          </button>
        </div>

      </div>
    </header>
  )
}

export default Header