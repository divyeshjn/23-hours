import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import initialiseDatabase from "./utils/initialiseDatabase.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";
import dailyLogRoutes from "./routes/dailyLogRoutes.js";



dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware

app.use(
  cors({
    origin: process.env.CLIENT_URL
      || "http://localhost:5173"
  })
);

app.use(express.json({ limit: "1mb" }));

// Rate limiter

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false
});

app.use("/api", limiter);

// Health check

app.get("/api/health", (req, res) => {
  const connected =
    mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    success: connected,
    message: "23 Hours API",
    database: connected
      ? "connected"
      : "disconnected"
  });
});

// API routes

app.use("/api/settings", settingsRoutes);
app.use("/api/daily-logs", dailyLogRoutes);
// Unknown endpoints

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

// Global error handler

app.use(errorHandler);

// Start server
async function startServer() {
  try {
    await connectDB();

    await initialiseDatabase();

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });

  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
}

startServer();