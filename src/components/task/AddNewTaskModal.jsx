import { ChevronDown, X } from "lucide-react"
import Input from "../ui/Input/Input"
import Button from "../ui/Button"
import { useState } from "react"
import { useTasks } from "../../context/TasksContext";

function AddNewTaskModal() {

  // Task statuses
  const tasksStatuses = [
    { value: "To Do" },
    { value: "In Progress" },
    { value: "Review" },
    { value: "Done" },
  ];

  const priorityOrder = [
    { value: "High" },
    { value: "Medium" },
    { value: "Low" }
  ]

  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [isPriorityOpen, setIsPriorityOpen] = useState(false)
  const [statusOptionSelect, setStatusOptionSelect] = useState("All")
  const [priorityOptionSelect, setPriorityOptionSelect] = useState("All")
  const [projectId, setProjectId] = useState(0)

  //Modal Data
  const [taskTitle, setTaskTitle] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskProgress, setTaskProgress] = useState(0)

  // importing functions from the task context
  const { handleCloseModal, addTasks } = useTasks()

  // function for due date
  const getDueDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // Add 7 days
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // total members present in development team
  const allTaskMembers = ["Saikiran", "Rahul", "Priya", "Ankit"]
  const [taskMembers, setTaskMembers] = useState([])

  // handling checkbox of selecting tasks members
  const pickSelectedTaskMember = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    let newMembers;
    if (isChecked) {
      newMembers = [...taskMembers, value]
    } else {
      newMembers = taskMembers.filter(member => member !== value)
    }

    console.log(newMembers);
    setTaskMembers(newMembers)
  }

  // handle save task functionality
  const handleSaveTaskBtn = () => {
    if (!taskTitle) {
      alert("Please enter the Task Title!")
      return;
    }

    if (taskMembers.length === 0) {
      alert(`Please add atleast one Task Member for the ${taskTitle} Task`)
    }

    const newTaskData = {
      id: Date.now(), // Use timestamp for unique ID
      title: taskTitle.trim(),
      description: taskDescription.trim() || "",
      status: statusOptionSelect,
      priority: priorityOptionSelect,
      projectId: Number(projectId),
      assignee: [...taskMembers],
      dueDate: getDueDate(),
    }

    addTasks(newTaskData)

    setTaskTitle("")
    setTaskDescription("")
    setStatusOptionSelect("All")
    setPriorityOptionSelect("All")
    setTaskProgress(0)
    setProjectId(0)

    handleCloseModal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[6vh]">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" onClick={handleCloseModal} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm px-6 py-4 text-black bg-background border rounded-lg shadow-xl space-y-2 overflow-hidden text-xs">

        <button className='absolute right-4 top-4 cursor-pointer' onClick={handleCloseModal}><X size={24} /></button>
        <h1 className='text-center text-2xl'>Add Task</h1>
        <div className='flex flex-col gap-2'>
          <Input
            type="text"
            label="Task Name"
            placeholder="Eg: E-commerce Platform"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
          <Input
            type="text"
            label="description"
            placeholder="Eg: Create User Login Page"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />

          <div className='flex justify-between items-center gap-2'>
            {/* task status */}
            <div className="flex justify-center items-center gap-2">
              {/* status button */}
              <h2>Status</h2>
              <div>
                {/* Selected value */}
                <button id='All Projects'
                  className="flex justify-between items-center h-10 text-heading text-xs md:text-sm bg-background w-24 lg:w-32 focus-visible:bg-background rounded-md border border-primary/30 outline-none px-4 py-2 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 cursor-pointer" onClick={() => setIsStatusOpen(!isStatusOpen)}
                >
                  <span className="text-xs">{statusOptionSelect}</span>
                  <ChevronDown size={24} className={`transition-transform transform duration-300 ${isStatusOpen ? "rotate-180" : ""}`} />
                </button>

                {isStatusOpen && (
                  <ul
                    className="absolute mt-2 w-32 flex flex-col z-50 rounded-md border border-primary/10 bg-background shadow-md">
                    {
                      tasksStatuses.map((tasksStatus => (
                        <li key={tasksStatus.value} value={tasksStatus.value} className=" text-primary/60 pl-2 py-1 hover:bg-primary/10 hover:text-primary hover:font-semibold duration-300 cursor-pointer"
                          onClick={() => {
                            setStatusOptionSelect(tasksStatus.value)
                            setIsStatusOpen(false)
                          }}>{tasksStatus.value}</li>
                      )))
                    }
                  </ul>
                )}
              </div>
            </div>

            {/* task priority */}
            <div className="flex justify-start items-center gap-2">
              {/* Priority button */}
              <h2 >Priority</h2>
              <div>
                {/* Selected value */}
                <button id='Priority Order'
                  className="flex justify-between items-center h-10 text-heading text-xs md:text-sm bg-background w-24  focus-visible:bg-background rounded-md border border-primary/30 outline-none px-4 py-2 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 cursor-pointer" onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                >
                  <span className="text-xs">{priorityOptionSelect}</span>
                  <ChevronDown size={24} className={`transition-transform transform duration-300 ${isPriorityOpen ? "rotate-180" : ""}`} />
                </button>

                {isPriorityOpen && (
                  <ul
                    className="absolute mt-2 w-24 flex flex-col z-50 rounded-md border border-primary/10 bg-background shadow-md">
                    {
                      priorityOrder.map((priority => (
                        <li key={priority.value} value={priority.value} className=" text-primary/60 pl-2 py-1 hover:bg-primary/10 hover:text-primary hover:font-semibold duration-300 cursor-pointer"
                          onClick={() => {
                            setPriorityOptionSelect(priority.value)
                            setIsPriorityOpen(false)
                          }}>{priority.value}</li>
                      )))
                    }
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className='flex justify-between items-center gap-2'>
            {/* due date */}
            <div className='flex items-center gap-2'>
              <h2>Due Date :</h2>
              <p>{getDueDate()}</p>
            </div>

            {/* progress */}
            <div className='flex justify-center items-center gap-2'>
              <label htmlFor="progress">Progress</label>
              <input
                id='progress'
                type="text"
                min={0}
                max={100}
                className='bg-background rounded-md border border-primary/30 focus-visible:ring-1 focus-visible:border-primary/50 outline-none px-4 py-2 w-16 lg:w-24 h-10'
                value={taskProgress}
                onChange={(e) => setTaskProgress(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Task Members */}
          <div className='space-y-2'>
            <h2>Members</h2>
            <div className='grid grid-cols-3 space-x-2'>
              {allTaskMembers && allTaskMembers.map((member) => (
                <span key={member} className='space-x-2'>
                  <input
                    type="checkbox"
                    name=""
                    id={member}
                    value={member}
                    onChange={pickSelectedTaskMember}
                    checked={taskMembers.includes(member)}
                  />
                  <label htmlFor={member}>{member}</label>
                </span>
              ))}
              {taskMembers.length > 0 && (
                <p className='text-xs text-muted-foreground mt-1'>
                  Selected: {taskMembers.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* project id */}
        <div className="flex justify-start items-center gap-2">
          {/* Priority button */}
          <h2 className="shrink-0">Related to Project Number :</h2>
          <Input
            type="text"
            placeholder="Eg: 1"
            value={projectId}
            onChange={(e) => setProjectId(Number(e.target.value))}
            className="h-10 w-24 lg:w-full"
            required
          />

        </div>
        <Button className="w-full mt-2" onClick={handleSaveTaskBtn}>Save</Button>
      </div>
    </div>

  )
}

export default AddNewTaskModal