import React, { useState } from 'react'
import { ProjectHeader, ProjectSearchAndFilter, ProjectViewToggle, ProjectGrid, ProjectList } from '../../components/project'
import { projects as initialProjects } from '../../data/project';

function ProjectPage() {

  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("All")
  const [selectedSortOption, setSelectedSortOption] = useState("latest")

  const filteredProjects = initialProjects.filter((p) => {
    const matchedSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchedStatus = selectedOption === "All" || p.status === selectedOption;

    return matchedSearch && matchedStatus

  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (selectedSortOption === "Alphabetical") {
      // negative number → a comes before b
      // positive number → b comes before a
      // 0               → same order
      return a.name.localeCompare(b.name)
    }

    if (selectedSortOption === "latest") {
      // 3 - 1 = 2 -> Put b before a.
      return b.id - a.id
    }

    if (selectedSortOption === "oldest") {
      // 1 - 3 = -2 -> Put a before b
      return a.id - b.id
    }

  })

  return (
    <section id='ProjectPage' className='bg-surface h-full w-full p-6 shadow-sm border border-border rounded-md space-y-2'>
      <ProjectHeader />

      <div className='mt-8 flex items-center justify-between gap-4'>
        <ProjectSearchAndFilter
          search={search}
          setSearch={setSearch}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedSortOption={selectedSortOption}
          setSelectedSortOption={setSelectedSortOption}
        />
        <ProjectViewToggle
          view={view}
          setView={setView}
        />
      </div>

      <div className="mt-6">
        {view === "grid"
          ? <ProjectGrid initialProjects={sortedProjects} />
          : <ProjectList initialProjects={sortedProjects} />
        }
      </div>
    </section>
  )
}

export default ProjectPage