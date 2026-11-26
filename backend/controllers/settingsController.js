import { randomUUID } from "node:crypto";
import Settings from "../models/Settings.js";

const PROFILE_ID = "default";

async function getProfile() {
  const settings = await Settings.findOne({
    profileId: PROFILE_ID
  });

  if (!settings) {
    const error = new Error("Settings not found");
    error.status = 404;
    throw error;
  }

  return settings;
}

function pickFields(source, fields) {
  return Object.fromEntries(
    fields
      .filter(field => Object.hasOwn(source, field))
      .map(field => [field, source[field]])
  );
}

const HABIT_FIELDS = [
  "name",
  "icon",
  "category",
  "quantity",
  "calories",
  "protein",
  "required"
];

// GET SETTINGS

export async function getSettings(req, res, next) {
  try {
    const settings = await getProfile();

    res.json({
      success: true,
      data: settings
    });

  } catch (error) {
    next(error);
  }
}

// UPDATE TARGETS

export async function updateTargets(req, res, next) {
  try {
    const targets = pickFields(req.body, [
      "calories",
      "protein",
      "water"
    ]);

    if (
      !Object.keys(targets).length ||
      Object.values(targets).some(
        value =>
          typeof value !== "number" ||
          !Number.isFinite(value) ||
          value <= 0
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid nutritional targets"
      });
    }

    const settings = await getProfile();

    Object.assign(settings.targets, targets);

    await settings.save();

    res.json({
      success: true,
      message: "Targets updated",
      data: settings
    });

  } catch (error) {
    next(error);
  }
}

// CREATE CUSTOM HABIT

export async function createHabit(req, res, next) {
  try {
    const settings = await getProfile();

    const habit = pickFields(
      req.body,
      HABIT_FIELDS
    );

    habit.id = randomUUID();

    settings.habits.push(habit);

    await settings.save();

    res.status(201).json({
      success: true,
      message: "Essential created",
      data: settings
    });

  } catch (error) {
    next(error);
  }
}

// UPDATE CUSTOM HABIT

export async function updateHabit(req, res, next) {
  try {
    const settings = await getProfile();

    const habit = settings.habits.find(
      item => item.id === req.params.id
    );

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Essential not found"
      });
    }

    const updates = pickFields(
      req.body,
      HABIT_FIELDS
    );

    Object.assign(habit, updates);

    await settings.save();

    res.json({
      success: true,
      message: "Essential updated",
      data: settings
    });

  } catch (error) {
    next(error);
  }
}

// DELETE CUSTOM HABIT

export async function deleteHabit(req, res, next) {
  try {
    const settings = await getProfile();

    const exists = settings.habits.some(
      item => item.id === req.params.id
    );

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Essential not found"
      });
    }

    settings.habits = settings.habits.filter(
      item => item.id !== req.params.id
    );

    await settings.save();

    res.json({
      success: true,
      message: "Essential deleted",
      data: settings
    });

  } catch (error) {
    next(error);
  }
}

// UPDATE PREFERENCES

export async function updatePreferences(req, res, next) {
  try {
    const { measurementUnit } = req.body;

    if (!["cm", "in"].includes(measurementUnit)) {
      return res.status(400).json({
        success: false,
        message: "Invalid measurement unit"
      });
    }

    const settings = await getProfile();

    settings.measurementUnit = measurementUnit;

    await settings.save();

    res.json({
      success: true,
      message: "Preferences updated",
      data: settings
    });

  } catch (error) {
    next(error);
  }
}