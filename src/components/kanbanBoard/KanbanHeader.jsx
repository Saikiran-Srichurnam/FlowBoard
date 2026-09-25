import { Plus } from "lucide-react"
import Button from "../ui/Button"

function KanbanHeader() {
  return (
    <section id='KanbanHeader' className='flex justify-between items-center'>
      <div>
        <h1 className='text-heading text-lg font-semibold'>Kanban</h1>
        <p className='text-muted text-sm'>Visualize and manage your different tasks over different stages</p>
      </div>
      <Button onClick="" ><Plus size={24} />New Task</Button>

      {/* conditional rendering of modal */}
      {/* {showModal && <AddNewTaskModal showModal={showModal} setShowModal={setShowModal} />} */}
    </section >
  )
}

export default KanbanHeader