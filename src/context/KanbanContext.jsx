import { createContext, useContext } from "react";
import { kanbanBoardcolumns as kanbanColumns } from "../data/kanbanBoardColumns"

const kanbanContext = createContext()

export function kanbanProvider({ children }) {
  return (
    <kanbanContext.Provider value="">
      {children}
    </kanbanContext.Provider>
  )
}

export const useKanban = () => useContext(kanbanContext)