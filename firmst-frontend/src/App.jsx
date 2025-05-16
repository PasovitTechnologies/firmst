// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserDetailPage from "./components/UserDetailPage";

// Inline function to check JWT token validity
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now(); // true if token not expired
  } catch (e) {
    return false;
  }
};

// Reusable wrapper for protected routes
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />; // Redirect to login if not authenticated
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/user-detail/:userEmail" element={<ProtectedRoute element={<UserDetailPage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
