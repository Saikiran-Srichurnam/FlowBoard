import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Card from "./components/ui/Card/Card";
import ComponentLibrary from "./pages/ComponentLibrary"
import Register from "./pages/authentication/Register";
import ForgotPassword from "./pages/authentication/ForgotPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      {/* Login page */}
      {/* <Login /> */}
    </BrowserRouter>
  );
}