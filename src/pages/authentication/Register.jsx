import React, { useState } from 'react'
import Card from '../../components/ui/Card/Card'
import Input from '../../components/ui/Input/Input'
import { PasswordInput, AuthDivider, AuthHeader, SocialLogin, AuthFooter } from '../../components/auth'
import { Link, useNavigate } from "react-router-dom"
import Button from '../../components/ui/Button'


function Register() {

  const [userName, setUserName] = useState("")

  const navigate = useNavigate()
  const handleRegister = (e) => {
    e.preventDefault()

    localStorage.setItem("userName", userName)
    console.log("Stored username:", localStorage.getItem("userName"));

    navigate("/login")
  }

  return (
    <Card className="w-full max-w-md border border-border">
      <AuthHeader title="Create account" subtitle="Start managing your projects" />
      <form className='space-y-2 px-8 mt-8' onSubmit={handleRegister}>
        {/* username */}
        <Input id="userName" label="Username" type="text" placeholder="Saikiran" value={userName} onChange={(e) => setUserName(e.target.value)} />

        {/* Email input */}
        <Input id="email" label="Email" type="email" placeholder="you@gmail.com" />

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
        <AuthFooter text="Already have an account" linkText="Login" to="/login" />

      </form>
    </Card>
  )
}

export default Register