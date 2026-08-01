import List from "../../ui/list/List"
import React, { useState } from 'react'
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx'
import { Link, NavLink } from "react-router-dom"
import Button from "../../ui/Button"
import { path } from "framer-motion/client"

function Header() {

  const [openMenu, setOpenMenu] = useState(false)

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Testimonials", path: "/testimonials" },
  ]

  const navLinkClass = ({ isActive }) => {
    `text-xl transition-all duration-200 
    ${isActive
        ? "text-primary font-semibold underline underline-offset-4 decoration-primary"
        : "text-black hover:text-primary hover:font-semibold"
      }`;
  }

  return (
    <nav className='h-16 md:h-20 bg-surface fixed top-0 left-0 z-50 shadow-md flex justify-between items-center w-full px-8'>
      <div>FlowBoard Logo</div>

      {/* Mobile Menu */}
      <div className='relative md:hidden'>
        <button onClick={() => setOpenMenu(!openMenu)} className='cursor-pointer hover:text-primary'>
          {openMenu ? <RxCross1 size={24} /> : <RxHamburgerMenu size={24} />}
        </button>

        {openMenu && (
          <ul className='absolute mt-2 right-0 rounded-lg shadow-lg w-40 text-center leading-16 overflow-hidden bg-surface'>
            <List li="Home" />
            <List li="About" />
            <List li="Contact Us" />
            <List li="Testimonials" />
            <Link to="/login"><List li="Login" /></Link>
          </ul>)
        }
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 font-light ">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={navLinkClass}>
            {item.name}
          </NavLink>
        ))}
      </ul>
      <ul className="hidden md:flex items-center gap-8">
        <Button><Link to="/login">Login</Link></Button>
        <Button variant="secondary"><Link to="/register">Signup</Link></Button>
      </ul>
    </nav >
  )
}

export default Header