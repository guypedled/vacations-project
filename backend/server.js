const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

/*
  Import routes
*/
const authRoutes = require("./routes/auth");
const vacationRoutes = require("./routes/vacations");
const aiRoutes = require("./routes/ai");
const mcpRoutes = require("./routes/mcp");

const app = express();

/*
  CONNECT TO MONGODB

  - Uses MONGO_URI from .env
  - If fails → logs error clearly
*/
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // stop server if DB fails (professional)
  });

/*
  MIDDLEWARE
*/
app.use(cors());
app.use(express.json());

/*
  STATIC FILES (images)
  Access:
  http://localhost:3001/uploads/image.jpg
*/
app.use("/uploads", express.static("uploads"));

/*
  ROUTES
*/
app.use("/api/auth", authRoutes);
app.use("/api/vacations", vacationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/mcp", mcpRoutes);

/*
  HEALTH CHECK (optional but professional)
*/
app.get("/", (req, res) => {
  res.send("API is running");
});

/*
  PORT
*/
const PORT = process.env.PORT || 3001;

/*
  START SERVER
*/
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});