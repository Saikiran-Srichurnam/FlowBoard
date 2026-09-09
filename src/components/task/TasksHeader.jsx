import Button from "../ui/Button"
import { Plus } from "lucide-react"
import AddNewTaskModal from "./AddNewTaskModal"
import { useTasks } from "../../context/TasksContext"

function TasksHeader() {

  // show task modal
  const { showModal, setShowModal } = useTasks()

  const handleAddTaskBtn = () => {
    document.body.style.overflow = "hidden"
    setShowModal(true)
  }

  return (
    <section id='TasksHeader' className='flex justify-between items-center'>
      <div>
        <h1 className='text-heading text-lg font-semibold'>Tasks</h1>
        <p className='text-muted text-sm'>Manage and track your Tasks</p>
      </div>
      <Button onClick={handleAddTaskBtn} ><Plus size={24} />New Task</Button>

      {/* conditional rendering of modal */}
      {showModal && <AddNewTaskModal showModal={showModal} setShowModal={setShowModal} />}
    </section >
  )
}

export default TasksHeader