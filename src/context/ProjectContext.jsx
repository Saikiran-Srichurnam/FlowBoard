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

  const [showModal, setShowModal] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null)

  // Close ADD modal
  const handleCloseModal = () => {
    document.body.style.overflow = "";
    setShowModal(false);
  };

  // Open EDIT modal
  const handleEditProject = (projectId) => {
    document.body.style.overflow = "hidden";
    setEditProjectId(projectId);
  };

  // Close EDIT modal
  const handleCloseEditModal = () => {
    document.body.style.overflow = "";
    setEditProjectId(null);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,

      // Add modal
      showModal,
      setShowModal,
      handleCloseModal,

      // Edit modal
      editProjectId,
      handleEditProject,
      handleCloseEditModal,
    }} >
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjects = () => useContext(ProjectContext)