import React from 'react'
import { BookOpenText, ArrowRight, Plus } from 'lucide-react'
import Button from '../ui/Button'

function ProjectOverview() {

  const kanbanCardsDetails = [
    { title: "To Do", total: 6, kanbanClass: "bg-red-50 text-red-400", },
    { title: "In Progress", total: 4, kanbanClass: "bg-yellow-50 text-yellow-500", },
    { title: "Review", total: 4, kanbanClass: "bg-blue-50 text-blue-500", },
    { title: "Done", total: 4, kanbanClass: "bg-success/10 text-success", },
  ]

  const projectDetails = [
    { title: "Design Landing Page", projectName: "FlowBoard Website", membersAllocated: "1", date: "May 22" },
    { title: "Create Wireframes", projectName: "Mobile App", membersAllocated: "2", date: "May 23" },
    { title: "User Research", projectName: "Marketing Site", membersAllocated: "2", date: "May 25" }
  ]

  return (
    <div id='ProjectOverview' className='bg-surface h-full w-8/12 p-6 shadow-sm border border-border rounded-md space-y-2'>
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
            <div key={kanban.title}>
              <div className={`p-2 text-sm font-semibold  border border-border shadow-sm rounded-md ${kanban.kanbanClass}`}>
                <div className='flex flex-row justify-between items-center'>
                  <h1>{kanban.title} </h1>
                  <p className="shadow-sm h-6 w-6 text-center rounded-full">{kanban.total} </p>
                </div>
                {projectDetails.map((project) => (
                  <div className={`bg-surface p-4 shadow-sm mt-2 rounded-md border-l-3 border-l-${kanban.kanbanClass} space-y-2`}>
                    <div className='text-xs space-y-2'>
                      <h1 className='text-heading'>{project.title}</h1>
                      <p className='text-muted'>{project.projectName}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                      <p className='text-body'>{project.membersAllocated}</p>
                      <h2>{project.date}</h2>
                    </div>
                  </div>
                ))}

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