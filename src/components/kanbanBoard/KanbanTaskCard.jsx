import { Calendar, Clock, Edit, Flag, MoreVertical, Trash2 } from "lucide-react"
import { useState } from "react";

function KanbanTaskCard({
  id,
  title,
  description,
  priority,
  className,
  dueDate,
  assignee,
  status,
}) {

  // edit task functionality
  const [activeMenu, setActiveMenu] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false)
  const [changePriority, setChangePriority] = useState(false)

  const handleMenuButton = () => {
    setActiveMenu(prev => !prev)
  }

  const handleChangePriority = () => {
    setChangePriority(prev => !prev)
  }

  const handleChangeStatus = () => {
    setChangeStatus(prev => !prev)
  }


  return (
    <div key={id}
      className={`group relative rounded-2xl border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl mt-2 ${activeMenu ? "border-black/40 duration-500 z-50" : "border-border"} z-10`} >
      {/* showing title, edit button and description */}
      <div className="space-y-2">
        <span className="flex justify-between items-center">
          <h1 className="text-heading ">{title}</h1>
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
              <button className={`bg-surface text-gray-600 hover:bg-slate-200 hover:text-heading duration-300 transition-all w-full p-2 cursor-pointer border-b border-border flex items-center gap-2`} onClick="">
                <Edit size={15} />
                <span>Edit</span>
              </button>
              <button className={`bg-surface text-gray-600 hover:bg-slate-200 hover:text-heading duration-300 transition-all w-full p-2 cursor-pointer border-b border-border flex items-center gap-2`} onClick={handleChangeStatus}>
                <Clock size={15} />
                <span>Change Status</span>
              </button>
              {changeStatus && (
                <div className="absolute top-16 -right-1 w-28 bg-background border border-border rounded-lg text-[10px] shadow-lg text-gray-600">

                  <button
                    type="button"
                    className="w-full p-2 flex items-center gap-2 hover:bg-slate-200 hover:text-heading cursor-pointer"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span>To Do</span>
                  </button>
                  <button
                    type="button"
                    className="w-full p-2 flex items-center gap-2 hover:bg-slate-200 hover:text-heading cursor-pointer"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                    <span>In Progress</span>
                  </button>
                  <button
                    type="button"
                    className="w-full p-2 flex items-center gap-2 hover:bg-slate-200 hover:text-heading cursor-pointer"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <span>Review</span>
                  </button>
                  <button
                    type="button"
                    className="w-full p-2 flex items-center gap-2 hover:bg-slate-200 hover:text-heading cursor-pointer"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-success" />
                    <span>Done</span>
                  </button>
                </div>
              )}
              <button className={`bg-surface text-gray-600 hover:bg-slate-200 hover:text-heading duration-300 transition-all w-full p-2 cursor-pointer border-b border-border flex items-center gap-2`} onClick={handleChangePriority}>
                <Clock size={15} />
                <span>Change Priority</span>
              </button>
              {changePriority && (
                <div className="absolute top-24 -right-1 w-28 bg-background border border-border rounded-lg text-[10px] shadow-lg text-gray-600">

                  <button
                    type="button"
                    className="w-full p-2 flex items-center gap-2 hover:bg-slate-200 hover:text-heading cursor-pointer"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span>High</span>
                  </button>
                  <button
                    type="button"
                    className="w-full p-2 flex items-center gap-2 hover:bg-slate-200 hover:text-heading cursor-pointer"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                    <span>Medium</span>
                  </button>

                  <button
                    type="button"
                    className="w-full p-2 flex items-center gap-2 hover:bg-slate-200 hover:text-heading cursor-pointer"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-success" />
                    <span>Low</span>
                  </button>
                </div>
              )}
              <button className={`bg-surface text-gray-600 hover:bg-slate-200 hover:text-heading duration-300 transition-all w-full p-2 cursor-pointer border-b border-border flex items-center gap-2`} onClick="">
                <Trash2 size={15} />
                <span>Delete</span>
              </button>

            </div>
          ) : ""}
        </span>
        <h3 className="text-[10px] text-muted">{description}</h3>
      </div>

      {/* showing priority, members and last date */}
      <div className="mt-4 flex justify-between items-center text-[10px]">
        <div className="flex items-center  gap-1">
          <Flag size={15} />
          <span className={`px-2 py-1 ${className} border rounded-lg`}>{priority}</span>
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