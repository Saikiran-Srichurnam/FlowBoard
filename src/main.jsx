import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProjectProvider } from './context/ProjectContext.jsx'
import { TaskProvider } from './context/TasksContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ProjectProvider>
  </StrictMode>,
)
