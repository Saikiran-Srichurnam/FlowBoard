import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProjectProvider, TaskProvider, KanbanProvider } from "./context/index.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectProvider>
      <TaskProvider>
        <KanbanProvider>
          <App />
        </KanbanProvider>
      </TaskProvider>
    </ProjectProvider>
  </StrictMode>,
)
