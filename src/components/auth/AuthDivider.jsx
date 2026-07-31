import React from 'react'

function AuthDivider() {
  return (
    <div className='my-2 flex justify-center items-center gap-2'>
      <div className='h-1 flex-1 bg-gray-200 rounded-3xl' />
      <span>OR</span>
      <div className='h-1 flex-1 bg-gray-200 rounded-3xl' />
    </div>
  )
}

export default AuthDivider