import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

            {/* SIDEBAR */}
            <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col px-6 py-8">

                {/* LOGO */}
                <h1 className="text-2xl font-bold mb-12">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        TaskEasy
                    </span>
                </h1>

                {/* NAVIGATION */}
                <nav className="flex flex-col gap-2 text-sm">

                    <motion.div whileHover={{ x: 4 }}>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${isActive
                                    ? "bg-purple-100 text-purple-700 dark:bg-gray-800 dark:text-white"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`
                            }
                        >
                            📋 <span>Tasks</span>
                        </NavLink>
                    </motion.div>

                    <motion.div whileHover={{ x: 4 }}>
                        <NavLink
                            to="/activity"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${isActive
                                    ? "bg-purple-100 text-purple-700 dark:bg-gray-800 dark:text-white"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`
                            }
                        >
                            📊 <span>Activity</span>
                        </NavLink>
                    </motion.div>

                </nav>

                {/* DIVIDER */}
                <div className="my-8 border-t border-gray-200 dark:border-gray-800"></div>

                {/* BOTTOM ACTIONS */}
                <div className="mt-auto flex flex-col gap-3">

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition"
                    >
                        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={logout}
                        className="w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                    >
                        Logout
                    </motion.button>

                </div>

            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-10">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                    >
                        <Outlet />
                    </motion.div>
                </div>
            </main>

        </div>
    );
}