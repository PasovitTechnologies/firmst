// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserDetailPage from "./components/UserDetailPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-detail/:userEmail" element={<UserDetailPage />} />

      </Routes>
    </Router>
  );
}

export default App;
