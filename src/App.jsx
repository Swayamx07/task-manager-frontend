import {useState} from "react"
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

function App() {

  const[refresh, setRefresh] = useState(false);

  const reloadTasks = () =>{
    setRefresh(!refresh);
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <AddTask onTaskAdded={reloadTasks} />
      <TaskList key= {refresh}/>
    </div>
  );
}

export default App;
