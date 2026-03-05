import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import TasksPage from "./pages/TasksPage";
import ActivityPage from "./pages/ActivityPage";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  if (!token) return <Login />;

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<DashboardLayout />}>

          <Route index element={<TasksPage />} />

          <Route path="activity" element={<ActivityPage />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;