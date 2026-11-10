import { useEffect, useRef, useState } from "react";
import {
  MoreVertical,
  CalendarDays,
  CheckSquare,
  FolderKanban,
} from "lucide-react";
import { useProjects } from "../../context/ProjectContext";

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
  const menuRef = useRef(null);

  const { handleEditProject, deleteProject, projects } = useProjects();

  const safeMembers = Array.isArray(members) ? members : [];
  const safeProgress = Math.min(100, Math.max(0, Number(progress) || 0));

  // Project status colors
  const getProjectStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-primary/10 text-primary";

      case "Review":
        return "bg-warning/10 text-warning";

      case "Completed":
        return "bg-success/10 text-success";

      case "On Hold":
        return "bg-danger/10 text-danger";

      default:
        return "bg-surface-hover text-muted";
    }
  };

  const getMemberName = (member) => {
    if (typeof member === "string") return member;
    return member?.name || "Team Member";
  };

  const getMemberInitials = (member) =>
    getMemberName(member)
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

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
    <article
      id={String(id)}
      className="group relative flex min-w-0 flex-col overflow-visible rounded-xl border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
    >
      {/* Project image */}
      <div className="relative mb-4 h-44 shrink-0 overflow-hidden rounded-lg bg-surface-hover">
        {image ? (
          <img
            src={image}
            alt={`${name} project`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FolderKanban size={32} className="text-muted" />
          </div>
        )}
      </div>

      {/* Project header */}
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex max-w-[75%] items-center truncate rounded-full px-2.5 py-1 text-[11px] font-semibold ${getProjectStatusColor(status)}`}
        >
          {status}
        </span>

        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setActiveMenu((prev) => !prev)}
            aria-label={`More options for ${name}`}
            aria-expanded={activeMenu}
            aria-haspopup="menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-hover hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <MoreVertical size={18} />
          </button>

          {activeMenu && (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-2 flex min-w-36 flex-col overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-xl"
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

      {/* Project information */}
      <div className="mt-3 min-w-0">
        <h3
          className="truncate text-base font-semibold text-heading"
          title={name}
        >
          {name}
        </h3>

        <p className="mt-1 min-h-10 line-clamp-2 text-sm leading-5 text-muted">
          {description || "No project description available."}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-body">Progress</span>
          <span className="text-xs font-semibold tabular-nums text-heading">
            {safeProgress}%
          </span>
        </div>

        <div
          className="h-2 w-full overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuenow={safeProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} progress`}
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${safeProgress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-5">
        <div className="flex items-center justify-between gap-2 border-t border-border pt-4">
          {/* Team members */}
          <div className="flex min-w-0 items-center">
            {safeMembers.length > 0 ? (
              <>
                <div className="flex shrink-0 -space-x-2">
                  {safeMembers.slice(0, 3).map((member, index) => (
                    <div
                      key={`${getMemberName(member)}-${index}`}
                      title={getMemberName(member)}
                      className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-surface bg-primary/10 text-[10px] font-bold text-primary shadow-sm"
                    >
                      {getMemberInitials(member)}
                    </div>
                  ))}
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

          {/* Task count */}
          <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted">
            <CheckSquare size={15} />
            <span>{tasks ?? 0} Tasks</span>
          </div>
        </div>

        {/* Due date */}
        <div className="mt-4 flex min-w-0 items-center gap-1.5 text-xs text-muted">
          <CalendarDays size={15} className="shrink-0" />
          <span className="truncate">
            {dueDate ? `Due ${dueDate}` : "No due date"}
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;