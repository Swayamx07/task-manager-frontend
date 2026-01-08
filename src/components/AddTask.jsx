import { useState } from "react";

function AddTask({ onTaskAdded }) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        })
            .then((res) => res.json())
            .then(() => {
                setTitle("");
                onTaskAdded();
            })
            .catch((err) => {
                console.error("Error Adding Task: ", err);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
}
export default AddTask;