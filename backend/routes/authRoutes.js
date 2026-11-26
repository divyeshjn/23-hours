import express from "express";
import rateLimit from "express-rate-limit";

import {
  login,
  getSession,
  logout
} from "../controllers/authController.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 5,

  standardHeaders: true,

  legacyHeaders: false,

  skipSuccessfulRequests: true,

  message: {
    success: false,
    message:
      "Too many login attempts. Try again in 15 minutes."
  }
});

router.post(
  "/login",
  loginLimiter,
  login
);

router.get(
  "/session",
  getSession
);

router.post(
  "/logout",
  logout
);

export default router;