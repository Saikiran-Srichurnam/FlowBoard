
import {
  MoreVertical,
  CalendarDays,
  Flag,
  Trash2,
  FolderKanban,
  Pencil,
} from "lucide-react";

import { useTasks, useProjects } from "../../context";
import { useEffect, useRef, useState } from "react";

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
  const { tasks, deleteTask, handleEditTask } = useTasks();
  const { projects = [] } = useProjects();

  const [activeMenu, setActiveMenu] = useState(false);
  const menuRef = useRef(null);

  const project = projects.find(
    (p) => String(p.id) === String(projectId)
  );
  const projectName = project?.name || "Unknown Project";

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setActiveMenu(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const statusStyles = {
    "To Do": "bg-danger",
    "In Progress": "bg-warning",
    Review: "bg-primary",
    Done: "bg-success",
  };

  const priorityStyles = {
    High: "bg-danger/10 text-danger",
    Medium: "bg-warning/10 text-warning",
    Low: "bg-success/10 text-success",
  };

  const priorityIconStyles = {
    High: "text-danger",
    Medium: "text-warning",
    Low: "text-success",
  };

  const handleEdit = () => {
    setActiveMenu(false);
    handleEditTask(id);
  };

  const handleDeleteTask = () => {
    const task = tasks.find(
      (task) => String(task.id) === String(id)
    );

    if (!task) return;

    const confirmed = window.confirm(
      `Would you like to delete "${task.title}"?`
    );

    if (confirmed) deleteTask(id);
  };

  return (
    <article className="group relative flex h-full min-w-0 flex-col rounded-xl border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg sm:p-5">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusStyles[status] || "bg-muted"
              }`}
          />
          <span className="truncate text-xs font-medium text-body">
            {status}
          </span>
        </div>

        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setActiveMenu((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-hover hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`More options for ${title}`}
            aria-expanded={activeMenu}
            aria-haspopup="menu"
          >
            <MoreVertical size={18} />
          </button>

          {activeMenu && (
            <div
              role="menu"
              className="absolute right-0 top-full z-30 mt-2 w-36 overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-xl"
            >
              <button
                type="button"
                role="menuitem"
                onClick={handleEdit}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-xs font-medium text-body transition-colors hover:bg-surface-hover hover:text-primary"
              >
                <Pencil size={15} />
                Edit Task
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={handleDeleteTask}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-xs font-medium text-danger transition-colors hover:bg-danger/10"
              >
                <Trash2 size={15} />
                Delete Task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Task Information */}
      <div className="mt-4 min-w-0">
        <h3 className="truncate text-base font-semibold text-heading sm:text-lg">
          {title}
        </h3>

        <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-body">
          {description || "No description provided."}
        </p>
      </div>

      {/* Priority */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-muted">
          <Flag
            size={15}
            className={priorityIconStyles[priority] || "text-muted"}
          />
          <span className="text-xs font-medium">Priority</span>
        </div>

        <span
          className={`rounded-md px-2.5 py-1 text-xs font-semibold ${priorityStyles[priority] || "bg-background text-muted"
            }`}
        >
          {priority || "None"}
        </span>
      </div>

      {/* Assignees and Project */}
      <div className="mt-5 space-y-4 border-t border-border pt-4">

        {/* Members */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 -space-x-2">
            {assignee.slice(0, 3).map((member, index) => (
              <div
                key={`${member}-${index}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-primary/10 text-[10px] font-bold text-primary shadow-sm"
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
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-surface-hover text-[10px] font-bold text-muted shadow-sm"
                title={`${assignee.length - 3} more members`}
              >
                +{assignee.length - 3}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-[11px] text-muted">Assigned to</p>
            <p
              className="truncate text-xs font-medium text-heading"
              title={assignee.join(", ")}
            >
              {assignee.length > 0
                ? assignee.join(", ")
                : "Unassigned"}
            </p>
          </div>
        </div>

        {/* Project */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FolderKanban size={16} />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] text-muted">Project</p>
            <p className="truncate text-xs font-medium text-heading">
              {projectName}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
        <div className="flex min-w-0 items-center gap-2 text-muted">
          <CalendarDays size={15} className="shrink-0" />
          <span className="truncate text-xs">
            {dueDate ? `Due ${dueDate}` : "No due date"}
          </span>
        </div>

        {/* <button
          type="button"
          onClick={handleDeleteTask}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-danger/10 hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
          aria-label={`Delete ${title}`}
          title="Delete task"
        >
          <Trash2 size={17} />
        </button> */}
      </div>
    </article>
  );
}

export default TasksCard;
