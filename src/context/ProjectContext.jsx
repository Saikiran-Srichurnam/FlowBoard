import { createContext, useContext, useEffect, useState } from "react"
import { projects as initialProjects } from "../data/project";

const ProjectContext = createContext()

export function ProjectProvider({ children }) {

  // save the all load projects into this useState 
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem("myProjects")
      if (saved) {
        const parsed = JSON.parse(saved)

        // Make sure it's an array
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (error) {
      console.error("Error loading projects from localStorage:", error)
      localStorage.removeItem("myProjects");
    }

    return initialProjects
  });

  // Auto-save whenever projects change
  useEffect(() => {
    try {
      localStorage.setItem("myProjects", JSON.stringify(projects));
    } catch (error) {
      console.error("Error saving projects to localStorage:", error);
    }
  }, [projects])

  const addProject = (newProject) => {
    setProjects([...projects, newProject]); // Auto-saves via useEffect
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject }} >
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjects = () => useContext(ProjectContext)