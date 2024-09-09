const Task = require("../models/taskModel");

exports.getAllTasks = (req, res) => {
  Task.getAllTasks((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ tasks: rows });
  });
};

exports.getTaskById = (req, res) => {
  const { id } = req.params;
  Task.getTaskById(id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Task not found" });
    res.json({ task: row });
  });
};

exports.createTask = (req, res) => {
  const { phoneNumber, message } = req.body;
  const isDev = process.env.NODE_ENV === "development";
  const executionTime = new Date(
    isDev ? Date.now() + 1 * 60 * 1000 : Date.now() + 5 * 24 * 60 * 60 * 1000
  ).toISOString();

  Task.createTask(phoneNumber, message, executionTime, (err, taskId) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task scheduled successfully", taskId, executionTime });
  });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { phoneNumber, message, executionTime } = req.body;
  Task.updateTask(id, phoneNumber, message, executionTime, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task updated successfully" });
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  Task.deleteTask(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task deleted successfully" });
  });
};
