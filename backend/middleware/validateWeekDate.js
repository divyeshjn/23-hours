import {
  isValidDate,
  isSunday,
  getTodayIST
} from "../utils/date.js";

export default function validateWeekDate(
  req,
  res,
  next
) {

  const { weekDate } = req.params;

  if (!isValidDate(weekDate)) {
    return res.status(400).json({
      success: false,
      message: "Invalid week date"
    });
  }

  if (!isSunday(weekDate)) {
    return res.status(400).json({
      success: false,
      message: "Week date must be a Sunday"
    });
  }

  if (weekDate > getTodayIST()) {
    return res.status(400).json({
      success: false,
      message: "Cannot record a future check-in"
    });
  }

  next();
}