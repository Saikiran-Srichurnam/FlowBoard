import { createContext, useContext } from "react";

// creating taskscontext using create Context
const TasksContext = createContext()

export function TaskProvider({ children }) {

  return (
    <TasksContext.Provider value="">
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => useContext(TasksContext)