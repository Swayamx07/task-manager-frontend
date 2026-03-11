import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import TasksPage from "./pages/TasksPage";
import ActivityPage from "./pages/ActivityPage";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTE */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />

        {/* PRIVATE ROUTES */}
        <Route
          path="/"
          element={token ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<TasksPage />} />
          <Route path="activity" element={<ActivityPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;