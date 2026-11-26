import express from "express";

import validateDate from "../middleware/validateDate.js";

import {
  getDailyLogs,
  getDailyLog,
  saveMeal,
  deleteMeal,
  completeHabit,
  uncompleteHabit,
  updateWater,
  updateWorkout,
  createExtra,
  updateExtra,
  deleteExtra
} from "../controllers/dailyLogController.js";

const router = express.Router();

router.get("/", getDailyLogs);

router.use("/:date", validateDate);

router.get("/:date", getDailyLog);

// Meals

router.put(
  "/:date/meals/:mealType",
  saveMeal
);

router.delete(
  "/:date/meals/:mealType",
  deleteMeal
);

// Essentials

router.put(
  "/:date/habits/:habitId",
  completeHabit
);

router.delete(
  "/:date/habits/:habitId",
  uncompleteHabit
);

// Water

router.patch(
  "/:date/water",
  updateWater
);

// Workout

router.patch(
  "/:date/workout",
  updateWorkout
);

// Extras

router.post(
  "/:date/extras",
  createExtra
);

router.patch(
  "/:date/extras/:id",
  updateExtra
);

router.delete(
  "/:date/extras/:id",
  deleteExtra
);

export default router;