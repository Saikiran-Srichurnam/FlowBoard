import React from 'react'

function ProjectList({ initialProjects }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">

      {/* Header */}
      <div className="grid grid-cols-6 border-b  border-border px-5 py-3 text-xs font-medium text-muted">
        <span>Project</span>
        <span>Status</span>
        <span>Progress</span>
        <span>Tasks</span>
        <span>Due Date</span>
        <span>Team</span>
      </div>

      {/* Rows */}
      {initialProjects.map((project) => (
        <div
          key={project.id}
          className="grid grid-cols-6 items-center border-b border-border px-5 py-4 text-sm last:border-b-0 hover:bg-slate-50"
        >
          <h2>{project.name}</h2>
          <p>{project.status}</p>
          <p>{project.progress}</p>
          <p>{project.tasks}</p>
          <p>{project.dueDate}</p>
          <p>{project.members}</p>
        </div>
      ))}

    </div>
  )
}

export default ProjectList