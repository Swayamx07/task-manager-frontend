import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import { useState, useEffect } from "react";
import { apiFetch } from "../utils/api";

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await apiFetch("/tasks");
            setTasks(data.tasks);
        };

        fetchTasks();
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <AddTask setTasks={setTasks} />
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    );
}