import { useState } from 'react'
import Input from '../ui/Input/Input'
import { ChevronDown } from 'lucide-react'
import TasksViewToggle from './TasksViewToggle'

function TasksSearchAndFilter({
  search,
  setSearch,
  selectedOption,
  setSelectedOption,
  selectedPriorityOption,
  setSelectedPriorityOption,
  view,
  setView,
}) {

  const tasksStatuses = [
    { value: "All" },
    { value: "To Do" },
    { value: "In Progress" },
    { value: "Review" },
    { value: "Done" },
  ]

  const sortOrder = [
    { value: "All", label: "All" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" }
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  return (
    <section
      id="TasksSearchAndFilter"
      className="flex flex-col lg:flex-row items-center gap-2 w-full"
    >
      {/* Search + Status */}
      <div className="flex items-center gap-2 w-full lg:flex-1">

        {/* Search */}
        <div className="min-w-0 flex-1">
          <Input
            name="task search"
            id="Task Search"
            type="text"
            placeholder="Search Tasks ..."
            className="h-10 w-full min-w-0 px-3 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-24 lg:w-32 items-center justify-between rounded-md border border-primary/30 bg-background px-3 text-xs text-heading cursor-pointer"
          >
            <span>{selectedOption}</span>

            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {isOpen && (
            <ul className="absolute left-0 mt-2 z-50 w-48 rounded-md border border-primary/10 bg-background text-xs shadow-md">
              {tasksStatuses.map((taskStatus) => (
                <li
                  key={taskStatus.value}
                  className="cursor-pointer px-2 py-2 text-primary/60 hover:bg-primary/10 hover:text-primary"
                  onClick={() => {
                    setSelectedOption(taskStatus.value)
                    setIsOpen(false)
                  }}
                >
                  {taskStatus.value}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Priority + Grid/List */}
      <div className="flex items-center gap-2 w-full lg:w-auto">

        {/* Priority */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex h-10 w-24 lg:w-32 items-center justify-between rounded-md border border-primary/30 bg-background px-3 text-xs text-heading cursor-pointer"
          >
            <span>{selectedPriorityOption}</span>

            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {isSortOpen && (
            <ul className="absolute right-0 mt-2 z-50 w-48 rounded-md border border-primary/10 bg-background text-xs shadow-md">
              {sortOrder.map((order) => (
                <li
                  key={order.value}
                  className="cursor-pointer px-2 py-2 text-primary/60 hover:bg-primary/10 hover:text-primary"
                  onClick={() => {
                    setSelectedPriorityOption(order.label)
                    setIsSortOpen(false)
                  }}
                >
                  {order.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Grid / List */}
        <div className="shrink-0">
          <TasksViewToggle
            view={view}
            setView={setView}
          />
        </div>

      </div>
    </section>
  )
}

export default TasksSearchAndFilter