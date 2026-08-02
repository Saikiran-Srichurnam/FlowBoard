import React from 'react'

function List({ li }) {
  return (
    <li className="hover:bg-primary/10 hover:text-primary text-black duration-300 ease-in-out tracking-wider">{li}</li>
  )
}

export default List