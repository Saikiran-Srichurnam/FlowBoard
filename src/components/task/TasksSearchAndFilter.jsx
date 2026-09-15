import { useState } from 'react'
import Input from '../ui/Input/Input'
import { ChevronDown } from 'lucide-react';

function TasksSearchAndFilter({
  search,
  setSearch,
  selectedOption,
  setSelectedOption,
  selectedPriorityOption,
  setSelectedPriorityOption
}) {

  // task statuses
  const tasksStatuses = [
    { value: "All" },
    { value: "To Do" },
    { value: "In Progress" },
    { value: "Review" },
    { value: "Done" },
  ];

  const sortOrder = [
    { value: "All", label: "All" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" }
  ]

  // dropdown of status
  const [isOpen, setIsOpen] = useState(false)
  // dropdown for sorting
  const [isSortOpen, setIsSortOpen] = useState(false)



  return (
    <section id='TasksSearchAndFilter' className='flex gap-2'>
      <Input
        name="search"
        id="search"
        type="text"
        placeholder="Search Tasks ..."
        className="h-10 w-80 lg:w-96 px-3 text-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* project status filter */}
      <div>
        {/* Selected value */}
        <button id='All Tasks' onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center h-10 text-heading text-xs md:text-sm bg-background w-24 lg:w-32 focus-visible:bg-background rounded-md border border-primary/30 outline-none px-4 py-2 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 cursor-pointer"
        >
          <span className='text-xs'>{selectedOption}</span>
          <ChevronDown size={24} className={`transition-transform transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <ul
            className="absolute mt-2 w-48 flex flex-col z-50 rounded-md border border-primary/10 bg-background shadow-md
          text-xs">
            {
              tasksStatuses.map((taskStatus => (
                <li key={taskStatus.value} value={taskStatus.value} className=" text-primary/60 pl-2 py-1 hover:bg-primary/10 hover:text-primary hover:font-semibold duration-300 cursor-pointer"
                  onClick={() => {
                    setSelectedOption(taskStatus.value)
                    setIsOpen(false)
                  }}>{taskStatus.value}</li>
              )))
            }
          </ul>
        )}
      </div>
      <div>
        <button id='Sort' onClick={() => setIsSortOpen(!isSortOpen)}
          className="flex justify-between items-center h-10 text-heading text-xs md:text-sm bg-background w-24 lg:w-32 focus-visible:bg-background rounded-md border border-primary/30 outline-none px-4 py-2 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 cursor-pointer"
        >
          <span className='text-xs'>{selectedPriorityOption}</span>
          <ChevronDown size={24} className={`transition-transform transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
        </button>
        {isSortOpen && (


          <ul
            className="absolute mt-2 w-48 flex flex-col z-50 rounded-md border border-primary/10 bg-background shadow-md
          text-xs">
            {sortOrder.map((order) => (
              <li
                key={order.value}
                className="text-primary/60 pl-2 py-1 hover:bg-primary/10 hover:text-primary hover:font-semibold duration-300 cursor-pointer"
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

    </section>
  )
}

export default TasksSearchAndFilter