import React from 'react'


function Input({ label, type, placeholder, id, minLength }) {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        required
        className="bg-background px-3 py-2 rounded-md focus-visible:none border border-primary/30 focus-visible:ring-1 focus-visible:border-primary/50 outline-none" />
    </div>
  )
}

export default Input