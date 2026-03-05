import { useState } from "react";
import { apiFetch } from "../utils/api";
import { motion } from "framer-motion";

function AddTask({ setTasks }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        apiFetch("/tasks", {
            method: "POST",
            body: JSON.stringify({ title, description }),
        })
            .then((newTask) => {
                setTasks((prev) => [newTask, ...prev]);
                setTitle("");
                setDescription("");
            })
            .catch((err) => {
                console.error("Add task failed:", err);
            });
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 space-y-4"
        >
            <input
                type="text"
                placeholder="Task title"
                className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Short description (optional)"
                className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none resize-none"
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl"
            >
                Add Task
            </motion.button>
        </motion.form>
    );
}

export default AddTask;