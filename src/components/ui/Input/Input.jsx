import React from 'react'
import { cn } from '../../../utils/cn'


function Input({ label, type, placeholder, id, minLength, className, ...rest }) {
  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label htmlFor={id}>{label}</label>
      )}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        required
        className={cn("bg-background h-12 rounded-md border border-primary/30 focus-visible:ring-1 focus-visible:border-primary/50 outline-none", className)}
        {...rest}
      />
    </div>
  )
}

export default Input