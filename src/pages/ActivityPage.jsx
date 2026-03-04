import ActivityList from "../components/ActivityList";

export default function ActivityPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Activity
            </h1>

            <ActivityList />
        </div>
    );
}