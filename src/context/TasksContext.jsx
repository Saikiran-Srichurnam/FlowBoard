import { createContext, useContext, useState, useEffect } from "react";
import { tasks as initialTasks } from "../data/tasks"

// creating taskscontext using create Context
const TasksContext = createContext()

export function TaskProvider({ children }) {

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("myTasks")

      if (saved) {
        const parsed = JSON.parse(saved)

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (error) {
      console.log("Error loading tasks from the localStorage", error);
      localStorage.removeItem("myTasks")
    }
    return initialTasks
  })

  // Auto-save whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem("myTasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks])

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => useContext(TasksContext)