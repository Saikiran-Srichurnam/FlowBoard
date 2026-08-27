import { MoreVertical, CalendarDays, CheckSquare, Trash2 } from "lucide-react";
import { useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import { projects } from "../../data/project";

function ProjectCard({
  id,
  name,
  image,
  description,
  status,
  progress,
  dueDate,
  tasks,
  members = [],
}) {

  const [activeMenu, setActiveMenu] = useState(false);

  const handleMenuButton = () => {
    setActiveMenu(prev => !prev)
  }

  const { handleEditProject, deleteProject, projects } = useProjects()

  // handle the edit project button
  const handleEdit = () => {
    handleEditProject(id)
    setActiveMenu(false)
  }

  const handleDelete = () => {
    const project = projects.find(project => project.id === id)
    const confirmed = window.confirm(
      `Would you like to Delete ${project.name}`
    )
    if (confirmed) {
      deleteProject(id)
    }
    console.log(project);
  }


  return (
    <div id={id} className="group border border-border rounded-2xl relative p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl bg-surface">

      <img
        src={image}
        alt={name}
        className="w-full h-44 object-cover mb-2 rounded-md"
      />
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${status === "Active" ? "bg-primary"
              : status === "Completed"
                ? "bg-success"
                : status === "On Hold"
                  ? "bg-yellow-500"
                  : "bg-slate-400"
              }`}
          />

          <span className="text-xs font-medium text-muted">
            {status}
          </span>
        </div>

        <button
          type="button"
          className="rounded-md p-1.5 text-muted transition-colors hover:bg-slate-100 hover:text-heading"
          aria-label={`More options for ${name}`}
        >
          <MoreVertical size={18} onClick={handleMenuButton} />
        </button>
        {activeMenu ? (
          <div className="absolute right-6 mt-8 w-24 bg-slate-200 border text-sm z-10 space-y-2 flex flex-col">
            <button className="hover:bg-primary hover:text-surface text-heading" onClick={handleEdit}>Edit</button>
          </div>
        ) : ""}

      </div>

      {/* Project information */}
      <div className="mt-4">
        <h3 className="truncate text-lg font-semibold text-heading">
          {name}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm leading-5 text-body">
          {description}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-body">
            Progress
          </span>

          <span className="text-xs font-semibold text-heading">
            {progress}%
          </span>
        </div>

        <div
          className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`${name} progress`}
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">

        {/* Members */}
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {(members || []).slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-slate-200 text-xs font-semibold text-heading"
                title={member}
              >
                {member
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            ))}
          </div>

          {members && members.length > 3 && (
            <span className="ml-2 text-xs font-medium text-muted">
              +{members.length - 3}
            </span>
          )}
        </div>

        {/* Task count */}
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <CheckSquare size={15} />
          <span>{tasks} Tasks</span>
        </div>
      </div>

      {/* Due date */}
      <div className="flex justify-between items-center">
        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted">
          <CalendarDays size={15} />
          <span>Due {dueDate}</span>
        </div>
        <button className="hover:bg-red-100 hover:text-danger text-heading p-1 rounded-md cursor-pointer" onClick={handleDelete}><Trash2 size={24} /></button>
      </div>
    </div>
  );
}

export default ProjectCard;