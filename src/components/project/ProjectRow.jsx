
import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { useProjects } from "../../context/ProjectContext";

function ProjectRow({
  id,
  image,
  name,
  description,
  status,
  progress,
  dueDate,
  tasks,
  members = [],
  columns,
}) {
  const [activeMenu, setActiveMenu] = useState(false);
  const menuRef = useRef(null);

  const { handleEditProject, deleteProject, projects } = useProjects();

  const safeMembers = Array.isArray(members) ? members : [];
  const safeProgress = Math.min(100, Math.max(0, Number(progress) || 0));

  const getStatusColor = (value) => {
    switch (value) {
      case "Active":
        return "bg-success";
      case "Completed":
        return "bg-primary";
      case "On Hold":
        return "bg-warning";
      default:
        return "bg-muted";
    }
  };

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

  const handleEdit = () => {
    setActiveMenu(false);
    handleEditProject(id);
  };

  const handleDelete = () => {
    const project = projects.find(
      (item) => String(item.id) === String(id)
    );

    if (!project) return;

    const confirmed = window.confirm(
      `Would you like to delete "${project.name}"?`
    );

    if (confirmed) {
      deleteProject(id);
    }

    setActiveMenu(false);
  };

  return (
    <div
      id={String(id)}
      className={`relative grid ${columns} min-w-[1020px] items-center gap-3 border-b border-border px-5 py-4 text-xs text-body transition-colors last:border-b-0 hover:bg-surface-hover`}
    >
      {/* Project */}
      <div className="flex min-w-0 items-center gap-3">
        {image ? (
          <img
            src={image}
            alt={`${name} project`}
            className="h-9 w-9 shrink-0 rounded-lg border border-border object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-semibold text-primary">
            {name?.charAt(0)?.toUpperCase() || "P"}
          </div>
        )}

        <div className="min-w-0">
          <p
            className="truncate font-semibold text-heading"
            title={name}
          >
            {name}
          </p>

          {description && (
            <p
              className="mt-0.5 truncate text-[10px] text-muted"
              title={description}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${getStatusColor(status)}`}
        />
        <span className="truncate font-medium text-body">
          {status}
        </span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        <div className="h-2 w-16 shrink-0 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${safeProgress}%` }}
          />
        </div>

        <span className="text-xs font-semibold text-body">
          {safeProgress}%
        </span>
      </div>

      {/* Tasks */}
      <div className="font-medium text-body">
        {tasks ?? 0}
      </div>

      {/* Due Date */}
      <div className="truncate text-xs text-body" title={dueDate || ""}>
        {dueDate || "No due date"}
      </div>

      {/* Team */}
      <div className="flex min-w-0 items-center">
        {safeMembers.length > 0 ? (
          <>
            <div className="flex shrink-0 -space-x-2">
              {safeMembers.slice(0, 3).map((member, index) => {
                const memberName =
                  typeof member === "string"
                    ? member
                    : member?.name || "Member";

                const initials = memberName
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div
                    key={`${memberName}-${index}`}
                    title={memberName}
                    className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-surface bg-primary/10 text-[10px] font-bold text-primary shadow-sm"
                  >
                    {initials}
                  </div>
                );
              })}
            </div>

            {safeMembers.length > 3 && (
              <span
                title={`${safeMembers.length - 3} more members`}
                className="ml-2 shrink-0 rounded-md bg-surface-hover px-1.5 py-1 text-[10px] font-bold text-muted"
              >
                +{safeMembers.length - 3}
              </span>
            )}
          </>
        ) : (
          <span className="text-xs text-muted">No members</span>
        )}
      </div>

      {/* Actions */}
      <div className="relative flex justify-center" ref={menuRef}>
        <button
          type="button"
          aria-label={`More options for ${name}`}
          aria-expanded={activeMenu}
          aria-haspopup="menu"
          onClick={() => setActiveMenu((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-hover hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <MoreVertical size={18} />
        </button>

        {activeMenu && (
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 flex min-w-32 flex-col overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-xl"
          >
            <button
              type="button"
              role="menuitem"
              onClick={handleEdit}
              className="rounded-md px-3 py-2.5 text-left text-xs font-medium text-body transition-colors hover:bg-surface-hover hover:text-primary"
            >
              Edit Project
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={handleDelete}
              className="rounded-md px-3 py-2.5 text-left text-xs font-medium text-danger transition-colors hover:bg-danger/10"
            >
              Delete Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectRow;
