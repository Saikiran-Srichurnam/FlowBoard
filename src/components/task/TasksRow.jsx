import { MoreVertical } from "lucide-react"
import { useState } from "react"
import { useTasks } from "../../context/TasksContext"

function TasksRow({
  id,
  title,
  status,
  priority,
  projectId,
  assignee,
  dueDate,
}) {

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "bg-red-400"
      case "In Progress":
        return "bg-yellow-500"
      case "Review":
        return "bg-blue-500"
      case "Done":
        return "bg-success"
      default:
        return "bg-gray-400"
    }
  }

  const [activeMenu, setActiveMenu] = useState(false)

  const { handleEditTask, tasks, deleteTask } = useTasks()

  const handleEdit = () => {
    handleEditTask(id)
    setActiveMenu(false)
  }

  const handleDeleteTask = () => {
    const task = tasks.find((t) => t.id === id)

    const confirmed = window.confirm(
      `Would you like to Delete ${task.title}`
    )

    if (confirmed) {
      deleteTask(id)
      setActiveMenu(false)
    }
  }

  return (
    <div
      id={id}
      className="relative min-w-[900px] grid grid-cols-[minmax(220px,2fr)_1fr_1fr_1fr_1fr_1fr_40px] items-center border-b border-border px-5 py-4 text-xs last:border-b-0 hover:bg-slate-50 transition-colors gap-2"
    >

      {/* Task Title */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-medium truncate">
          {title}
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${getStatusColor(status)}`}
        />
        <span className="truncate">
          {status}
        </span>
      </div>

      {/* Priority */}
      <div className="flex items-center gap-2">
        <span>{priority}</span>
      </div>

      {/* Project */}
      <div className="flex items-center gap-1">
        <span>{projectId}</span>
      </div>

      {/* Assignee */}
      <div className="flex items-center gap-1">
        <div className="flex -space-x-2">
          {assignee &&
            assignee.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="h-6 w-6 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center text-xs font-medium text-primary"
                title={member}
              >
                {member.charAt(0)}
              </div>
            ))}
        </div>

        {assignee && assignee.length > 3 && (
          <span className="text-xs text-muted ml-1">
            +{assignee.length - 3}
          </span>
        )}
      </div>

      {/* Due Date */}
      <div className="text-sm">
        {dueDate}
      </div>

      {/* Menu */}
      <button
        type="button"
        onClick={() => setActiveMenu((prev) => !prev)}
        className="flex justify-center items-center rounded-md cursor-pointer p-2 text-muted transition-colors hover:bg-slate-100 hover:text-heading"
      >
        <MoreVertical size={18} />
      </button>

      {/* Menu Dropdown */}
      {activeMenu && (
        <div className="absolute right-14 top-12 bg-background border border-border rounded-md text-xs z-50 flex flex-col shadow-md overflow-hidden">
          <button
            type="button"
            className="hover:bg-primary hover:text-surface text-heading py-2 px-4 cursor-pointer text-left"
            onClick={handleEdit}
          >
            Edit
          </button>

          <button
            type="button"
            className="hover:bg-red-100 hover:text-danger text-muted py-2 px-4 cursor-pointer text-left"
            onClick={handleDeleteTask}
          >
            Delete
          </button>
        </div>
      )}

    </div>
  )
}

export default TasksRow