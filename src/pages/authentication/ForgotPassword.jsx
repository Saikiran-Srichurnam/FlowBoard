import React, { useState } from 'react'
import Card from '../../components/ui/Card/Card'
import { AuthHeader } from '../../components/auth'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button'
import { Link } from 'react-router-dom'

function ForgotPassword() {

  const [emailSent, setEmailSent] = useState(false)

  const handleForgotPassword = (e) => {
    e.preventDefault()

    console.log("Sent email verification code to your device")
    setEmailSent(true)
  }
  return (
    <Card className="w-full max-w-md">
      <AuthHeader />
      {(!emailSent) ? (
        <form onSubmit={handleForgotPassword} className='space-y-4 px-8'>
          <h1 className='text-xl text-center'>Forgot Password</h1>
          <p className="text-muted dancing-script-font">
            Enter your email and we'll send you a password reset link.
          </p>
          <Input id="Email" label="Email" type="email" placeholder="you@gmail.com" />

          <Button type="submit" className="w-full mt-2">
            Send Reset Link
          </Button>

        </form>
      ) : (
        <div className="px-8 py-6 text-center space-y-4">
          <h2 className="text-xl font-semibold">
            Check your email
          </h2>

          <p className="text-muted">
            If an account exists with that email, we've sent a password reset
            link.
          </p>

          <Link to="/login">
            <Button className="w-full">
              Back to Login
            </Button>
          </Link>
        </div>
      )}
    </Card>
  )
}

export default ForgotPassword