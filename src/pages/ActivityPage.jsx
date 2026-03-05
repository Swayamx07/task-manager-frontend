import ActivityList from "../components/ActivityList";

export default function ActivityPage() {
    return (
        <div className="max-w-5xl mx-auto">

            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Activity
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Track recent changes to your tasks
                </p>
            </div>

            <ActivityList />

        </div>
    );
}