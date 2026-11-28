import WeeklyCheckIn from "../models/WeeklyCheckIn.js";
import Settings from "../models/Settings.js";

import {
  getTodayIST,
  getLatestSunday,
  isValidDate
} from "../utils/date.js";

const MEASUREMENT_FIELDS = [
  "chest",
  "waist",
  "lowerAbdomen",
  "hips",
  "leftThigh",
  "rightThigh",
  "leftUpperArm",
  "rightUpperArm"
];

function createError(message, status = 400) {

  const error = new Error(message);

  error.status = status;

  return error;
}

function validateNumber(value, field) {

  if (value === null || value === undefined) {
    return null;
  }

  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0.1
  ) {
    throw createError(
      `${field} must be a positive number`
    );
  }

  return value;
}

function createEmptyCheckIn(
  weekDate,
  unit = "in"
) {

  return {
    weekDate,

    measuredOn: getTodayIST(),

    weight: null,

    unit,

    measurements: Object.fromEntries(
      MEASUREMENT_FIELDS.map(field => [
        field,
        null
      ])
    ),

    notes: ""
  };
}

// GET ALL CHECK-INS

export async function getAllCheckIns(
  req,
  res,
  next
) {

  try {

    const checkIns = await WeeklyCheckIn
      .find()
      .sort({ weekDate: -1 })
      .lean();

    return res.json({
      success: true,
      data: checkIns
    });

  } catch (error) {
    next(error);
  }
}

// GET CURRENT WEEK STATUS

export async function getCurrentCheckIn(
  req,
  res,
  next
) {

  try {

    const weekDate = getLatestSunday();

    const [checkIn, settings] = await Promise.all([
      WeeklyCheckIn.findOne({ weekDate }).lean(),

      Settings.findOne({
        profileId: "default"
      }).lean()
    ]);

    const unit =
      settings?.measurementUnit || "in";

    return res.json({
      success: true,

      data: {
        weekDate,

        today: getTodayIST(),

        completed: Boolean(checkIn),

        checkIn:
          checkIn ||
          createEmptyCheckIn(weekDate, unit)
      }
    });

  } catch (error) {
    next(error);
  }
}

// GET SPECIFIC WEEK

export async function getCheckIn(
  req,
  res,
  next
) {

  try {

    const { weekDate } = req.params;

    const [checkIn, settings] = await Promise.all([
      WeeklyCheckIn.findOne({ weekDate }).lean(),

      Settings.findOne({
        profileId: "default"
      }).lean()
    ]);

    return res.json({
      success: true,

      data: {
        completed: Boolean(checkIn),

        checkIn:
          checkIn ||
          createEmptyCheckIn(
            weekDate,
            settings?.measurementUnit || "in"
          )
      }
    });

  } catch (error) {
    next(error);
  }
}

// CREATE OR UPDATE CHECK-IN

export async function saveCheckIn(
  req,
  res,
  next
) {

  try {

    const { weekDate } = req.params;

    const {
      measuredOn,
      weight,
      unit,
      measurements = {},
      notes = ""
    } = req.body || {};

    // Validate measurement date

    if (!isValidDate(measuredOn)) {
      throw createError(
        "A valid measurement date is required"
      );
    }

    if (measuredOn > getTodayIST()) {
      throw createError(
        "Measurement date cannot be in the future"
      );
    }

    // Validate unit

    if (!["cm", "in"].includes(unit)) {
      throw createError(
        "Measurement unit must be cm or in"
      );
    }

    // Validate measurement object

    if (
      !measurements ||
      typeof measurements !== "object" ||
      Array.isArray(measurements)
    ) {
      throw createError(
        "Invalid measurements"
      );
    }

    // Validate body weight

    const validatedWeight = validateNumber(
      weight,
      "Weight"
    );

    // Validate individual measurements

    const validatedMeasurements = {};

    for (const field of MEASUREMENT_FIELDS) {

      validatedMeasurements[field] =
        validateNumber(
          measurements[field],
          field
        );
    }

    // Require at least one recorded value

    const hasMeasurement = Object
      .values(validatedMeasurements)
      .some(value => value !== null);

    if (
      validatedWeight === null &&
      !hasMeasurement
    ) {
      throw createError(
        "Enter your weight or at least one body measurement"
      );
    }

    // Validate notes

    if (
      typeof notes !== "string" ||
      notes.length > 2000
    ) {
      throw createError(
        "Notes must contain at most 2000 characters"
      );
    }

    // Create or replace the weekly record

    const checkIn =
      await WeeklyCheckIn.findOneAndUpdate(
        { weekDate },

        {
          $set: {
            measuredOn,

            weight: validatedWeight,

            unit,

            measurements:
              validatedMeasurements,

            notes: notes.trim()
          }
        },

        {
          new: true,

          upsert: true,

          runValidators: true,

          setDefaultsOnInsert: true
        }
      );

    return res.json({
      success: true,

      message: "Weekly check-in saved",

      data: checkIn
    });

  } catch (error) {
    next(error);
  }
}

// DELETE CHECK-IN

export async function deleteCheckIn(
  req,
  res,
  next
) {

  try {

    const { weekDate } = req.params;

    const checkIn =
      await WeeklyCheckIn.findOneAndDelete({
        weekDate
      });

    if (!checkIn) {
      throw createError(
        "Check-in not found",
        404
      );
    }

    return res.json({
      success: true,

      message: "Weekly check-in deleted"
    });

  } catch (error) {
    next(error);
  }
}