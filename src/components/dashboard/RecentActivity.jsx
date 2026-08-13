import React from 'react'
import Button from '../ui/Button'

function RecentActivity() {

  const recentActivityInfo = [
    { text: "Rohit completed", task: "Login Functionality", time: "2h ago" },
    { text: "Priya commented on", task: "Design System", time: "4h ago" },
    { text: "You Created a new task", task: "API Integration", time: "6h ago" },
  ]
  return (
    <section id="RecentActivity" className="h-fit w-full rounded-md border border-border bg-surface p-5 shadow-sm">
      <div>
        <h2 className="text-sm text-heading font-semibold">
          Recent Activity
        </h2>
        <div className='mt-6 space-y-4'>
          {recentActivityInfo.map((recentActivity) => (
            <div className='flex justify-between items-center '>
              <div className='flex gap-2 items-center'>
                <p className='h-6 w-6  bg-primary/50 rounded-full' />
                <p className='text-[10px]'>{recentActivity.text}
                  <span className='text-heading text-xs font-semibold'> "{recentActivity.task}"</span>.
                </p>
              </div>
              <p className='text-[10px] '>{recentActivity.time}</p>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="text-xs text-primary mt-6"
        >
          View All Activity
        </Button>
      </div>
    </section>
  )
}

export default RecentActivity