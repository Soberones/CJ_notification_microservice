const cron = require("node-cron");
const Task = require("../models/taskModel");
const smsService = require("../services/smsService");
const emailService = require("../services/emailService");

cron.schedule("* * * * *", () => {
  console.log("Cron job started");

  const now = new Date().toISOString();
  Task.getAllPendingTasks(now, async (err, tasks) => {
    if (err) {
      console.error("Error fetching tasks:", err.message);
      return;
    }

    for (const task of tasks) {
      let smsError = false;
      let emailError = false;

      // Отправка SMS
      try {
        await smsService.sendSms(task.phoneNumber, task.message);
      } catch (error) {
        smsError = true;
        console.error(`Error sending SMS for task ${task.id}:`, error.message);
      }

      // Отправка Email
      try {
        await emailService.sendEmail(task.email, task.extendedMessage);
      } catch (error) {
        emailError = true;
        console.error(
          `Error sending Email for task ${task.id}:`,
          error.message
        );
      }

      // Обновление статуса задачи
      try {
        if (smsError && emailError) {
          await Task.updateTaskStatus(task.id, "all service error");
        } else if (smsError) {
          await Task.updateTaskStatus(task.id, "sms error");
        } else if (emailError) {
          await Task.updateTaskStatus(task.id, "email error");
        } else {
          await Task.updateTaskStatus(task.id, "completed");
          console.log(`Task ${task.id} marked as completed`);
        }
      } catch (error) {
        console.error(
          `Error updating task status for ${task.id}:`,
          error.message
        );
      }
    }
  });
});
