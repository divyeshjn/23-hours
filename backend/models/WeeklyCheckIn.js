import mongoose from "mongoose";

const measurementField = {
  type: Number,
  min: 0.1,
  default: null
};

const weeklyCheckInSchema = new mongoose.Schema(
  {
    weekDate: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{4}-\d{2}-\d{2}$/
    },

    measuredOn: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/
    },

    weight: {
      type: Number,
      min: 0.1,
      default: null
    },

    unit: {
      type: String,
      enum: ["cm", "in"],
      default: "in"
    },

    measurements: {
      chest: measurementField,
      waist: measurementField,
      lowerAbdomen: measurementField,
      hips: measurementField,
      leftThigh: measurementField,
      rightThigh: measurementField,
      leftUpperArm: measurementField,
      rightUpperArm: measurementField
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "WeeklyCheckIn",
  weeklyCheckInSchema
);