import { useKanban } from "../../context/KanbanContext"
import KanbanTaskCard from "./KanbanTaskCard"

function kanbanColumn({ filteredTasks }) {
  const { kanban } = useKanban()

  // Helper to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return 'bg-red-50 text-red-500'
      case 'In Progress':
        return 'bg-yellow-50 text-yellow-500'
      case 'Review':
        return 'bg-blue-50 text-blue-500'
      case 'Done':
        return 'bg-success/10 text-success'
      default:
        return 'bg-gray-400'
    }
  }

  // getting tasks from the useTasks

  return (
    <div className="bg-background h-full">
      <div className="grid lg:grid-cols-4 text-surface gap-1">
        {kanban.map((column) => (
          <div key={`kanban-${column.status}`} className={`relative p-2 text-sm font-semibold  border border-border shadow-sm rounded-md ${getStatusColor(column.status)} z-0` }>
            <div title={column.title}>
              <h1>{column.status}</h1>
              {filteredTasks && filteredTasks.map((task) => (
                column.status === task.status &&
                (
                  <KanbanTaskCard
                    id={task.id}
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    assignee={task.assignee}
                    status={task.status}
                    className={getStatusColor(column.status)}
                  />
                )
              ))}
            </ div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default kanbanColumn