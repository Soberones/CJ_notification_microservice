const db = require("../config/db");

const Task = {
  getAllTasks: (callback) => {
    db.all("SELECT * FROM tasks", [], callback);
  },

  getTaskById: (id, callback) => {
    db.get("SELECT * FROM tasks WHERE id = ?", [id], callback);
  },

  createTask: (phoneNumber, message, executionTime, callback) => {
    db.run(
      "INSERT INTO tasks (phoneNumber, message, executionTime) VALUES (?, ?, ?)",
      [phoneNumber, message, executionTime],
      function (err) {
        callback(err, this ? this.lastID : null);
      }
    );
  },

  updateTask: (id, phoneNumber, message, executionTime, callback) => {
    db.run(
      "UPDATE tasks SET phoneNumber = ?, message = ?, executionTime = ? WHERE id = ?",
      [phoneNumber, message, executionTime, id],
      callback
    );
  },

  deleteTask: (id, callback) => {
    db.run("DELETE FROM tasks WHERE id = ?", [id], callback);
  },

  updateTaskStatus: (id, status, callback) => {
    db.run("UPDATE tasks SET status = ? WHERE id = ?", [status, id], callback);
  },
};

module.exports = Task;
