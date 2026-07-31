import React from 'react'
import Input from '../../components/ui/Input/Input'
import { PasswordInput, AuthDivider, AuthHeader, SocialLogin } from '../../components/auth'
import { Link, useNavigate } from "react-router-dom"
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card/Card'


function Login() {

  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault()

    navigate("/register")
  }

  return (
    <Card>
      <AuthHeader />
      <form className='space-y-2 px-8 mt-8' onSubmit={handleLogin}>
        {/* Email input */}
        <Input id="Email" label="Email" type="email" placeholder="you@gmail.com" />

        {/* Password input */}
        <PasswordInput />

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
          <Button type="submit" variant="primary" className="tracking-wider w-full">Login</Button>
        </div>

        {/* continue with google button */}
        <SocialLogin />

        {/* divider */}
        <AuthDivider />

        {/* sigup button */}
        <div className='flex justify-center items-center'>
          <p className='text-muted text-xs'>Don't have an account ?</p>
          <Link to="/Register" className='text-xs flex justify-center text-primary/60 items-center hover:text-body cursor-pointer underline'>Signup</Link>
        </div>

      </form>
    </Card>
  )
}

export default Login