import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");


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

  useEffect(() => {
    fetch(`${API_BASE_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });


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

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
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
      text-sm
      px-3 py-1.5
      rounded-lg
      bg-gray-100 text-gray-600
      dark:bg-gray-800 dark:text-gray-300
      border border-gray-200 dark:border-gray-700
      outline-none
      hover:bg-gray-200 dark:hover:bg-gray-700
      transition
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
