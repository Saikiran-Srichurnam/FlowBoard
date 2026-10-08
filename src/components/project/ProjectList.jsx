import ProjectRow from "./ProjectRow"

function ProjectList({ sortedProjects }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">

      {/* Header */}
      <div className="min-w-[1020px] grid grid-cols-[280px_140px_160px_100px_140px_160px_40px] items-center gap-2 border-b border-border px-5 py-3 text-sm font-medium text-muted">
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
        <div className="flex min-h-55 min-w-225 items-center justify-center px-6 py-8 text-center text-sm text-muted">
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