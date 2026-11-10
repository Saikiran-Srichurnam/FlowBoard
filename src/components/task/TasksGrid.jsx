
import { ListTodo } from "lucide-react";
import TasksCard from "./TasksCard";

function TasksGrid({ filteredTasks = [] }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3 sm:p-4">
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredTasks.map((task) => (
            <TasksCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              priority={task.priority}
              projectId={task.projectId}
              assignee={task.assignee}
              dueDate={task.dueDate}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center px-4 py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ListTodo size={26} />
          </div>

          <h3 className="text-base font-semibold text-heading">
            No tasks found
          </h3>

          <p className="mt-1 max-w-xs text-sm leading-6 text-muted">
            No tasks match your current search or filters. Try adjusting your
            filters to see more tasks.
          </p>
        </div>
      )}
    </div>
  );
}

export default TasksGrid;
