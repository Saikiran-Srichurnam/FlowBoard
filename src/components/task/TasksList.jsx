import TasksRow from "./TasksRow"

function TasksList({ filteredTasks }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">

      {/* Header */}
      <div className="min-w-[900px] grid grid-cols-[minmax(220px,2fr)_1fr_1fr_1fr_1fr_1fr_40px] border-b border-border px-5 py-3 text-sm font-medium text-muted gap-2">
        <span>Title</span>
        <span>Status</span>
        <span>Priority</span>
        <span>ProjectId</span>
        <span>Assignee</span>
        <span>Due Date</span>
        <span></span>
      </div>

      {/* Rows */}
      {filteredTasks.length === 0 ? (
        <div className="py-8 text-center text-muted">
          No tasks found.
        </div>
      ) : (
        filteredTasks.map((task) => (
          <TasksRow
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
        ))
      )}

    </div>
  )
}

export default TasksList