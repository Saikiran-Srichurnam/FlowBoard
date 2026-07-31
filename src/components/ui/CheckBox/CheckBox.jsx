import React from 'react'

function CheckBox({ id, label }) {
  return (
    <div className='flex gap-1'>
      <input id={id} type="checkbox" className="cursor-pointer" />
      <label htmlFor='remember' className='text-xs text-muted'>{label}</label>
    </div>
  )
}

export default CheckBox