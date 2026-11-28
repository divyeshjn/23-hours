import { randomUUID } from "node:crypto";

import DailyLog from "../models/DailyLog.js";
import Settings from "../models/Settings.js";

import { calculateNutrition } from "../utils/nutrition.js";

const MEAL_TYPES = ["breakfast", "lunch", "dinner"];

// HELPERS

function createError(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function pickFields(source, fields) {
  if (!source || typeof source !== "object") {
    throw createError("Invalid request body");
  }

  return Object.fromEntries(
    fields
      .filter(field => Object.hasOwn(source, field))
      .map(field => [field, source[field]])
  );
}

function validateNutrition(data) {
  for (const field of ["calories", "protein"]) {
    const value = data[field];

    if (value === undefined || value === null) {
      continue;
    }

    if (
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      value < 0
    ) {
      throw createError(`Invalid ${field}`);
    }
  }
}

function validateMealType(mealType) {
  if (!MEAL_TYPES.includes(mealType)) {
    throw createError("Invalid meal type");
  }
}

function validateHabitId(id) {
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(id)) {
    throw createError("Invalid essential ID");
  }
}

function formatLog(log) {
  const data = log.toObject({
    flattenMaps: true
  });

  return {
    ...data,
    totals: calculateNutrition(data)
  };
}

function sendLog(res, log, message, status = 200) {
  res.status(status).json({
    success: true,
    message,
    data: formatLog(log)
  });
}

async function updateLog(date, update) {
  return DailyLog.findOneAndUpdate(
    { date },
    update,
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true
    }
  );
}

// GET HISTORICAL LOGS

export async function getDailyLogs(req, res, next) {
  try {
    const logs = await DailyLog.find()
      .sort({ date: -1 });

    res.json({
      success: true,
      count: logs.length,
      data: logs.map(formatLog)
    });

  } catch (error) {
    next(error);
  }
}

// GET A SPECIFIC DAY

export async function getDailyLog(req, res, next) {
  try {
    const { date } = req.params;

    const log = await DailyLog.findOne({ date });

    if (!log) {
      const emptyLog = new DailyLog({ date });

      return sendLog(
        res,
        emptyLog,
        "No entries recorded yet"
      );
    }

    sendLog(res, log, "Daily log retrieved");

  } catch (error) {
    next(error);
  }
}

// SAVE OR UPDATE MEAL

export async function saveMeal(req, res, next) {
  try {
    const { date, mealType } = req.params;

    validateMealType(mealType);

    const meal = pickFields(req.body, [
      "description",
      "calories",
      "protein"
    ]);

    validateNutrition(meal);

    if (
      typeof meal.description !== "string" ||
      !meal.description.trim()
    ) {
      throw createError("Meal description is required");
    }

    const log = await updateLog(date, {
      $set: {
        [`meals.${mealType}`]: meal
      }
    });

    sendLog(res, log, "Meal saved");

  } catch (error) {
    next(error);
  }
}

// DELETE MEAL

export async function deleteMeal(req, res, next) {
  try {
    const { date, mealType } = req.params;

    validateMealType(mealType);

    const log = await DailyLog.findOneAndUpdate(
      { date },
      {
        $unset: {
          [`meals.${mealType}`]: 1
        }
      },
      { new: true }
    );

    if (!log) {
      throw createError("Daily log not found", 404);
    }

    sendLog(res, log, "Meal deleted");

  } catch (error) {
    next(error);
  }
}

// COMPLETE ESSENTIAL

export async function completeHabit(req, res, next) {
  try {
    const { date, habitId } = req.params;

    validateHabitId(habitId);

    const existing = await DailyLog.findOne({ date });

    if (existing?.completedHabits?.has(habitId)) {
      return sendLog(
        res,
        existing,
        "Essential already completed"
      );
    }

    const settings = await Settings.findOne({
      profileId: "default"
    });

    const habit = settings?.habits.find(
      item => item.id === habitId
    );

    if (!habit) {
      throw createError("Essential not found", 404);
    }

    const snapshot = {
      ...habit.toObject(),
      completedAt: new Date()
    };

    const log = await updateLog(date, {
      $set: {
        [`completedHabits.${habitId}`]: snapshot
      }
    });

    sendLog(res, log, "Essential completed");

  } catch (error) {
    next(error);
  }
}

