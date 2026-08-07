import React from 'react'
import Button from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'

function LayoutPage() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate("/register")
  }

  return (
    <div>
      <div className='space-y-4'>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-primary">
          Build Projects <br />
          Faster
        </h1>
        <h2 className="mt-4 text-xl md:text-2xl text-gray-500 max-w-xl leading-relaxed">
          Plan, collaborate, and deliver projects effortlessly with one modern workspace.
        </h2>
      </div>

      <p className="mt-8 text-lg text-gray-600 max-w-lg">
        Everything your team needs in one workspace.
      </p>

      <div className="mt-10 flex gap-4">
        <Button className="px-8 py-6" onClick={handleGetStarted}>
          Get Started
        </Button>

        <Button
          variant="secondary"
          className="px-8 py-6 border border-primary"
        >
          Live Demo
        </Button>
      </div>
    </div>
  )
}

export default LayoutPage