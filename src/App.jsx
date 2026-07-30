import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Card from "./components/ui/Card/Card";
import ComponentLibrary from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Login />} />
      </Routes>
      {/* Login page */}
      {/* <Login /> */}
    </BrowserRouter>
  );
}