// UNCHECK ESSENTIAL

export async function uncompleteHabit(req, res, next) {
  try {
    const { date, habitId } = req.params;

    validateHabitId(habitId);

    const log = await DailyLog.findOneAndUpdate(
      { date },
      {
        $unset: {
          [`completedHabits.${habitId}`]: 1
        }
      },
      { new: true }
    );

    if (!log) {
      throw createError("Daily log not found", 404);
    }

    sendLog(res, log, "Essential unchecked");

  } catch (error) {
    next(error);
  }
}

// UPDATE WATER

export async function updateWater(req, res, next) {
  try {
    const { date } = req.params;
    const { water } = req.body;

    if (
      !Number.isInteger(water) ||
      water < 0
    ) {
      throw createError("Invalid water quantity");
    }

    const log = await updateLog(date, {
      $set: { water }
    });

    sendLog(res, log, "Water intake updated");

  } catch (error) {
    next(error);
  }
}

// UPDATE WORKOUT

export async function updateWorkout(req, res, next) {
  try {
    const { date } = req.params;

    const workout = pickFields(req.body, [
      "completed",
      "restDay",
      "description",
      "duration"
    ]);

    if (!Object.keys(workout).length) {
      throw createError("No workout fields provided");
    }

    for (const field of ["completed", "restDay"]) {
      if (
        field in workout &&
        typeof workout[field] !== "boolean"
      ) {
        throw createError(`Invalid ${field}`);
      }
    }

    if (workout.duration === "") {
      workout.duration = null;
    }

    if (
      workout.duration != null &&
      (
        typeof workout.duration !== "number" ||
        !Number.isFinite(workout.duration) ||
        workout.duration < 0
      )
    ) {
      throw createError("Invalid workout duration");
    }

    if (workout.restDay === true) {
      workout.completed = false;
    } else if (workout.completed === true) {
      workout.restDay = false;
    }

    const updates = Object.fromEntries(
      Object.entries(workout).map(
        ([key, value]) => [
          `workout.${key}`,
          value
        ]
      )
    );

    const log = await updateLog(date, {
      $set: updates
    });

    sendLog(res, log, "Workout updated");

  } catch (error) {
    next(error);
  }
}

// ADD EXTRA FOOD

export async function createExtra(req, res, next) {
  try {
    const { date } = req.params;

    const extra = pickFields(req.body, [
      "name",
      "quantity",
      "calories",
      "protein"
    ]);

    validateNutrition(extra);

    if (
      typeof extra.name !== "string" ||
      !extra.name.trim()
    ) {
      throw createError("Food name is required");
    }

    extra.id = randomUUID();

    const log = await updateLog(date, {
      $push: {
        extras: extra
      }
    });

    sendLog(res, log, "Extra food added", 201);

  } catch (error) {
    next(error);
  }
}

// EDIT EXTRA FOOD

export async function updateExtra(req, res, next) {
  try {
    const { date, id } = req.params;

    const extra = pickFields(req.body, [
      "name",
      "quantity",
      "calories",
      "protein"
    ]);

    validateNutrition(extra);

    if (!Object.keys(extra).length) {
      throw createError("No updates provided");
    }

    const updates = Object.fromEntries(
      Object.entries(extra).map(
        ([key, value]) => [
          `extras.$.${key}`,
          value
        ]
      )
    );

    const log = await DailyLog.findOneAndUpdate(
      {
        date,
        "extras.id": id
      },
      {
        $set: updates
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!log) {
      throw createError("Extra food not found", 404);
    }

    sendLog(res, log, "Extra food updated");

  } catch (error) {
    next(error);
  }
}

// DELETE EXTRA FOOD

export async function deleteExtra(req, res, next) {
  try {
    const { date, id } = req.params;

    const log = await DailyLog.findOneAndUpdate(
      {
        date,
        "extras.id": id
      },
      {
        $pull: {
          extras: { id }
        }
      },
      { new: true }
    );

    if (!log) {
      throw createError("Extra food not found", 404);
    }

    sendLog(res, log, "Extra food deleted");

  } catch (error) {
    next(error);
  }
}