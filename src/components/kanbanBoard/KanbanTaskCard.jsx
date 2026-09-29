import { Calendar, Flag, MoreVertical } from "lucide-react"
import { useState } from "react";


function KanbanTaskCard({
  id,
  title,
  description,
  priority,
  className,
  dueDate,
  assignee,
}) {

  // edit task functionality
  const [activeMenu, setActiveMenu] = useState(false);

  const handleMenuButton = () => {
    setActiveMenu(prev => !prev)
  }
  return (
    <div key={id}
      className="group relative rounded-2xl border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl mt-2" >
      {/* showing title, edit button and description */}
      <div className="space-y-2">
        <span className="flex justify-between items-center">
          <h1 className="text-heading ">{title}</h1>
          {/* More button */}
          <button
            type="button"
            className="rounded-md p-1.5 text-muted transition-colors hover:bg-slate-100 hover:text-heading"
            aria-label={`More options for ${title}`}
            onClick={handleMenuButton}
          >
            <MoreVertical size={18} />
          </button>
          {activeMenu ? (
            <div className="absolute right-8 mt-12 w-24 bg-background border border-border  rounded-lg text-sm font-semibold z-10 space-y-2 flex flex-col ">
              <button className="hover:text-primary hover:bg-primary/10 p-1 rounded-lg " onClick="">Edit</button>
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