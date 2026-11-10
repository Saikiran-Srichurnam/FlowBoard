
import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import Input from '../ui/Input/Input'
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

  const priorityOptions = [
    { value: "All" },
    { value: "High" },
    { value: "Medium" },
    { value: "Low" },
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  const dropdownClass =
    "absolute z-50 mt-2 w-full min-w-32 overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-xl"

  const optionClass = (selected) =>
    `w-full px-3 py-2.5 text-left text-xs transition-colors hover:bg-surface-hover ${
      selected
        ? "bg-primary/10 font-semibold text-primary"
        : "text-body"
    }`

  return (
    <section
      id="TasksSearchAndFilter"
      className="flex w-full flex-col gap-3 lg:flex-row lg:items-center"
    >
      {/* Search and Status */}
      <div className="flex min-w-0 w-full items-center gap-2 lg:flex-1">

        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />

          <Input
            name="task search"
            id="Task Search"
            type="text"
            placeholder="Search tasks..."
            className="h-10 w-full min-w-0 pl-9 pr-3 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen)
              setIsSortOpen(false)
            }}
            aria-label="Filter tasks by status"
            aria-expanded={isOpen}
            className="flex h-10 w-28 items-center justify-between gap-1 rounded-lg border border-border bg-background px-3 text-xs font-medium text-heading transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:w-32"
          >
            <span className="truncate">{selectedOption}</span>
            <ChevronDown
              size={16}
              className={`shrink-0 text-muted transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <ul className={dropdownClass}>
              {tasksStatuses.map((status) => (
                <li key={status.value}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedOption(status.value)
                      setIsOpen(false)
                    }}
                    className={optionClass(selectedOption === status.value)}
                  >
                    {status.value}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Priority and View Toggle */}
      <div className="flex w-full items-center justify-between gap-2 lg:w-auto lg:justify-start">

        {/* Priority Filter */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => {
              setIsSortOpen(!isSortOpen)
              setIsOpen(false)
            }}
            aria-label="Filter tasks by priority"
            aria-expanded={isSortOpen}
            className="flex h-10 w-28 items-center justify-between gap-1 rounded-lg border border-border bg-background px-3 text-xs font-medium text-heading transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:w-32"
          >
            <span className="truncate">
              {selectedPriorityOption === "All"
                ? "Priority: All"
                : selectedPriorityOption}
            </span>

            <ChevronDown
              size={16}
              className={`shrink-0 text-muted transition-transform duration-200 ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortOpen && (
            <ul className={`${dropdownClass} right-0`}>
              {priorityOptions.map((priority) => (
                <li key={priority.value}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPriorityOption(priority.value)
                      setIsSortOpen(false)
                    }}
                    className={optionClass(
                      selectedPriorityOption === priority.value
                    )}
                  >
                    {priority.value === "All"
                      ? "All Priorities"
                      : priority.value}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Grid / List Toggle */}
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
