import React, { useState } from 'react'
import Button from '../ui/Button'
import { Dot } from 'lucide-react'

function TeamsMembersList() {
  const activeMembersDetails = [
    { title: "Saikiran", role: "Team Admin", active: "true", text: " Online" },
    { title: "Rohit Sharma", role: "Frontend Developer", active: true, text: " Online" },
    { title: "Priya verma", role: "UI/UX Designer", active: false, text: " Offline" },
    { title: "Ankit Singh", role: "Backend Developer", active: false, text: " Offline" },

  ]

  const [activeUser, setActiveUser] = useState(activeMembersDetails)

  return (
    <section id='TeamsMembersList' className="h-64 w-full rounded-md border border-border bg-surface p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-heading font-semibold">
          Team Members
        </h2>

        <Button
          variant="ghost"
          className="text-xs text-primary"
        >
          View Calender
        </Button>
      </div>
      <div className='mt-2 space-y-4'>
        {activeMembersDetails.map((activeMember) => (
          <div key={activeMember.title} className='flex justify-between items-center '>
            <div className='flex gap-2 items-center'>
              <p className='h-6 w-6  bg-primary/50 rounded-full' />
              <div>
                <p className='text-[10px] text-heading font-bold'>{activeMember.title}</p>
                <p className='text-[8px] text-muted'>{activeMember.role}</p>
              </div>
            </div>

            <span className={`flex justify-center items-center text-[10px] ${activeMember.active ? "text-success" : "text-muted"}`}>
              <Dot size={32} />
              <p>{activeMember.text}</p>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TeamsMembersList