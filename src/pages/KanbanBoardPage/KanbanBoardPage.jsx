import { useState } from "react";
import { KanbanColumn, KanbanHeaderAndSearch } from "../../components/kanbanBoard";
import { useTasks } from "../../context/TasksContext";


function KanbanBoardPage() {

  const [search, setSearch] = useState("");
  const [selectedPriorityOption, setSelectedPriorityOption] = useState("All")

  const { tasks } = useTasks()

  const filteredTasks = tasks.filter((t) => {
    const matchedTask = t.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchedPriority = selectedPriorityOption === "All" || t.priority === selectedPriorityOption

    return matchedTask && matchedPriority
  })

  return (
    <section id='TasksPage' className='bg-surface h-full w-full p-6 shadow-sm border border-border rounded-md space-y-2'>
      <KanbanHeaderAndSearch
        search={search}
        setSearch={setSearch}
        selectedPriorityOption={selectedPriorityOption}
        setSelectedPriorityOption={setSelectedPriorityOption}
      />
      <KanbanColumn
        filteredTasks={filteredTasks}
      />
    </section>
  )
}

export default KanbanBoardPage