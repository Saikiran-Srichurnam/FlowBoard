import React from 'react'
import { ProjectHeader, ProjectSearchAndFilter } from '../../components/project'

function ProjectPage() {
  return (
    <section id='ProjectPage' className='bg-surface h-full w-full p-6 shadow-sm border border-border rounded-md space-y-2'>
      <ProjectHeader />

      <div className='mt-8'>
        <ProjectSearchAndFilter />
      </div>
    </section>
  )
}

export default ProjectPage