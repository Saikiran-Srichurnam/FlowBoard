import React from 'react'

function Card({ children }) {
  return (
    <div className="w-full h-screen bg-background flex justify-center items-center flex-col">
      <div className='bg-surface p-6 rounded-xl shadow-xl min-w-2xs md:max-w-2xl space-y-4'>
        {children}
      </div>
    </div>
  )
}

export default Card