import {
  MoreVertical,
  CalendarDays,
  User,
  Flag,
} from "lucide-react"

function TasksCard({
  id,
  title,
  description,
  status,
  priority,
  projectId,
  assignee = [],
  dueDate,
}) {

  return (
    <div
      id={id}
      className="group relative rounded-2xl border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">

        {/* Status */}
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${status === "To Do"
              ? "bg-red-400"
              : status === "In Progress"
                ? "bg-yellow-500"
                : status === "Review"
                  ? "bg-blue-500"
                  : status === "Done"
                    ? "bg-success"
                    : "bg-slate-400"
              }`}
          />

          <span className="text-xs font-medium text-muted">
            {status}
          </span>
        </div>

        {/* More button */}
        <button
          type="button"
          className="rounded-md p-1.5 text-muted transition-colors hover:bg-slate-100 hover:text-heading"
          aria-label={`More options for ${title}`}
        >
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Task information */}
      <div className="mt-4">
        <h3 className="truncate text-lg font-semibold text-heading">
          {title}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm leading-5 text-body">
          {description}
        </p>
      </div>

      {/* Priority */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Flag
            size={15}
            className={
              priority === "High"
                ? "text-danger"
                : priority === "Medium"
                  ? "text-yellow-500"
                  : "text-success"
            }
          />

          <span className="text-xs font-medium text-muted">
            Priority
          </span>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priority === "High"
            ? "bg-red-100 text-danger"
            : priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-success"
            }`}
        >
          {priority}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">

        {/* Assignee */}
        <div className="flex items-center gap-3">
          {/* Avatars */}
          <div className="flex -space-x-2">
            {assignee.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-slate-200 text-xs font-semibold text-heading"
                title={member}
              >
                {member
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            ))}

            {assignee.length > 3 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-slate-100 text-xs font-semibold text-muted">
                +{assignee.length - 3}
              </div>
            )}
          </div>

          {/* Assignee names */}
          <div className="flex flex-col">
            <span className="text-[11px] text-muted">
              Assigned to
            </span>

            <span className="text-[10px] font-medium text-heading">
              {assignee.join(", ")}
            </span>
          </div>
        </div>

        {/* Project */}
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <User size={15} />
          <span>Project {projectId}</span>
        </div>
      </div>

      {/* Due date */}
      <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-4 text-xs text-muted">
        <CalendarDays size={15} />
        <span>Due {dueDate}</span>
      </div>
    </div>
  )
}

export default TasksCard