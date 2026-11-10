
import { ListTodo } from "lucide-react";
import TasksRow from "./TasksRow";

function TasksList({ filteredTasks = [] }) {
  const columns =
    "grid-cols-[minmax(220px,2fr)_minmax(110px,1fr)_minmax(100px,1fr)_minmax(150px,1.2fr)_minmax(130px,1fr)_minmax(120px,1fr)_40px]";

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      {filteredTasks.length > 0 ? (
        <>
          {/* Table Header */}
          <div
            className={`grid ${columns} min-w-[950px] items-center gap-3 border-b border-border bg-background px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted`}
          >
            <span>Task</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Project</span>
            <span>Assignee</span>
            <span>Due Date</span>
            <span></span>
          </div>

          {/* Task Rows */}
          {filteredTasks.map((task) => (
            <TasksRow
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              priority={task.priority}
              projectId={task.projectId}
              assignee={task.assignee || []}
              dueDate={task.dueDate}
              columns={columns}
            />
          ))}
        </>
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

export default TasksList;
