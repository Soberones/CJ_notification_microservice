require("dotenv").config();
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
require("./utils/cronJob"); // Запуск cron

const app = express();
app.use(express.json());

app.use(taskRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
