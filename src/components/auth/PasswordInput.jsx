import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Input from '../ui/Input/Input'

function PasswordInput() {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Input id="Password" label="Password" type={showPassword ? "text" : "password"} placeholder="••••••••" minLength={6}/>
      <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute bottom-2 right-4'>
        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
  )
}

export default PasswordInput