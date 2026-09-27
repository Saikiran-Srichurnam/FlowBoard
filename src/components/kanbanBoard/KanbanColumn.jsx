import { useKanban } from "../../context/KanbanContext"

function kanbanColumn() {
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
    <div className="bg-background h-full ">
      <div className="grid lg:grid-cols-4 text-surface gap-1">
        {kanban.map((column) => (
          <div className={`p-2 text-sm font-semibold  border border-border shadow-sm rounded-md ${getStatusColor(column.status)}`}>
            <div id='kanban Columns' title={column.title} className="space-x-2">
              <h1>{column.status}</h1>
            </ div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default kanbanColumn