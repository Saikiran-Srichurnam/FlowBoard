import React from 'react'
import Input from '../../components/ui/Input/Input'
import { PasswordInput, AuthDivider, AuthHeader, SocialLogin, AuthFooter } from '../../components/auth'
import { Link, useNavigate } from "react-router-dom"
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card/Card'
import CheckBox from '../../components/ui/CheckBox/CheckBox'


function Login() {

  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault()

    navigate("/register")
  }

  return (
    <Card className="w-full max-w-md border border-border">
      <AuthHeader title="Welcome back" subtitle="Signin to Continue" />
      <form className='space-y-2 px-8 mt-8' onSubmit={handleLogin}>
        {/* Email input */}
        <Input id="Email" label="Email" type="email" placeholder="you@gmail.com" />

        {/* Password input */}
        <PasswordInput />

        <div className='flex justify-between items-center'>
          {/* checkbox */}
          <CheckBox id="remember" label="Remember me" />

          {/* forgot password */}
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

        {/* Auth Footer */}
        <AuthFooter text="Don't have an account" linkText="Register" to="/register" />

      </form>
    </Card>
  )
}

export default Login