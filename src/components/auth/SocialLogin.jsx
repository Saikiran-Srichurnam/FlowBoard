import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import Button from '../ui/Button'

function SocialLogin() {
  return (
    <div className='text-center'>
      <Button variant="ghost" className="text-center border border-border rounded-3xl">
        <FcGoogle size={24} /> <p>Continue with Google</p>
      </Button>
    </div>
  )
}

export default SocialLogin