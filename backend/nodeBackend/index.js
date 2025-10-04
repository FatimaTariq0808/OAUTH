require("dotenv").config();
const express = require("express");
const pool = require("./config/db");
const initializeDatabase = require("./Models/init");

const oauthRoutes = require("./Routes/oAuthRoutes");
const userRoutes = require("./Routes/userRoutes");

const startApp = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected");

    await initializeDatabase();
    console.log("Database initialized");

    const app = express();
    const PORT = process.env.PORT || 3001;

    app.use(express.json());

    app.use("/auth", oauthRoutes);
    app.use("/api", userRoutes);

    app.get("/", (req, res) => {
      res.send("Hello from Node backend!");
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startApp();
