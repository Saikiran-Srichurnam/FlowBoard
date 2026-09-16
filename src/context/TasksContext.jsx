import { createContext, useContext, useState, useEffect } from "react";
import { tasks as initialTasks } from "../data/tasks"

// creating taskscontext using create Context
const TasksContext = createContext()

export function TaskProvider({ children }) {

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("myTasks");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      localStorage.removeItem("myTasks");
    }

    return initialTasks;
  });

  // Save whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem("myTasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);

  // add tasks
  const addTasks = (newTask) => {
    setTasks([...tasks, newTask])
  }

  // delete task
  const deleteTask = (taskId) => {
    setTasks((allTasks) => allTasks.filter(task => task.id !== taskId))
  }

  const [showModal, setShowModal] = useState(false);

  // handle close button of add new task modal
  const handleCloseModal = () => {
    document.body.style.overflow = "";
    setShowModal(false);
  };


  return (
    <TasksContext.Provider value={{
      tasks,
      setTasks,

      // add task
      showModal,
      setShowModal,
      handleCloseModal,
      addTasks,


      // delete task
      deleteTask

    }}>
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => useContext(TasksContext)