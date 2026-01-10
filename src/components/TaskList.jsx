import { useEffect, useState } from "react";

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/tasks")
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((err) => {
                console.error("Error fetching tasks:", err);
            });
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setTasks((prev) => prev.filter((task) => task._id !== id));
            })
            .catch((err) => console.error(err));
    };


    const handleToggle = (task) => {
        fetch(`http://localhost:5000/tasks/${task._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: !task.completed }),
        })
            .then((res) => res.json())
            .then((updatedTask) => {
                setTasks((prev) =>
                    prev.map((t) =>
                        t._id === updatedTask._id ? updatedTask : t
                    )
                );
            })
            .catch((err) => console.error(err));
    };



    return (
        <div>
            <h2>Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {tasks.map((task) => (
                        <li key={task._id} style={{ marginBottom: "10px" }}>
                            <span
                                style={{
                                    textDecoration: task.completed ? "line-through" : "none",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleToggle(task)}
                            >
                                {task.title}
                            </span>


                            <button
                                style={{ marginLeft: "10px" }}
                                onClick={() => handleDelete(task._id)}
                            >
                                Delete
                            </button>
                        </li>

                    ))}
                </ul>
            )}

        </div>
    );
}

export default TaskList