import { useState } from "react";

function TaskList({ tasks, setTasks }) {
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const handleToggle = (task) => {
        fetch(`http://localhost:5000/tasks/${task._id}`, {
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
        fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE",
        }).then(() => {
            setTasks((prev) => prev.filter((t) => t._id !== id));
        });
    };

    const handleEditSave = (id) => {
        fetch(`http://localhost:5000/tasks/${id}`, {
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
                    {editingId === task._id ? (
                        <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
                        />
                    ) : (
                        <p
                            onClick={() => handleToggle(task)}
                            className={`cursor-pointer ${task.completed
                                    ? "line-through text-gray-400"
                                    : ""
                                }`}
                        >
                            {task.title}
                        </p>
                    )}

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
