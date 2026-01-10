import { useState } from "react";

function AddTask() {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        })
            .then((res) => res.json())
            .then(() => {
                setTitle("");
                window.location.reload(); // temporary, acceptable for now
            });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-10">
            <div className="flex items-center bg-white rounded-2xl shadow-md px-4 py-3">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    className="flex-1 outline-none text-gray-700"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button className="ml-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-xl">
                    →
                </button>
            </div>
        </form>
    );
}

export default AddTask;
