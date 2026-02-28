import { useState } from "react";
import { apiFetch } from "../utils/api";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function AddTask({ setTasks }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Submit clicked");
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("API URL:", import.meta.env.VITE_API_URL);

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
        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
            <input
                type="text"
                placeholder="Task title"
                className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Short description (optional)"
                className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 outline-none resize-none"
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl"
            >
                Add Task
            </button>
        </form>
    );
}

export default AddTask;
