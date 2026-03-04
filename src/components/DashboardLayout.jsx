import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function DashboardLayout() {
    const { logout } = useAuth();
    const [darkMode, setDarkMode] = useState(false);

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

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">

            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 p-6 flex flex-col">

                <h1 className="text-2xl font-bold mb-10">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        TaskEasy
                    </span>
                </h1>

                <nav className="flex flex-col gap-3">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `p-2 rounded-lg transition ${isActive
                                ? "bg-purple-100 dark:bg-gray-700"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`
                        }
                    >
                        📋 Tasks
                    </NavLink>

                    <NavLink
                        to="/activity"
                        className={({ isActive }) =>
                            `p-2 rounded-lg transition ${isActive
                                ? "bg-purple-100 dark:bg-gray-700"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`
                        }
                    >
                        📊 Activity
                    </NavLink>

                </nav>

                <div className="mt-auto flex flex-col gap-3">

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                    >
                        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
                    </button>

                    <button
                        onClick={logout}
                        className="p-2 rounded-lg bg-red-500 text-white"
                    >
                        Logout
                    </button>

                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-5xl mx-auto">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}