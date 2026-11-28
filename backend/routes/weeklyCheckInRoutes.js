import express from "express";

import {
  getAllCheckIns,
  getCurrentCheckIn,
  getCheckIn,
  saveCheckIn,
  deleteCheckIn
} from "../controllers/weeklyCheckInController.js";

import validateWeekDate
  from "../middleware/validateWeekDate.js";

const router = express.Router();

router.get(
  "/",
  getAllCheckIns
);

router.get(
  "/current",
  getCurrentCheckIn
);

router.use(
  "/:weekDate",
  validateWeekDate
);

router.get(
  "/:weekDate",
  getCheckIn
);

router.put(
  "/:weekDate",
  saveCheckIn
);

router.delete(
  "/:weekDate",
  deleteCheckIn
);

export default router;