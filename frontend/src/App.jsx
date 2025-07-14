import { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

function App() {
  const [reload, setReload] = useState(false);

  const refreshTasks = () => {
    setReload(!reload); // fuerza que TaskList se vuelva a renderizar
  };

  return (
    <div>
      <h1>Mi App de Tareas</h1>
      <TaskForm onTaskCreated={refreshTasks} />
      <TaskList reload={reload} />
    </div>
  );
}

export default App;
