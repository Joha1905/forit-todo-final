const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Almacenamiento en memoria
let tasks = [];
let idCounter = 1;

// GET - Obtener todas las tareas
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// POST - Crear nueva tarea
app.post("/api/tasks", (req, res) => {
  const { title, completed } = req.body;
  if (!title) {
    return res.status(400).json({ error: "El título es obligatorio" });
  }

  const newTask = { id: idCounter++, title, completed: !!completed };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT - Actualizar tarea existente
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

  task.title = title ?? task.title;
  task.completed = completed ?? task.completed;
  res.json(task);
});

// DELETE - Eliminar tarea
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === parseInt(id));

  if (index === -1)
    return res.status(404).json({ error: "Tarea no encontrada" });

  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});

// Servidor en marcha
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
