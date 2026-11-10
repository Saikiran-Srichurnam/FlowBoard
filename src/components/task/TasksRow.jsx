
import {
  MoreVertical,
  CalendarDays,
  Flag,
  Pencil,
  Trash2,
  FolderKanban,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useTasks, useProjects } from "../../context";

function TasksRow({
  id,
  title,
  status,
  priority,
  projectId,
  assignee = [],
  dueDate,
  columns,
}) {
  const [activeMenu, setActiveMenu] = useState(false);

  const menuRef = useRef(null);

  const { handleEditTask, tasks, deleteTask } = useTasks();
  const { projects = [] } = useProjects();

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
      if (event.key === "Escape") {
        setActiveMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const statusStyles = {
    "To Do": "bg-danger/10 text-danger",
    "In Progress": "bg-warning/10 text-warning",
    Review: "bg-primary/10 text-primary",
    Done: "bg-success/10 text-success",
  };

  const statusDotStyles = {
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

  const handleEdit = () => {
    setActiveMenu(false);
    handleEditTask(id);
  };

  const handleDeleteTask = () => {
    const task = tasks.find(
      (t) => String(t.id) === String(id)
    );

    if (!task) return;

    const confirmed = window.confirm(
      `Would you like to delete "${task.title}"?`
    );

    if (confirmed) {
      deleteTask(id);
      setActiveMenu(false);
    }
  };

  return (
    <div
      id={String(id)}
      className={`relative grid ${columns} min-w-[950px] items-center gap-3 border-b border-border px-5 py-4 text-sm transition-colors last:border-b-0 hover:bg-surface-hover`}
    >
      {/* Task Title */}
      <div className="min-w-0">
        <p
          className="truncate text-sm font-semibold text-heading"
          title={title}
        >
          {title}
        </p>
      </div>

      {/* Status */}
      <div className="min-w-0">
        <span
          className={`inline-flex max-w-full items-center gap-2 truncate rounded-md px-2.5 py-1.5 text-xs font-semibold ${
            statusStyles[status] || "bg-background text-muted"
          }`}
        >
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${
              statusDotStyles[status] || "bg-muted"
            }`}
          />
          {status}
        </span>
      </div>

      {/* Priority */}
      <div className="min-w-0">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold ${
            priorityStyles[priority] || "bg-background text-muted"
          }`}
        >
          <Flag size={12} />
          {priority || "None"}
        </span>
      </div>

      {/* Project */}
      <div className="flex min-w-0 items-center gap-2">
        <FolderKanban size={15} className="shrink-0 text-muted" />
        <span
          className="truncate text-xs font-medium text-body"
          title={projectName}
        >
          {projectName}
        </span>
      </div>

      {/* Assignees */}
      <div className="flex min-w-0 items-center">
        {assignee.length > 0 ? (
          <div className="flex min-w-0 items-center">
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
            </div>

            {assignee.length > 3 && (
              <span className="ml-2 shrink-0 rounded-md bg-surface-hover px-1.5 py-1 text-[10px] font-semibold text-muted">
                +{assignee.length - 3}
              </span>
            )}
          </div>
        ) : (
          <span className="text-xs text-muted">Unassigned</span>
        )}
      </div>

      {/* Due Date */}
      <div className="flex min-w-0 items-center gap-2 text-body">
        <CalendarDays size={14} className="shrink-0 text-muted" />
        <span className="truncate text-xs">
          {dueDate || "No due date"}
        </span>
      </div>

      {/* Actions */}
      <div className="relative flex justify-center" ref={menuRef}>
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
            className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-xl"
          >
            <button
              type="button"
              role="menuitem"
              onClick={handleEdit}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-xs font-medium text-body transition-colors hover:bg-surface-hover hover:text-primary"
            >
              <Pencil size={14} />
              Edit Task
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={handleDeleteTask}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-xs font-medium text-danger transition-colors hover:bg-danger/10"
            >
              <Trash2 size={14} />
              Delete Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TasksRow;
