import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
};


function TaskList({ tasks, setTasks }) {
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const handleToggle = (task) => {
        fetch(`${API_BASE_URL}/tasks/${task._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !task.completed }),
        })
            .then((res) => res.json())
            .then((updatedTask) => {
                setTasks((prev) =>
                    prev.map((t) =>
                        t._id === updatedTask._id ? updatedTask : t
                    )
                );
            });
    };

    const handleDelete = (id) => {
        fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: "DELETE",
        }).then(() => {
            setTasks((prev) => prev.filter((t) => t._id !== id));
        });
    };

    const handleEditSave = (id) => {
        fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: editTitle }),
        })
            .then((res) => res.json())
            .then((updatedTask) => {
                setTasks((prev) =>
                    prev.map((t) =>
                        t._id === updatedTask._id ? updatedTask : t
                    )
                );
                setEditingId(null);
            });
    };

    return (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tasks.map((task) => (
                <div
                    key={task._id}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm"
                >
                    <div className="flex items-start justify-between gap-4">
                        {editingId === task._id ? (
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        ) : (
                            <p
                                onClick={() => handleToggle(task)}
                                className={`cursor-pointer text-lg ${task.completed ? "line-through text-gray-400" : ""
                                    }`}
                            >
                                {task.title}
                            </p>
                        )}


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

                    {task.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {task.description}
                        </p>
                    )};


                    <div className="flex gap-4 mt-4 text-sm">
                        {editingId === task._id ? (
                            <button
                                onClick={() => handleEditSave(task._id)}
                                className="text-green-500"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setEditingId(task._id);
                                    setEditTitle(task.title);
                                }}
                                className="text-blue-500"
                            >
                                Edit
                            </button>
                        )}


                        <button
                            onClick={() => handleDelete(task._id)}
                            className="text-red-500"
                        >
                            Delete
                        </button>
                    </div>
                </div>

            ))}
        </div>
    );
}

export default TaskList;
