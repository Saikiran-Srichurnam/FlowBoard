import { KanbanBoard, KanbanHeader } from "../../components/kanbanBoard";


function KanbanBoardPage() {

  return (
    <section id='TasksPage' className='bg-surface h-full w-full p-6 shadow-sm border border-border rounded-md space-y-2'>
      <KanbanHeader />
      {/* <KanbanBoard /> */}

    </section>
  )
}

export default KanbanBoardPage