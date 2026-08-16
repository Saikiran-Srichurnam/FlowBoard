import React, { useState } from 'react'
import { ProjectHeader, ProjectSearchAndFilter, ProjectViewToggle, ProjectGrid, ProjectList } from '../../components/project'
import { projects } from '../../data/project';

function ProjectPage() {

  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("All")

  const filteredProjects = projects.filter((p) => {
    const matchedSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchedStatus = selectedOption === "All" || p.status === selectedOption;

    return matchedSearch && matchedStatus

  });

  return (
    <section id='ProjectPage' className='bg-surface h-full w-full p-6 shadow-sm border border-border rounded-md space-y-2'>
      <ProjectHeader />

      <div className='mt-8 flex items-center justify-between gap-4'>
        <ProjectSearchAndFilter
          search={search}
          setSearch={setSearch}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <ProjectViewToggle
          view={view}
          setView={setView}
        />
      </div>

      <div className="mt-6">
        {view === "grid"
          ? <ProjectGrid projects={filteredProjects} />
          : <ProjectList projects={filteredProjects} />
        }
      </div>
    </section>
  )
}

export default ProjectPage