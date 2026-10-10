import {
  ClipboardPenLine,
  CircleCheck,
  Hourglass,
  Users2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TasksContext";

function StatsOverview() {
  const { projects = [] } = useProjects();
  const { tasks = [] } = useTasks();

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const teamMembers = new Set(
    projects.flatMap((project) =>
      Array.isArray(project.members) ? project.members : []
    )
  ).size;

  // Example previous-week values
  const previousWeek = {
    projects: 5,
    completedTasks: 2,
    inProgressTasks: 4,
    teamMembers: 3,
  };

  // Calculate percentage change
  const calculatePerformance = (current, previous) => {
    if (previous === 0) return 0;

    return Math.round(
      ((current - previous) / previous) * 100
    );
  };

  const statsData = [
    {
      symbol: ClipboardPenLine,
      symbolClass: "bg-primary/10 text-primary",
      name: "Total Projects",
      total: projects.length,
      performance: calculatePerformance(
        projects.length,
        previousWeek.projects
      ),
    },
    {
      symbol: CircleCheck,
      symbolClass: "bg-success/10 text-success",
      name: "Tasks Completed",
      total: completedTasks,
      performance: calculatePerformance(
        completedTasks,
        previousWeek.completedTasks
      ),
    },
    {
      symbol: Hourglass,
      symbolClass: "bg-yellow-100 text-yellow-600",
      name: "In Progress",
      total: inProgressTasks,
      performance: calculatePerformance(
        inProgressTasks,
        previousWeek.inProgressTasks
      ),
    },
    {
      symbol: Users2,
      symbolClass: "bg-primary/10 text-blue-500",
      name: "Team Members",
      total: teamMembers,
      performance: calculatePerformance(
        teamMembers,
        previousWeek.teamMembers
      ),
    },
  ];

  return (
    <section
      id="StatsOverview"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {statsData.map((data) => {
        const Icon = data.symbol;
        const isIncreasing = data.performance > 0;
        const ArrowIcon = isIncreasing ? ArrowUp : ArrowDown;

        return (
          <div
            key={data.name}
            className="min-w-0 space-y-4 rounded-xl border border-border bg-surface p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${data.symbolClass}`}
              >
                <Icon size={24} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-sm text-muted">
                  {data.name}
                </h2>

                <p className="text-2xl font-semibold text-heading">
                  {data.total}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
              <span
                className={`inline-flex items-center gap-1 font-medium ${isIncreasing ? "text-success" : "text-danger"
                  }`}
              >
                <ArrowIcon size={16} />
                {Math.abs(data.performance)}%
              </span>

              <span className="text-muted">
                from last week
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default StatsOverview;