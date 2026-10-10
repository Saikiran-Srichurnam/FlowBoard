import { Calendar, Clock, Flag, MoreVertical, } from "lucide-react"
import { useState } from "react";
import { useTasks } from "../../context/TasksContext";
import { useDraggable } from "@dnd-kit/core"

function KanbanTaskCard({
  id,
  title,
  description,
  priority,
  dueDate,
  assignee,
}) {

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useDraggable({
    id,
  })

  // Helper to get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-500'
      case 'Medium':
        return 'bg-yellow-50 text-yellow-500'
      case 'Low':
        return 'bg-success/10 text-success'
      default:
        return 'bg-gray-400 text-primary'
    }
  }

  // edit task functionality
  const [activeMenu, setActiveMenu] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false)
  const [changePriority, setChangePriority] = useState(false)

  const handleMenuButton = () => {
    if (!activeMenu) {
      setChangePriority(false)
      setChangeStatus(false)
    }
    setActiveMenu(prev => !prev)
  }

  //Task Priority
  const priorityOrder = [
    { value: "High", priorityColor: "bg-red-400" },
    { value: "Medium", priorityColor: "bg-yellow-500" },
    { value: "Low", priorityColor: "bg-success" }
  ]

  const handlePriorityBtn = () => {
    setChangePriority(prev => !prev)
  }

  const { updateTask } = useTasks()

  const handleChangePriorityOfTask = (value) => {
    updateTask(id, { priority: value });
    setActiveMenu(false);
    setChangePriority(false);
  };

  // Task statuses
  const tasksStatuses = [
    { value: "To Do", taskColor: "bg-red-400" },
    { value: "In Progress", taskColor: "bg-yellow-500" },
    { value: "Review", taskColor: "bg-blue-500" },
    { value: "Done", taskColor: "bg-success" },
  ];

  const handleStatusBtn = () => {
    setChangeStatus(prev => !prev)
  }

  const handleChangeStatusOfTask = (value) => {
    updateTask(id, { status: value });
    setActiveMenu(false);
    setChangeStatus(false);
  };


  return (
    <div
      ref={setNodeRef}
      key={id}
      className={`${isDragging ? "opacity-0" : ""} group relative rounded-2xl border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl mt-2 
      ${activeMenu
          ? "border-black/40 duration-500 z-50"
          : "border-border"
        } 
        z-10`} >

      {/* showing title, edit button and description */}
      <div className="space-y-2">
        <span className="flex justify-between items-center">
          <h1 {...listeners}
            {...attributes}
            className="text-heading cursor-grab active:cursor-grabbing touch-none">{title}</h1>
          {/* More button */}
          <button
            type="button"
            className="rounded-md p-1.5 text-muted transition-colors hover:bg-slate-100 hover:text-heading cursor-pointer"
            aria-label={`More options for ${title}`}
            onClick={handleMenuButton}
          >
            <MoreVertical size={18} />
          </button>
          {activeMenu ? (
            <div className="absolute top-16 right-0 w-36 bg-background border border-border rounded-lg text-[10px] shadow-lg z-20">
              {/* <button className={`bg-surface text-gray-600 hover:bg-slate-200 hover:text-heading duration-300 transition-all w-full p-2 cursor-pointer border-b border-border flex items-center gap-2`} onClick="">
                <Edit size={15} />
                <span>Edit</span>
              </button> */}

              {/* Change status button */}
              <button className={`bg-surface text-gray-600 hover:bg-slate-200 hover:text-heading duration-300 transition-all w-full p-2 cursor-pointer border-b border-border flex items-center gap-2`} onClick={handleStatusBtn}>
                <Clock size={15} />
                <span>Change Status</span>
              </button>
              {!changePriority && changeStatus && (
                <div className="absolute top-16 -right-1 w-28 bg-background border border-border rounded-lg text-[10px] shadow-lg text-gray-600">
                  {tasksStatuses.map((task) => (
                    <button
                      key={`task-${task.value}`}
                      type="button"
                      className="w-full p-2 flex items-center gap-2 hover:bg-slate-200 hover:text-heading cursor-pointer"
                      onClick={() => handleChangeStatusOfTask(task.value)}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${task.taskColor}`} />
                      <span>{task.value}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Change priority button */}
              <button className={`bg-surface text-gray-600 hover:bg-slate-200 hover:text-heading duration-300 transition-all w-full p-2 cursor-pointer border-b border-border flex items-center gap-2`} onClick={handlePriorityBtn}>
                <Clock size={15} />
                <span>Change Priority</span>
              </button>
              {!changeStatus && changePriority && (
                <div className="absolute top-16 -right-1 w-28 bg-background border border-border rounded-lg text-[10px] shadow-lg text-gray-600">
                  {priorityOrder.map((priority) => (
                    <button
                      key={`priority-${priority.value}`}
                      type="button"
                      className="w-full p-2 flex items-center gap-2 hover:bg-slate-200 hover:text-heading cursor-pointer"
                      onClick={() => handleChangePriorityOfTask(priority.value)}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${priority.priorityColor}`} />
                      <span>{priority.value}</span>
                    </button>
                  ))}
                </div>
              )}
              {/* <button className={`bg-surface text-gray-600 hover:bg-slate-200 hover:text-heading duration-300 transition-all w-full p-2 cursor-pointer border-b border-border flex items-center gap-2`} onClick="">
                <Trash2 size={15} />
                <span>Delete</span>
              </button> */}

            </div>
          ) : ""}
        </span>
        <h3 className="text-[10px] text-muted">{description}</h3>
      </div>

      {/* showing priority, members and last date */}
      <div className="mt-4 flex justify-between items-center text-[10px]">
        <div className="flex items-center  gap-1">
          <Flag size={15} className={getPriorityColor(priority)} />
          <span className={`px-2 py-1 ${getPriorityColor(priority)} border rounded-lg`}>{priority}</span>
        </div>
        <div className="flex justify-between items-center text-[10px] gap-1 text-gray-500">
          <Calendar size={15} />
          <p className="">
            {dueDate}
          </p>
        </div>
      </div>
      {/* Assignee */}
      <div className="flex items-center gap-3 mt-4">
        {/* Avatars */}
        <div className="flex -space-x-2">
          {assignee.slice(0, 3).map((member, index) => (
            <div
              key={index}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-slate-200 text-xs font-semibold text-heading"
              title={member}
            >
              {member
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          ))}

          {assignee.length > 3 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-slate-100 text-xs font-semibold text-muted">
              +{assignee.length - 3}
            </div>
          )}
        </div>

        {/* Assignee names */}
        <div className="flex flex-col">
          <span className="text-[11px] text-muted">
            Assigned to
          </span>

          <span className="text-[10px] font-medium text-heading">
            {assignee.join(", ")}
          </span>
        </div>
      </div>

    </div>
  )
}

export default KanbanTaskCard