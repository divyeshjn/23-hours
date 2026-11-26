import express from "express";

import {
  getSettings,
  updateTargets,
  createHabit,
  updateHabit,
  deleteHabit,
  updatePreferences
} from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", getSettings);

router.patch("/targets", updateTargets);

router.post("/habits", createHabit);

router.patch("/habits/:id", updateHabit);

router.delete("/habits/:id", deleteHabit);

router.patch("/preferences", updatePreferences);

export default router;