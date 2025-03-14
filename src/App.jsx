import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:5000/tasks")
  //     .then((res) => res.json())
  //     .then((data) => setTasks(data));
  // }, []);

  // const addTask = () => {
  //   fetch("http://localhost:5000/tasks", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ title: newTask }),
  //   })
  //     .then((res) => res.json())
  //     .then((task) => setTasks([...tasks, task]));
  // };

  // const deleteTask = (id) => {
  //   fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" })
  //     .then(() => setTasks(tasks.filter((task) => task.id !== id)));
  // };

  // const BACKEND_URL = "https://todo-liss-production.up.railway.app"; // Replace with your actual Railway backend URL
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    fetch(`${BACKEND_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    })
      .then((res) => res.json())
      .then((task) => setTasks([...tasks, task]));
  };

  const deleteTask = (id) => {
    fetch(`${BACKEND_URL}/tasks/${id}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)));
  };


  return (
    <div>
      <h1>TODO List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
