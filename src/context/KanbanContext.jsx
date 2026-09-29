import { createContext, useContext, useEffect, useState } from "react";
import { kanbanBoardcolumnsData as kanbanColumnsData } from "../data/kanbanBoardColumns"

const kanbanContext = createContext()

export function KanbanProvider({ children }) {

  const [kanban, setKanban] = useState(() => {
    try {
      const saved = localStorage.getItem("myKanbanData")

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Error loading kanban data from localStorage:", error)
      localStorage.removeItem("myKanbanData");
    }

    return kanbanColumnsData;
  })

  useEffect(() => {
    try {
      localStorage.setItem("myKanBanData", JSON.stringify(kanban))
    } catch (error) {
      console.error("Error loading kanban data from localStorage:", error)
    }
  }, [kanban])

  return (
    <kanbanContext.Provider value={{
      kanban,
      setKanban,

      kanbanColumnsData,
    }}>
      {children}
    </kanbanContext.Provider>
  )
}

export const useKanban = () => useContext(kanbanContext)