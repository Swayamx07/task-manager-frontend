import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getActivities } from "../utils/api";

function formatAction(action) {
    if (action === "created_task") return "✔ Created";
    if (action === "updated_task") return "✏ Updated";
    if (action === "deleted_task") return "🗑 Deleted";
    return action;
}

function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const key in intervals) {
        const interval = Math.floor(seconds / intervals[key]);
        if (interval >= 1) {
            return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
}

function formatTime(date) {
    return new Date(date).toLocaleString();
}

export default function ActivityList() {
    const { token } = useAuth();
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const loadActivities = async () => {
            try {
                const data = await getActivities(token);
                setActivities(data);
            } catch (err) {
                console.error(err);
            }
        };

        loadActivities();
    }, [token]);

    return (
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">

            <h3 className="text-xl font-semibold mb-6">
                Recent Activity
            </h3>

            {activities.length === 0 ? (
                <p className="text-gray-500">No activity yet</p>
            ) : (
                <ul className="space-y-4">
                    {activities.map((activity) => (
                        <li key={activity._id} className="flex flex-col">

                            <span className="text-gray-700 dark:text-gray-300">

                                {formatAction(activity.action)} task{" "}
                                <span className="font-medium">
                                    "{activity.taskTitle || "task"}"
                                </span>

                            </span>

                            <span className="text-xs text-gray-400 mt-1">
                                {timeAgo(activity.createdAt)}
                            </span>

                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}