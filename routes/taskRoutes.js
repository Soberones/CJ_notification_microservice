const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/tasks", taskController.getAllTasks);
router.get("/task/:id", taskController.getTaskById);
router.post("/task", taskController.createTask);
router.put("/task/:id", taskController.updateTask);
router.delete("/task/:id", taskController.deleteTask);

module.exports = router;
