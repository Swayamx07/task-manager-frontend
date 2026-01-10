import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

function App() {
  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h1>Task Manager</h1>
      <AddTask />
      <TaskList />
    </div>
  );
}

export default App;
