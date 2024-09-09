const cron = require("node-cron");
const Task = require("../models/taskModel");
const smsService = require("../services/smsService");

cron.schedule("* * * * *", () => {
  console.log("Cron job started");

  const now = new Date().toISOString();
  Task.getAllPendingTasks(now, (err, tasks) => {
    if (err) {
      console.error("Error fetching tasks:", err.message);
      return;
    }

    tasks.forEach((task) => {
      smsService.sendSms(task.phoneNumber, task.message).then(() => {
        Task.updateTaskStatus(task.id, "completed", (err) => {
          if (err) {
            console.error("Error updating task status:", err.message);
          }
        });
      });
    });
  });
});
