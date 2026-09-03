import TasksCard from "./TasksCard"

function TasksGrid({ filteredTasks }) {
  return (
    <div className="bg-background p-4 rounded-lg border border-border shadow-sm">
      <div className=" grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
    </div>
  )
}

export default TasksGrid