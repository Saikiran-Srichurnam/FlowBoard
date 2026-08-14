import React from 'react'
import Button from '../ui/Button'
import { div } from 'framer-motion/client'


function UpCommingEvents() {

  const eventsData = [
    {
      month: "May", date: 22, title: "Project Planning Meeting", scheduledTime: "10:00 AM - 11:00 AM", totalMembers: 5,
      eventClass: "bg-primary/10 text-primary"
    },
    {
      month: "May", date: 24, title: "Sprint Review", scheduledTime: "2:00 PM - 3:30 PM", totalMembers: 7, eventClass: "bg-yellow-50 text-yellow-500"
    },
    {
      month: "May", date: 26, title: "Client Presentation", scheduledTime: "11:00 AM - 12:00 PM", totalMembers: 7, eventClass: "bg-success/10 text-success"
    },


  ]
  return (
    <section
      id="UpCommingEvents"
      className="h-64 md:h-full rounded-md border border-border bg-surface p-5 shadow-sm"
    >
      {/* header*/}
      <div className="flex items-center justify-between mb-1">

        <h2 className="text-sm text-heading font-semibold">
          UpComming Events
        </h2>

        <Button
          variant="ghost"
          className="text-xs text-primary"
        >
          View Calender
        </Button>

      </div>

      <hr className='text-muted opacity-20' />

      <div className='mt-2'>
        {eventsData.map((event) => (
          <div className='flex justify-between items-center'>
            <div className='flex justify-start items-center gap-2 space-y-2'>
              <span className={` flex flex-col justify-center items-center p-2 w-12 h-12 rounded-lg ${event.eventClass}`}>
                <p className='text-xs'>{event.month}</p>
                <h1 className='text-lg'>{event.date}</h1>
              </span>
              <div className='w-full '>
                <h1 className='text-sm text-heading'>{event.title}</h1>
                <p className='text-muted text-xs'>{event.scheduledTime}</p>
              </div>

            </div>
            <span className=' h-6 w-6 text-center bg-gray-100 rounded-full'>
              {event.totalMembers}
            </span>
          </div>
        ))}
      </div>

    </section>
  )
}

export default UpCommingEvents