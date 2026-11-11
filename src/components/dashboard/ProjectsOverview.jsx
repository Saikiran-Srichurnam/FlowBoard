import { BookOpenText, ArrowRight } from "lucide-react";
import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TasksContext";
import { useNavigate } from "react-router-dom";

function ProjectOverview() {
  const { projects = [] } = useProjects();
  const { tasks = [] } = useTasks();

  const columns = [
    {
      title: "To Do",
      colorClass: "bg-danger/10 text-danger",
      borderClass: "border-l-danger",
    },
    {
      title: "In Progress",
      colorClass: "bg-warning/10 text-warning",
      borderClass: "border-l-warning",
    },
    {
      title: "Review",
      colorClass: "bg-primary/10 text-primary",
      borderClass: "border-l-primary",
    },
    {
      title: "Done",
      colorClass: "bg-success/10 text-success",
      borderClass: "border-l-success",
    },
  ];

  const getProjectName = (projectId) => {
    const project = projects.find(
      (project) => String(project.id) === String(projectId)
    );

    return project?.name ?? "Unknown Project";
  };

  const formatDate = (date) => {
    if (!date) return "No due date";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getMemberCount = (assignee) => {
    if (Array.isArray(assignee)) return assignee.length;
    return assignee ? 1 : 0;
  };

  const navigate = useNavigate();

  return (
    <section
      id="ProjectOverview"
      className="w-full min-w-0 space-y-5 rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <BookOpenText size={22} className="shrink-0 text-primary" />

          <h2 className="truncate font-semibold text-heading">
            Project Overview
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate("/kanban-Board")}
          className="flex shrink-0 items-center gap-1 rounded-md text-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          View Board
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Task Status Columns */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.title
          );

          return (
            <div
              key={column.title}
              className="min-w-0 rounded-lg border border-border bg-background p-2"
            >
              {/* Column Header */}
              <div
                className={`flex items-center justify-between gap-2 rounded-md border border-border p-3 text-sm font-semibold ${column.colorClass}`}
              >
                <h3 className="text-xs">{column.title}</h3>

                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-surface px-1 text-xs">
                  {columnTasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="mt-2 space-y-2">
                {columnTasks.length === 0 ? (
                  <div className="flex min-h-24 items-center justify-center rounded-md border border-dashed border-border px-3 text-center text-xs text-muted">
                    No tasks in this column
                  </div>
                ) : (
                  columnTasks.slice(0, 3).map((task) => {
                    const memberCount = getMemberCount(task.assignee);

                    return (
                      <div
                        key={task.id}
                        className={`space-y-3 rounded-md border border-border border-l-2 ${column.borderClass} bg-surface p-3 shadow-sm transition-all duration-200 hover:shadow-md`}
                      >
                        <div className="space-y-1">
                          <h4 className="wrap-break-words text-sm font-medium text-heading">
                            {task.title}
                          </h4>

                          <p className="truncate text-xs text-muted">
                            {getProjectName(task.projectId)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 text-xs text-muted">
                          <span>
                            {memberCount}{" "}
                            {memberCount === 1 ? "member" : "members"}
                          </span>

                          <span className="shrink-0">
                            {formatDate(task.dueDate)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}

                {columnTasks.length > 3 && (
                  <p className="px-2 py-1 text-center text-xs text-muted">
                    +{columnTasks.length - 3} more tasks
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProjectOverview;