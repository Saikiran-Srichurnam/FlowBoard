import React from 'react'
import { Link } from 'react-router-dom'

function AuthFooter({ linkText, text, to }) {
  return (
    <div className='flex justify-center items-center gap-2'>
      <p className='text-muted text-xs'>{text}</p>
      <Link to={to} className='text-xs flex justify-center text-primary/60 items-center hover:text-body cursor-pointer underline'>{linkText}</Link>
    </div>
  )
}

export default AuthFooter