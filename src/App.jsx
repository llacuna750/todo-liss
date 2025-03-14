import { useEffect, useState } from "react"; 
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  //for local
  // useEffect(() => {
  //   localStorage.setItem("darkMode", darkMode);
  //   document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
  //   document.body.style.color = darkMode ? "#ffffff" : "#000000";
  // }, [darkMode]);

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

  //for fullstack open in VERCEL

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // const BACKEND_URL = "frontend-in-gh-pages-production.up.railway.app"; // Use Railway backend

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
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh", /* Makes sure the content is vertically centered */
      width: "100%",
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      <button 
        onClick={() => setDarkMode(!darkMode)}
        style={{
          backgroundColor: darkMode ? "#333" : "#f0f0f0",
          color: darkMode ? "#fff" : "#000",
          border: "none",
          padding: "10px 15px",
          borderRadius: "20px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {darkMode ? "☀️ Light Mode" : "🌒 Dark Mode"}
      </button>
      
      <h1 style={{
        fontSize: "2.5rem",
        marginBottom: "30px",
      }}>
        TODO List
      </h1>
      
      <div style={{
        display: "flex",
        width: "100%",
        marginBottom: "30px"
      }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && newTask.trim() && addTask()}
          style={{
            flex: "1",
            padding: "12px 15px",
            fontSize: "16px",
            borderRadius: "4px 0 0 4px",
            border: darkMode ? "1px solid #444" : "1px solid #ddd",
            backgroundColor: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
          }}
          placeholder="Add a new task..."
        />
        <button 
          onClick={addTask}
          disabled={!newTask.trim()}
          style={{
            padding: "12px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "0 4px 4px 0",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
      
      <ul style={{
        listStyleType: "none",
        padding: "0",
        width: "100%"
      }}>
        {tasks.map((task) => (
          <li 
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "4px",
              backgroundColor: darkMode ? "#2a2a2a" : "#f9f9f9",
              border: darkMode ? "1px solid #444" : "1px solid #eee",
            }}
          >
            <span>{task.title}</span>
            <button 
              onClick={() => deleteTask(task.id)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#ff4444",
                fontSize: "18px",
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;