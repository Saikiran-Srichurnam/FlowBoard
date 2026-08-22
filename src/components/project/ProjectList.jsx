import { useProjects } from "../../context/ProjectContext"

function ProjectList() {
  const { projects } = useProjects()

  // Helper to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500'
      case 'Completed':
        return 'bg-blue-500'
      case 'On Hold':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">

      {/* Header */}
      <div className="grid grid-cols-6 border-b border-border px-5 py-3 text-xs font-medium text-muted">
        <span>Project</span>
        <span>Status</span>
        <span>Progress</span>
        <span>Tasks</span>
        <span>Due Date</span>
        <span>Team</span>
      </div>

      {/* Rows */}
      {projects.length === 0 ? (
        <div className="col-span-6 text-center py-8 text-muted">
          No projects found. Create your first project!
        </div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-6 items-center border-b border-border px-5 py-4 text-sm last:border-b-0 hover:bg-slate-50 transition-colors"
          >
            {/* Project Name */}
            <div className="flex items-center gap-2">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-8 h-8 rounded object-cover"
                />
              )}
              <span className="font-medium truncate">{project.name}</span>
            </div>

            {/* Status with color indicator */}
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`} />
              <span>{project.status}</span>
            </div>

            {/* Progress with bar */}
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="text-xs font-medium">{project.progress}%</span>
            </div>

            {/* Tasks */}
            <div className="flex items-center gap-1">
              <span>{project.tasks}</span>
            </div>

            {/* Due Date */}
            <div className="text-sm">
              {project.dueDate}
            </div>

            {/* Team Members */}
            <div className="flex items-center gap-1">
              <div className="flex -space-x-2">
                {project.members && project.members.slice(0, 3).map((member, index) => (
                  <div
                    key={index}
                    className="h-6 w-6 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center text-xs font-medium text-primary"
                    title={member}
                  >
                    {member.charAt(0)}
                  </div>
                ))}
              </div>
              {project.members && project.members.length > 3 && (
                <span className="text-xs text-muted ml-1">
                  +{project.members.length - 3}
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ProjectList