import { ChevronDown } from "lucide-react"
import Input from "../ui/Input/Input"
import { useState } from "react"

function KanbanHeader({
  search,
  setSearch,
  selectedPriorityOption,
  setSelectedPriorityOption,
}) {
  const sortOrder = [
    { value: "All", label: "All" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" }
  ]

  const [isSortOpen, setIsSortOpen] = useState(false)

  return (
    <section
      id="KanbanHeader"
      className="flex flex-col gap-3 mb-4 lg:flex-row lg:items-center lg:justify-between"
    >

      {/* Title */}
      <div>
        <h1 className="text-heading text-lg font-semibold">
          Kanban
        </h1>

        <p className="text-muted text-sm">
          Visualize and manage your different tasks over different stages
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

        {/* Search */}
        <Input
          name="task search"
          id="Task Search"
          type="text"
          placeholder="Search Tasks ..."
          className="h-10 w-full sm:w-64 lg:w-80 xl:w-96 px-3 text-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Priority Filter */}
        <div className="relative">
          <button
            id="Sort"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex justify-between items-center h-10 text-heading text-xs md:text-sm bg-background w-full sm:w-24 lg:w-32 focus-visible:bg-background rounded-md border border-primary/30 outline-none px-4 py-2 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 cursor-pointer"
          >
            <span className="text-xs">
              {selectedPriorityOption}
            </span>

            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {isSortOpen && (
            <ul className="absolute right-0 mt-2 w-48 flex flex-col z-50 rounded-md border border-primary/10 bg-background shadow-md text-xs">
              {sortOrder.map((order) => (
                <li
                  key={order.value}
                  className="text-primary/60 pl-2 py-2 hover:bg-primary/10 hover:text-primary hover:font-semibold duration-300 cursor-pointer"
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

      </div>
    </section>
  )
}

export default KanbanHeader