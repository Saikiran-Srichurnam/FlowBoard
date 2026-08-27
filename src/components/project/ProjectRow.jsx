import { useState } from "react"
import { MoreVertical } from "lucide-react"
import { useProjects } from "../../context/ProjectContext"

function ProjectRow(
  {
    id,
    image,
    name,
    description,
    status,
    progress,
    dueDate,
    tasks,
    members,
  }
) {


  // Helper to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500'
      case 'Completed':
        return 'bg-blue-500'
      case 'On Hold':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-400'
    }
  }

  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuButton = () => {
    setActiveMenu(prev => !prev)
  }

  const { handleEditProject, deleteProject, projects } = useProjects()

  // handle the edit project button
  const handleEdit = () => {
    handleEditProject(id)
    setActiveMenu(false)
  }

  const handleDelete = () => {
    const project = projects.find(project => project.id === id)
    const confirmed = window.confirm(
      `Would you like to Delete ${project.name}`
    )
    if (confirmed) {
      deleteProject(id)
    }
    console.log(project);
  }

  return (
    < div
      id={id}
      className="grid grid-cols-[repeat(6,1fr)_40px] items-center border-b border-border px-5 py-4 text-xs last:border-b-0 hover:bg-slate-50 transition-colors gap-2"
    >
      {/* Project Name */}
      < div className="flex items-center gap-2 min-w-0" >
        {
          image && (
            <img
              src={image}
              alt={name}
              className="w-8 h-8 rounded object-cover"
            />
          )
        }
        < span className="font-medium truncate" > {name}</span >
      </div >

      {/* Status with color indicator */}
      < div className="flex items-center gap-2" >
        <span className={`h-2 w-2 rounded-full ${getStatusColor(status)}`} />
        <span>{status}</span>
      </div >

      {/* Progress with bar */}
      < div className="flex items-center gap-2" >
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-medium">{progress}%</span>
      </div >

      {/* Tasks */}
      < div className="flex items-center gap-1" >
        <span>{tasks}</span>
      </div >

      {/* Due Date */}
      < div className="text-sm" >
        {dueDate}
      </div >

      {/* Team Members */}
      < div className="flex items-center gap-1" >
        <div className="flex -space-x-2">
          {members && members.slice(0, 3).map((member, index) => (
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
          members && members.length > 3 && (
            <span className="text-xs text-muted ml-1">
              +{members.length - 3}
            </span>
          )
        }
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


export default ProjectRow