import { useState } from "react";
import { KanbanColumn, KanbanHeaderAndSearch, KanbanTaskCard } from "../../components/kanbanBoard";
import { useTasks } from "../../context/TasksContext";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";


function KanbanBoardPage() {

  const [search, setSearch] = useState("");
  const [selectedPriorityOption, setSelectedPriorityOption] = useState("All")

  const { tasks, setTasks } = useTasks()

  const filteredTasks = tasks.filter((t) => {
    const matchedTask = t.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchedPriority = selectedPriorityOption === "All" || t.priority === selectedPriorityOption

    return matchedTask && matchedPriority
  })

  // Drag and Drop functionality
  const [activeTask, setActiveTask] = useState(null)

  const handleDragStart = (event) => {
    const task = tasks.find((task) => task.id === event.active.id)

    setActiveTask(task)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null)
      return
    }

    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );

    console.log("Dragged task:", active.id)
    console.log("Dropped on column:", over.id)
    setActiveTask(null)
  };

  const handleDragCancel = () => {
    setActiveTask(null)
  }

  const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  })
)

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}>
      <section id='TasksPage' className='bg-surface h-full w-full min-w-0 p-3 sm:p-4 lg:p-6 shadow-sm border border-border rounded-md space-y-2'>
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
      <DragOverlay>
        {activeTask ? (
          <KanbanTaskCard
            id={activeTask.id}
            title={activeTask.title}
            description={activeTask.description}
            priority={activeTask.priority}
            dueDate={activeTask.dueDate}
            assignee={activeTask.assignee}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default KanbanBoardPage