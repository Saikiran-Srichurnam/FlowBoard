import List from "../../ui/list/List"
import React, { useState } from 'react'
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx'
import { Link, NavLink } from "react-router-dom"
import Button from "../../ui/Button"
import Home from "../../dashboard/Home"

function Header() {

  const [openMenu, setOpenMenu] = useState(false)

  const navItems = [
    { name: "Features", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Testimonials", path: "/testimonials" },
  ]

  const navLinkClass = ({ isActive }) => (
    `text-md font-semibold transition-all duration-200 text-black
    ${isActive
      ? "text-primary underline underline-offset-4"
      : "text-gray-400"
    }`
  )

  return (
    <header className="my-6">
      header
    </header >
  )
}

export default Header