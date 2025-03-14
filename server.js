const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.MYSQLHOST, // Use Railway Host
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Get all tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  db.query("INSERT INTO tasks (title) VALUES (?)", [title], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, title });
  });
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Task deleted" });
  });
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
