import { useState } from "react";
import { apiFetch } from "../utils/api";
import { motion } from "framer-motion";

function TaskList({ tasks, setTasks }) {
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const handleToggle = async (task) => {
        try {
            const newStatus = task.status === "done" ? "todo" : "done";

            const updatedTask = await apiFetch(`/tasks/${task._id}`, {
                method: "PUT",
                body: JSON.stringify({
                    status: newStatus,
                }),
            });

            setTasks((prev) =>
                prev.map((t) =>
                    t._id === updatedTask._id ? updatedTask : t
                )
            );
        } catch (err) {
            console.error("Toggle failed:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiFetch(`/tasks/${id}`, {
                method: "DELETE",
            });

            setTasks((prev) => prev.filter((t) => t._id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleEditSave = async (id) => {
        if (!editTitle.trim()) return;

        try {
            const updatedTask = await apiFetch(`/tasks/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    title: editTitle.trim(),
                }),
            });

            setTasks((prev) =>
                prev.map((t) =>
                    t._id === updatedTask._id ? updatedTask : t
                )
            );

            setEditingId(null);
            setEditTitle("");
        } catch (err) {
            console.error("Edit failed:", err);
        }
    };

    return (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tasks.map((task) => (
                <motion.div
                    key={task._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm"
                >
                    {/* TOP ROW */}
                    <div className="flex items-start justify-between gap-4">

                        <div className="flex items-start gap-3 flex-1">

                            {/* CHECKBOX */}
                            <input
                                type="checkbox"
                                checked={task.status === "done"}
                                onChange={() => handleToggle(task)}
                                className="mt-1 w-4 h-4 accent-purple-600 cursor-pointer"
                            />

                            {/* TITLE */}
                            {editingId === task._id ? (
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
                                />
                            ) : (
                                <p
                                    className={`text-lg font-medium text-gray-900 dark:text-white transition
                  ${task.status === "done" ? "line-through text-gray-400" : ""}`}
                                >
                                    {task.title}
                                </p>
                            )}
                        </div>

                        {/* DATE */}
                        {task.createdAt && (
                            <span className="text-xs text-gray-400 whitespace-nowrap">
                                {new Date(task.createdAt).toLocaleDateString()}{" "}
                                {new Date(task.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        )}
                    </div>

                    {/* DESCRIPTION */}
                    {task.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                            {task.description}
                        </p>
                    )}

                    {/* ACTIONS */}
                    <div className="flex gap-4 mt-4 text-sm">
                        {editingId === task._id ? (
                            <button
                                onClick={() => handleEditSave(task._id)}
                                className="text-green-500 hover:underline"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setEditingId(task._id);
                                    setEditTitle(task.title);
                                }}
                                className="text-blue-500 hover:underline"
                            >
                                Edit
                            </button>
                        )}

                        <button
                            onClick={() => handleDelete(task._id)}
                            className="text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default TaskList;