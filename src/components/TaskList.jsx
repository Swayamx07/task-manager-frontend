import { useEffect, useState } from "react";

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/tasks")
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, []);

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

    return (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tasks.map((task) => (
                <div
                    key={task._id}
                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                    <p
                        onClick={() => handleToggle(task)}
                        className={`cursor-pointer text-gray-800 ${task.completed ? "line-through text-gray-400" : ""
                            }`}
                    >
                        {task.title}
                    </p>

                    <button
                        onClick={() => handleDelete(task._id)}
                        className="mt-4 text-sm text-red-500 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
