import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Card from "./components/ui/Card/Card";
import ComponentLibrary from "./pages";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Login />} />
      </Routes>
      {/* Login page */}
      {/* <Login /> */}
    </BrowserRouter>
  );
}