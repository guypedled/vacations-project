import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Layout/Navbar";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import VacationsPage from "./Pages/VacationsPage";
import AddVacationPage from "./Pages/AddVacationPage";
import EditVacationPage from "./Pages/EditVacationPage";
import ReportPage from "./Pages/ReportPage";
import AiPage from "./Pages/AiPage";
import McpPage from "./Pages/McpPage";

/*
  🔒 Protected Route

  This component protects routes that require authentication.

  ✔ If user has token → allow access
  ✔ If not → redirect to login page

  This is required to prevent unauthorized access to pages like vacations.
*/
function ProtectedRoute({ children }: any) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

/*
  Main Application Router (FINAL VERSION)

  ✔ All project pages included
  ✔ Protected routes added (important requirement)
  ✔ Clean structure
  ✔ Fallback route (important UX)
*/
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/vacations"
          element={
            <ProtectedRoute>
              <VacationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-vacation"
          element={
            <ProtectedRoute>
              <AddVacationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-vacation/:id"
          element={
            <ProtectedRoute>
              <EditVacationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AiPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mcp"
          element={
            <ProtectedRoute>
              <McpPage />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK (IMPORTANT) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;