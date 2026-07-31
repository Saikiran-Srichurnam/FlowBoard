import React from 'react'

function Card({ children, className }) {
  return (
    <div className="w-full h-screen bg-background flex justify-center items-center flex-col">
      <div className={`${className} bg-surface p-6 rounded-xl shadow-xl space-y-4`}>
        {children}
      </div>
    </div>
  )
}

export default Card