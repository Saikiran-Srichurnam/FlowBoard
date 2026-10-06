import { useKanban } from "../../context/KanbanContext"
import KanbanTaskCard from "./KanbanTaskCard"
import { useDroppable } from "@dnd-kit/core"

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

  return (
    <div className="bg-background h-full">
      {!filteredTasks?.length ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 text-center">
          <p className="text-sm font-semibold text-heading">
            No tasks available
          </p>

          <p className="mt-1 text-xs text-muted">
            Your Kanban board is empty. Add a task from the Tasks page.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 text-surface gap-1">
          {kanban.map((column) => {
            const { setNodeRef, isOver } = useDroppable({
              id: column.status,
            })


            const columnTasks = filteredTasks?.filter(
              (task) => task.status === column.status
            ) || []

            return (
              <div
                ref={setNodeRef}
                key={`kanban-${column.status}`}
                className={` relative p-2 text-sm font-semibold border shadow-sm rounded-md 
              ${getStatusColor(column.status)}
              ${isOver
                    ? "border-primary ring-2 ring-primary/40 scale-[1.01] duration-300 transition-all"
                    : "border-border"
                  }`}
              >
                <div title={column.title}>
                  <div className="flex items-center justify-between mb-3">
                    <h1>{column.status}</h1>
                    <span className="px-2 py-1 rounded-full bg-surface text-heading text-xs border border-border">
                      {columnTasks.length}
                    </span>
                  </div>

                  {/* Tasks / Empty State */}
                  {columnTasks.length > 0 ? (
                    columnTasks.map((task) => (
                      <KanbanTaskCard
                        id={task.id}
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        dueDate={task.dueDate}
                        assignee={task.assignee}
                        status={task.status}
                      />
                    ))
                  ) : (
                    <div className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 px-4 text-center">
                      <p className="text-xs font-medium text-muted">
                        No tasks here
                      </p>

                      <p className="mt-1 text-[10px] text-muted">
                        Drag a task here to move it
                      </p>
                    </div>
                  )}
                </ div>
              </div>
            )
          })}
        </div>
      )}
    </div >
  )
}

export default kanbanColumn