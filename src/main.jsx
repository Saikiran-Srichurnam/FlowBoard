import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProjectProvider, TaskProvider, KanbanProvider, ActivityProvider, ThemeProvider } from "./context/index.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ActivityProvider>
        <ProjectProvider>
          <TaskProvider>
            <KanbanProvider>
              <App />
            </KanbanProvider>
          </TaskProvider>
        </ProjectProvider>
      </ActivityProvider>
    </ThemeProvider>
  </StrictMode>,
)
