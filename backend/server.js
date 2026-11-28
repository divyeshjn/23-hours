import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import path from "node:path";
import { fileURLToPath } from "node:url";

import connectDB from "./config/db.js";
import initialiseDatabase from "./utils/initialiseDatabase.js";

import {
  createSessionMiddleware
} from "./config/session.js";

import authRoutes from "./routes/authRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import dailyLogRoutes from "./routes/dailyLogRoutes.js";
import weeklyCheckInRoutes from "./routes/weeklyCheckInRoutes.js";
import foodAnalysisRoutes from "./routes/foodAnalysisRoutes.js";

import requireAuth from "./middleware/requireAuth.js";
import validateOrigin from "./middleware/validateOrigin.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const isProduction =
  process.env.NODE_ENV === "production";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.resolve(
  __dirname,
  "../frontend/dist"
);

async function startServer() {
  try {
    // Validate environment variables

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing");
    }

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

    if (isProduction && !process.env.CLIENT_URL) {
      throw new Error("CLIENT_URL is missing");
    }

    // Connect database

    await connectDB();

    await initialiseDatabase();

    // Production proxy configuration

    if (isProduction) {
      app.set("trust proxy", 1);
    }

    app.disable("x-powered-by");

    // Security headers

    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],

            scriptSrc: ["'self'"],

            styleSrc: [
              "'self'",
              "'unsafe-inline'",
              "https://fonts.googleapis.com"
            ],

            fontSrc: [
              "'self'",
              "https://fonts.gstatic.com"
            ],

            imgSrc: [
              "'self'",
              "data:",
              "blob:"
            ],

            connectSrc: ["'self'"],

            workerSrc: [
              "'self'",
              "blob:"
            ],

            objectSrc: ["'none'"],

            frameAncestors: ["'none'"],

            upgradeInsecureRequests:
              isProduction ? [] : null
          }
        }
      })
    );

    // CORS

    app.use(
      cors({
        origin:
          process.env.CLIENT_URL ||
          "http://localhost:5173",

        credentials: true
      })
    );

    // JSON request parsing

    app.use(
      express.json({ limit: "1mb" })
    );

    // Global API rate limiter

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,

      max: 500,

      standardHeaders: true,

      legacyHeaders: false,

      message: {
        success: false,
        message:
          "Too many requests. Please try again later."
      }
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

    // Public health endpoint

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

    // Public authentication routes

    app.use("/api/auth", authRoutes);

    // Protected API routes

    app.use("/api", requireAuth);

    app.use(
      "/api/settings",
      settingsRoutes
    );

    app.use(
      "/api/daily-logs",
      dailyLogRoutes
    );

    app.use(
      "/api/weekly-checkins",
      weeklyCheckInRoutes
    );

    app.use(
      "/api/food-analysis",
      foodAnalysisRoutes
    );

    // Unknown API endpoints

    app.use("/api", (req, res) => {
      res.status(404).json({
        success: false,
        message: "Endpoint not found"
      });
    });

    // Serve React frontend in production

    if (isProduction) {
      app.use(
        express.static(frontendPath, {
          index: false
        })
      );

      // React Router fallback

      app.get("/{*splat}", (req, res) => {
        res.set("Cache-Control", "no-cache");

        res.sendFile(
          path.join(frontendPath, "index.html")
        );
      });
    }

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

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);

      console.log(
        `Environment: ${isProduction
          ? "production"
          : "development"}`
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