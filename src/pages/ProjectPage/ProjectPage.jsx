import React, { useState } from 'react'
import { ProjectHeader, ProjectSearchAndFilter, ProjectViewToggle, ProjectGrid } from '../../components/project'

function ProjectPage() {

  const [view, setView] = useState("grid");

  return (
    <section id='ProjectPage' className='bg-surface h-full w-full p-6 shadow-sm border border-border rounded-md space-y-2'>
      <ProjectHeader />

      <div className='mt-8 flex items-center justify-between gap-4'>
        <ProjectSearchAndFilter />
        <ProjectViewToggle
          view={view}
          setView={setView}
        />
      </div>
      <div className="mt-6">
        <ProjectGrid />
      </div>

      <div className="mt-6">
        {view === "grid" && <ProjectGrid />}
      </div>
    </section>
  )
}

export default ProjectPage