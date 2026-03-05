import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import { useState, useEffect } from "react";
import { apiFetch } from "../utils/api";

export default function TasksPage() {

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await apiFetch("/tasks");
            setTasks(data.tasks);
        };

        fetchTasks();
    }, []);

    // SEARCH
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    // SORT
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sort === "newest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return new Date(a.createdAt) - new Date(b.createdAt);
    });

    // PROGRESS
    const completed = tasks.filter((t) => t.status === "done").length;
    const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

    return (
        <div className="max-w-5xl mx-auto">

            {/* PAGE HEADER */}
            <div className="mb-10">

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Tasks
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Manage and track your tasks
                </p>

                <p className="text-sm text-gray-400 mt-2">
                    {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                </p>

            </div>


            {/* PROGRESS BAR */}
            {tasks.length > 0 && (
                <div className="mb-8">

                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                </div>
            )}


            {/* SEARCH + SORT */}
            <div className="flex justify-between items-center mb-8 gap-4">

                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-sm p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white outline-none"
                />

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>

            </div>


            {/* ADD TASK */}
            <AddTask setTasks={setTasks} />


            {/* TASK LIST */}
            <TaskList tasks={sortedTasks} setTasks={setTasks} />

        </div>
    );
}