import { TasksGrid, TasksHeader, TasksList, TasksSearchAndFilter, TasksViewToggle } from "../../components/task"
import { useState } from "react"
import { useTasks } from "../../context/TasksContext";

function TaskPage() {

  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("All")
  const [selectedPriorityOption, setSelectedPriorityOption] = useState("All")

  const { tasks = [] } = useTasks();

  const filteredTasks = tasks.filter((t) => {
    const matchedTask = t.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchedStatus = selectedOption === "All" || t.status === selectedOption;

    const matchedPriority = selectedPriorityOption === "All" || t.priority === selectedPriorityOption

    return matchedTask && matchedStatus && matchedPriority
  })

  return (
    <section id='TasksPage' className='bg-surface h-full w-full p-6 shadow-sm border border-border rounded-md space-y-2'>
      {/* task header where title and add task button exists  */}
      <TasksHeader />
      <div className='mt-8 flex items-center justify-between gap-4'>
        <TasksSearchAndFilter
          search={search}
          setSearch={setSearch}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedPriorityOption={selectedPriorityOption}
          setSelectedPriorityOption={setSelectedPriorityOption}
        />
        <TasksViewToggle
          view={view}
          setView={setView}
        />
      </div>

      <div className="my-4">
        {view === "grid" ?
          <TasksGrid filteredTasks={filteredTasks} />
          : <TasksList filteredTasks={filteredTasks} />
        }
      </div>
    </section>
  )
}

export default TaskPage