import { createContext, useContext, useState } from "react"
import { projects as initialProjects, projects } from "../data/project";


const ProjectContext = createContext()

export function ProjectProvider({ children }) {

  const [projects, setProjects] = useState(initialProjects);

  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject }} >
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjects = () => useContext(ProjectContext)