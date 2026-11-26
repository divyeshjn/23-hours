import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";

import initialiseDatabase from "./utils/initialiseDatabase.js";

import {
  createSessionMiddleware
} from "./config/session.js";

import authRoutes from "./routes/authRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import dailyLogRoutes from "./routes/dailyLogRoutes.js";

import requireAuth from "./middleware/requireAuth.js";
import validateOrigin from "./middleware/validateOrigin.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// START SERVER

async function startServer() {
  try {

    // Validate authentication configuration

    if (!process.env.PASSCODE_HASH) {
      throw new Error("PASSCODE_HASH is missing");
    }

    if (
      !process.env.SESSION_SECRET ||
      process.env.SESSION_SECRET.length < 32
    ) {
      throw new Error(
        "SESSION_SECRET must contain at least 32 characters"
      );
    }

    // Connect database

    await connectDB();

    await initialiseDatabase();

    // Production proxy configuration

    if (process.env.NODE_ENV === "production") {
      app.set("trust proxy", 1);
    }

    app.disable("x-powered-by");

    // CORS

    app.use(
      cors({
        origin:
          process.env.CLIENT_URL ||
          "http://localhost:5173",

        credentials: true
      })
    );

    app.use(
      express.json({ limit: "1mb" })
    );

    // Rate limiter

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 500,
      standardHeaders: true,
      legacyHeaders: false
    });

    app.use("/api", limiter);

    // Prevent caching of personal API data

    app.use("/api", (req, res, next) => {
      res.set("Cache-Control", "no-store");
      next();
    });

    // Origin protection

    app.use("/api", validateOrigin);

    // Session middleware

    app.use(createSessionMiddleware());

    // PUBLIC HEALTH ENDPOINT

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

    // PUBLIC AUTHENTICATION ROUTES

    app.use("/api/auth", authRoutes);

    // PROTECTED API ROUTES

    app.use("/api", requireAuth);

    app.use(
      "/api/settings",
      settingsRoutes
    );

    app.use(
      "/api/daily-logs",
      dailyLogRoutes
    );

    // Unknown endpoints

    app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: "Endpoint not found"
      });
    });

    // Global error handler

    app.use(errorHandler);

    // Start listening

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );

      console.log(
        "Private passcode authentication enabled"
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