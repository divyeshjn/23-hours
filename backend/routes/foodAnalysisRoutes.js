import express from "express";
import rateLimit from "express-rate-limit";

import uploadFoodImage from "../middleware/uploadFoodImage.js";

import {
  analyseFood
} from "../controllers/foodAnalysisController.js";

const router = express.Router();

const foodAnalysisLimiter = rateLimit({
  windowMs: 60 * 1000,

  max: 5,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many food scans. Please wait a minute."
  }
});

router.post(
  "/analyse",
  foodAnalysisLimiter,
  uploadFoodImage,
  analyseFood
);

export default router;