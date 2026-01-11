import { useState } from "react";

function AddTask({ setTasks }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description }),
        })
            .then((res) => res.json())
            .then((newTask) => {
                setTasks((prev) => [newTask, ...prev]);
                setTitle("");
                setDescription("");
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

            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl">
                Add Task
            </button>
        </form>
    );
}

export default AddTask;
