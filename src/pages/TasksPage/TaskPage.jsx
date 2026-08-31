import { TasksHeader, TasksSearchAndFilter, TasksViewToggle } from "../../components/task"
import { useState } from "react"

function TaskPage() {

  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("All")
  const [selectedSortOption, setSelectedSortOption] = useState("latest")

  return (
    <section id='TasksPage' className='bg-surface h-full w-full p-6 shadow-sm border border-border rounded-md space-y-2'>
      {/* task header where title and add task button exists  */}
      <TasksHeader />
      {/* <div className='mt-8 flex items-center justify-between gap-4'>
        <TasksSearchAndFilter
          search={search}
          setSearch={setSearch}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedSortOption={selectedSortOption}
          setSelectedSortOption={setSelectedSortOption}
        />
        <TasksViewToggle
          view={view}
          setView={setView}
        />
      </div> */}
    </section>
  )
}

export default TaskPage