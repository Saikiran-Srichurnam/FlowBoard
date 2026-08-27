import React, { useState } from 'react'
import { ProjectHeader, ProjectSearchAndFilter, ProjectViewToggle, ProjectGrid, ProjectList, EditProjectModal } from '../../components/project'
import { useProjects } from '../../context/ProjectContext';

function ProjectPage() {

  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("All")
  const [selectedSortOption, setSelectedSortOption] = useState("latest")

  const { projects=[], editProjectId } = useProjects()

  const filteredProjects = projects.filter((p) => {
    const matchedSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchedStatus = selectedOption === "All" || p.status === selectedOption;

    return matchedSearch && matchedStatus

  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (selectedSortOption === "Alphabetical") {
      // negative number → a comes before b
      // positive number → b comes before a
      // 0               → same order
      return a.name.localeCompare(b.name);
    }

    if (selectedSortOption === "Latest") {
      // 3 - 1 = 2 -> Put b before a.
      return b.id - a.id
    }

    if (selectedSortOption === "Oldest") {
      // 1 - 3 = -2 -> Put a before b
      return a.id - b.id
    }

    return 0

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
          ? <ProjectGrid sortedProjects={sortedProjects} />
          : <ProjectList sortedProjects={sortedProjects} />
        }
      </div>

      {editProjectId !== null && (
        <EditProjectModal projectId={editProjectId} />
      )}
    </section>
  )
}

export default ProjectPage