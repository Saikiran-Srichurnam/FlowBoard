import { useState } from "react"
import { useProjects } from "../../context/ProjectContext"
import ProjectRow from "./ProjectRow"


function ProjectList({ sortedProjects }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">

      {/* Header */}
      <div className="grid grid-cols-[repeat(6,1fr)_40px] border-b border-border px-5 py-3 text-sm font-medium text-muted gap-2">
        <span>Project</span>
        <span>Status</span>
        <span>Progress</span>
        <span>Tasks</span>
        <span>Due Date</span>
        <span>Team</span>
        <span></span>
      </div>

      {/* Rows */}
      {sortedProjects.length === 0 ? (
        <div className="col-span-6 text-center py-8 text-muted">
          No projects found. Create your first project!
        </div>
      ) : (
        sortedProjects.map((project) => (
          <ProjectRow
            key={project.id}
            id={project.id}
            image={project.image}
            name={project.name}
            description={project.description}
            status={project.status}
            progress={project.progress}
            dueDate={project.dueDate}
            tasks={project.tasks}
            members={project.members}
          />
        ))
      )}
    </div>
  )
}

export default ProjectList