import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { apiFetch } from "./utils/api";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");

  const { token, logout, loading } = useAuth();

  //  LOAD TASKS 
  useEffect(() => {
    if (!token) return;

    const fetchTasks = async () => {
      try {
        const data = await apiFetch("/tasks");
        setTasks(data);
      } catch (err) {
        console.error("Failed to load tasks:", err);
      }
    };

    fetchTasks();
  }, [token]);

  //  THEME 
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = !prev;

      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return newTheme;
    });
  };

  //  SORT 
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  //  AUTH GUARD 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!token) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6">
      <div className="max-w-4xl mx-auto pt-20">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">
            Welcome to,{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              TaskEasy
            </span>
          </h1>

          <div className="flex gap-3">
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-500 text-white"
            >
              Logout
            </button>
          </div>
        </div>

        <p className="text-2xl mt-2 text-gray-600 dark:text-gray-300">
          Manage your tasks
        </p>

        <AddTask setTasks={setTasks} />

        <div className="flex justify-end mt-6">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="
              text-sm px-3 py-1.5 rounded-lg
              bg-gray-100 text-gray-600
              dark:bg-gray-800 dark:text-gray-300
              border border-gray-200 dark:border-gray-700
              outline-none transition
            "
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <TaskList tasks={sortedTasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;