const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const path = require("path");
const app = express();
const connectDB = require("./mongoDb/db");

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
const tasks = require("./routes/tasks");
app.use("/api/tasks", tasks);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
