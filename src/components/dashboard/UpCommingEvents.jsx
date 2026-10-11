import { useTasks } from "../../context/TasksContext";

function UpCommingEvents() {

  const getEventClass = (status) => {
    switch (status) {
      case "To Do":
        return "bg-red-50 text-red-500";

      case "In Progress":
        return "bg-yellow-50 text-yellow-500";

      case "Review":
        return "bg-primary/10 text-primary";

      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const { tasks = [] } = useTasks();

  const parseDate = (value) => {
    if (!value) return null;

    // Handles date strings such as "2026-10-15"
    if (
      typeof value === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      const [year, month, day] = value.split("-").map(Number);
      return new Date(year, month - 1, day);
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTasks = tasks
    .map((task) => ({
      ...task,
      deadline: parseDate(task.dueDate),
    }))
    .filter(
      (task) =>
        task.deadline &&
        task.deadline >= today &&
        task.status !== "Done"
    )
    .sort((a, b) => a.deadline - b.deadline)
    .slice(0, 3);

  return (
    <section
      id="upcoming-deadlines"
      className="h-64 w-full rounded-md border border-border bg-surface p-5 shadow-sm md:h-full"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-heading">
          Upcoming Deadlines
        </h2>
      </div>

      <hr className="border-border opacity-50" />

      {upcomingTasks.length > 0 ? (
        <div className="mt-3 flex flex-col gap-4">
          {upcomingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3"
            >
              <span
                className={`flex h-12 w-12 flex-col items-center justify-center rounded-lg p-2 ${getEventClass(task.status)}`}
              >
                <p className="text-xs">{task.deadline.toLocaleString("en-US", { month: "short" })}</p>
                <h1 className="text-lg">{task.deadline.getDate()}</h1>
              </span>

              <h3 className="min-w-0 flex-1 truncate text-sm font-medium text-heading">
                {task.title}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-36 items-center justify-center text-center">
          <p className="text-sm text-muted">
            No upcoming task deadlines
          </p>
        </div>
      )}
    </section>
  );
}

export default UpCommingEvents;