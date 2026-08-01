import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Card from "./components/ui/Card/Card";
import ComponentLibrary from "./pages/ComponentLibrary"
import Register from "./pages/authentication/Register";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* protected routes */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}