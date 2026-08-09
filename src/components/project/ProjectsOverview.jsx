import React from 'react'
import { BookOpenText, ArrowRight, Plus } from 'lucide-react'
import Button from '../ui/Button'

function ProjectOverview() {

  const kanbanCardsDetails = [
    {
      title: "Todo", total: 6, kanbanClass: "bg-background text-body",
    },
    {
      title: "In Progress", total: 4, kanbanClass: "bg-yellow-50 text-yellow-500",
    },
    {
      title: "Review", total: 4, kanbanClass: "bg-primary/10 text-primary",
    },
    {
      title: "Done", total: 4, kanbanClass: "bg-success/10 text-success",
    },
  ]

  return (
    <div id='ProjectOverview' className='bg-surface h-full w-9/12 p-6 shadow-sm border border-border rounded-md space-y-2'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 text-center'>
          <BookOpenText size={24} />
          <h1 className='font-semibold text-heading'>Project Overview</h1>
        </div>
        <button className='text-primary font-semibold flex gap-2 hover:cursor-pointer'>
          <p>View Board</p>
          <span><ArrowRight /></span>
        </button>
      </div>

      {/* kanban cards */}
      <section id='kanban-cards'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
          {kanbanCardsDetails.map((kanban) => (
            <div>
              <div className={`p-2 flex justify-between items-center border border-border shadow-sm rounded-lg ${kanban.kanbanClass}`}>
                <h1>{kanban.title} </h1>
                <p className="shadow-sm h-6 w-6 text-center rounded-full">{kanban.total} </p>
              </div>

              {/* Add Task button */}
              <Button variant="secondary" className='w-full mt-2 flex justify-start'>
                <Plus className='text-body' />
                <p>Add Task</p>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProjectOverview