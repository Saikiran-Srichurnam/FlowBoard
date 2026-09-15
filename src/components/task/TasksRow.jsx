import { MoreVertical } from "lucide-react"
import { useState } from "react"

function TasksRow({
  id,
  title,
  status,
  priority,
  projectId,
  assignee,
  dueDate,
}) {

  // Helper to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return "bg-red-400"
      case 'In Progress':
        return "bg-yellow-500"
      case 'Review':
        return '"bg-blue-500'
      case "Done":
        return "bg-success"
      default:
        return 'bg-gray-400'
    }
  }

  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuButton = () => {
    setActiveMenu(prev => !prev)
  }
  return (
    < div
      id={id}
      className="grid grid-cols-[repeat(6,1fr)_40px] items-center border-b border-border px-5 py-4 text-xs last:border-b-0 hover:bg-slate-50 transition-colors gap-2"
    >
      {/* Task Title */}
      < div className="flex items-center gap-2 min-w-0" >
        < span className="font-medium truncate" > {title}</span >
      </div >

      {/* Status with color indicator */}
      < div className="flex items-center gap-2" >
        <span className={`h-2 w-2 rounded-full ${getStatusColor(status)}`} />
        <span>{status}</span>
      </div >

      {/* Priority */}
      < div className={`flex items-center gap-2`} >
        <span>{priority}</span>
      </div >


      {/* Tasks */}
      < div className="flex items-center gap-1" >
        <span>{projectId}</span>
      </div >

      {/* Assignee */}
      < div className="flex items-center gap-1" >
        <div className="flex -space-x-2">
          {assignee && assignee.slice(0, 3).map((member, index) => (
            <div
              key={index}
              className="h-6 w-6 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center text-xs font-medium text-primary"
              title={member}
            >
              {member.charAt(0)}
            </div>
          ))}
        </div>
        {
          assignee && assignee.length > 3 && (
            <span className="text-xs text-muted ml-1">
              +{assignee.length - 3}
            </span>
          )
        }
      </div >

      {/* Due Date */}
      < div className="text-sm" >
        {dueDate}
      </div >


      <button
        type="button"
        className="flex justify-center items-center rounded-md cursor-pointer p-2 text-muted transition-colors hover:bg-slate-100 hover:text-heading"
      >
        <MoreVertical size={18} onClick={handleMenuButton} />
      </button>
      {
        activeMenu ? (
          <div className="absolute right-28 mt-10 bg-slate-200 border text-xs z-10  flex flex-col">
            <button className="hover:bg-primary hover:text-surface text-heading py-1 px-2 cursor-pointer" onClick={handleEdit}>Edit</button>
            <button className="hover:bg-red-100 hover:text-danger text-muted py-1 rounded-md px-2 cursor-pointer" onClick={handleDelete}>Delete</button>
          </div>
        ) : ""
      }
    </div >
  )
}

export default TasksRow