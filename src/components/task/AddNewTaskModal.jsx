import { ChevronDown, X } from "lucide-react"
import Input from "../ui/Input/Input"
import Button from "../ui/Button"
import { useState } from "react"
import { useTasks } from "../../context/TasksContext";

function AddNewTaskModal() {

  // Task statuses
  const tasksStatuses = [
    { value: "All" },
    { value: "To Do" },
    { value: "In Progress" },
    { value: "Review" },
    { value: "Done" },
  ];

  const [isOpen, setIsOpen] = useState(false)
  const [optionSelect, setOptionSelect] = useState("All")

  // importing functions from the task context
  const { handleCloseModal } = useTasks()

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[6vh]">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" onClick={handleCloseModal} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm px-6 py-4 text-black bg-background border rounded-lg shadow-xl space-y-2 overflow-hidden text-sm">

        <button className='absolute right-4 top-4 cursor-pointer' onClick={handleCloseModal}><X size={24} /></button>
        <h1 className='text-center text-2xl'>Add Task</h1>
        <div className='flex flex-col gap-2'>
          <Input
            type="text"
            label="Project Name"
            placeholder="Eg: E-commerce Platform"
            required
          />
          <Input
            type="text"
            label="description"
            placeholder="Eg: Create User Login Page"
          />

          <div className='flex justify-between items-center gap-6'>
            <div className="flex justify-center items-center gap-2">
              {/* status button */}
              <h2 >Status</h2>
              <div>
                {/* Selected value */}
                <button id='All Projects'
                  className="flex justify-between items-center h-10 text-heading text-xs md:text-sm bg-background w-24 lg:w-32 focus-visible:bg-background rounded-md border border-primary/30 outline-none px-4 py-2 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 cursor-pointer" onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="text-xs">{optionSelect}</span>
                  <ChevronDown size={24} className={`transition-transform transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <ul
                    className="absolute mt-2 w-48 flex flex-col z-50 rounded-md border border-primary/10 bg-background shadow-md">
                    {
                      tasksStatuses.map((tasksStatus => (
                        <li key={tasksStatus.value} value={tasksStatus.value} className=" text-primary/60 pl-2 py-1 hover:bg-primary/10 hover:text-primary hover:font-semibold duration-300 cursor-pointer"
                          onClick={() => {
                            setOptionSelect(tasksStatus.value)
                            setIsOpen(false)
                          }}>{tasksStatus.value}</li>
                      )))
                    }
                  </ul>
                )}
              </div>
            </div>

            {/* progress */}
            <div className='flex justify-center items-center gap-2'>
              <label htmlFor="progress">Progress</label>
              <input
                id='progress'
                type="text"
                min={0}
                max={100}
                className='bg-background rounded-md border border-primary/30 focus-visible:ring-1 focus-visible:border-primary/50 outline-none px-4 py-2 w-16 h-10'
              />
            </div>

          </div>
          <div className='flex items-center gap-2'>
            <h2>Due Date</h2>
            {/* <p>{getDueDate()}</p> */}
          </div>
          <div className=''>
            <h2>Members</h2>
            <div className='grid grid-cols-3 space-x-2'>
            </div>
          </div>
        </div>

        {/* tasks */}
        <Input
          type="text"
          label="Total Tasks"
          min={0}
          placeholder={0}
          required
        />
        <Button className="w-full mt-2">Save</Button>
      </div>
    </div>

  )
}

export default AddNewTaskModal