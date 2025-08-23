// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>
        {/* Protected home */}
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />

        {/* Create note page */}
        <Route path="/create" element={user ? <CreatePage /> : <Navigate to="/login" />} />

        {/* Note detail page */}
        <Route path="/note/:id/edit" element={user ? <NoteDetailPage /> : <Navigate to="/login" />} />

        {/* Redirect logged-in users away from auth pages */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
