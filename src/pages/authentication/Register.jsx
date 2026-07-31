import React, { useState } from 'react'
import Card from '../../components/ui/Card/Card'
import Input from '../../components/ui/Input/Input'
import { PasswordInput, AuthDivider, AuthHeader, SocialLogin } from '../../components/auth'
import { Link, useNavigate } from "react-router-dom"
import Button from '../../components/ui/Button'


function Register() {

  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const handleRegister = (e) => {
    e.preventDefault()

    navigate("/login")
  }

  return (
    <Card>
      <AuthHeader />
      <form className='space-y-2 px-8 mt-8' onSubmit={handleRegister}>
        {/* username */}
        <Input id="name" label="Username" type="text" placeholder="Saikiran" />

        {/* Email input */}
        <Input id="Email" label="Email" type="email" placeholder="you@gmail.com" />

        {/* Password input */}
        <PasswordInput />

        {/* login button */}
        <div className='flex items-center justify-center mt-6'>
          <Button type="submit" variant="primary" className="tracking-wider w-full">Register</Button>
        </div>

        {/* continue with google button */}
        <SocialLogin />

        {/* divider */}
        <AuthDivider />

        {/* sigup button */}
        <div className='flex justify-center items-center'>
          <p className='text-muted text-xs'>Don't have an account ?</p>
          <Link to="/login" className='text-xs flex justify-center text-primary/60 items-center hover:text-body cursor-pointer underline'>Login</Link>
        </div>

      </form>
    </Card>
  )
}

export default Register