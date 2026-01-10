import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 px-6">
      <div className="max-w-4xl mx-auto pt-20">
        <h1 className="text-4xl font-bold text-gray-900">
          Hi there,{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Swayam
          </span>
        </h1>

        <p className="text-3xl font-semibold text-gray-800 mt-2">
          Manage your tasks
        </p>

        <p className="text-gray-500 mt-4">
          Add tasks, mark them complete, or delete them
        </p>

        <AddTask />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
