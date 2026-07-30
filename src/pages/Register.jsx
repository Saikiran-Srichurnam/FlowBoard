import React from 'react'
import Card from '../components/ui/Card/Card'
import Input from '../components/ui/Input/Input'
import { Link } from "react-router-dom"
import Button from '../components/ui/Button'
import { FcGoogle } from 'react-icons/fc'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'


function Register() {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card>
      <form className='space-y-2 px-8 mt-8'>
        {/* username */}
        <Input id="name" label="Username" type="text" placeholder="Saikiran" />

        {/* Email input */}
        <Input id="Email" label="Email" type="email" placeholder="you@gmail.com" />

        {/* Password input */}
        <div className='relative'>
          <Input id="Password" label="Password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
          <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute bottom-2 right-4'>
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-1'>
            {/* checkbox */}
            <input id="remember" type="checkbox" className="cursor-pointer" />
            <label htmlFor='remember' className='text-xs text-muted'>Remember me</label>
            {/* forgot password */}
          </div>
          <div>
            <Link to="/forgot-password" className='text-xs flex justify-center text-muted items-center hover:text-primary/60 cursor-pointer underline'>Forgot Password ?</Link>
          </div>
        </div>

        {/* login button */}
        <div className='flex items-center justify-center mt-6'>
          <Button type="submit" variant="primary" className="tracking-wider w-full">Register</Button>
        </div>

        {/* continue with google button */}
        <div className='text-center'>
          <Button variant="ghost" className="text-center border border-border rounded-3xl">
            <FcGoogle size={24} /> <p>Continue with Google</p>
          </Button>
        </div>

        {/* divider */}
        <div className='my-2 flex justify-center items-center gap-2'>
          <div className='h-1 flex-1 bg-gray-200 rounded-3xl' />
          <span>OR</span>
          <div className='h-1 flex-1 bg-gray-200 rounded-3xl' />
        </div>

        {/* sigup button */}
        <div className='flex justify-center items-center'>
          <p className='text-muted text-xs'>Don't have an account ?</p>
          <Link to="/forgot-password" className='text-xs flex justify-center text-primary/60 items-center hover:text-body cursor-pointer underline'>Login</Link>
        </div>

      </form>
    </Card>
  )
}

export default Register