import { useState } from 'react'
import Input from '../ui/Input/Input'
import { ChevronDown } from 'lucide-react'
import ProjectViewToggle from './ProjectViewToggle'

function ProjectSearchAndFilter({
  search,
  setSearch,
  selectedOption,
  setSelectedOption,
  selectedSortOption,
  setSelectedSortOption,
  view,
  setView,
}) {

  const projectStatuses = [
    { value: "All" },
    { value: "Active" },
    { value: "Completed" },
    { value: "On Hold" },
  ]

  const sortOrder = [
    { value: "latest", label: "Latest" },
    { value: "alphabetical", label: "Alphabetical" },
    { value: "oldest", label: "Oldest" }
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  return (
    <section
      id="ProjectSearchAndFilter"
      className="flex flex-col lg:flex-row gap-2 w-full"
    >

      {/* Search + All Projects */}
      <div className="flex items-center gap-2 w-full lg:flex-1">

        {/* Search */}
        <div className="min-w-0 flex-1">
          <Input
            name="search"
            id="search"
            type="text"
            placeholder="Search Projects ..."
            className="h-10 w-full px-3 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* All Projects */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-24 sm:w-32 items-center justify-between rounded-md border border-primary/30 bg-background px-3 text-xs text-heading cursor-pointer"
          >
            <span className="truncate">
              {selectedOption}
            </span>

            <ChevronDown
              size={18}
              className={`shrink-0 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <ul className="absolute left-0 mt-2 z-50 w-40 sm:w-48 rounded-md border border-primary/10 bg-background text-xs shadow-md">
              {projectStatuses.map((projectStatus) => (
                <li
                  key={projectStatus.value}
                  className="cursor-pointer px-2 py-2 text-primary/60 hover:bg-primary/10 hover:text-primary hover:font-semibold"
                  onClick={() => {
                    setSelectedOption(projectStatus.value)
                    setIsOpen(false)
                  }}
                >
                  {projectStatus.value}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

      {/* Sort + Grid/List */}
      <div className="flex items-center gap-2 w-full lg:w-auto">

        {/* Sort */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex h-10 w-24 sm:w-32 items-center justify-between rounded-md border border-primary/30 bg-background px-3 text-xs text-heading cursor-pointer"
          >
            <span className="truncate">
              {selectedSortOption}
            </span>

            <ChevronDown
              size={18}
              className={`shrink-0 transition-transform duration-300 ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortOpen && (
            <ul className="absolute right-0 mt-2 z-50 w-40 sm:w-48 rounded-md border border-primary/10 bg-background text-xs shadow-md">
              {sortOrder.map((order) => (
                <li
                  key={order.value}
                  className="cursor-pointer px-2 py-2 text-primary/60 hover:bg-primary/10 hover:text-primary hover:font-semibold"
                  onClick={() => {
                    setSelectedSortOption(order.label)
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
          <ProjectViewToggle
            view={view}
            setView={setView}
          />
        </div>

      </div>

    </section>
  )
}

export default ProjectSearchAndFilter