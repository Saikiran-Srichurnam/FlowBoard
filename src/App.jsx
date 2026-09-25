import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import ForgotPassword from "./pages/authentication/ForgotPassword"
import { DashboardPage, ProjectPage } from "./pages";
import DashboardLayout from "./components/layout/DashboardLayout";
import TaskPage from "./pages/TasksPage/TaskPage";
// import { KanbanBoard } from "./components/kanbanBoard";
import KanbanBoardPage from "./pages/KanbanBoardPage/KanbanBoardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* protected routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectPage />} />
          <Route path="tasks" element={<TaskPage />} />
          <Route path="kanban-Board" element={<KanbanBoardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}