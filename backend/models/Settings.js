import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      type: String,
      default: "✨"
    },
    category: {
      type: String,
      enum: ["food", "supplement", "activity"],
      default: "food"
    },
    quantity: {
      type: String,
      default: ""
    },
    calories: {
      type: Number,
      min: 0,
      default: null
    },
    protein: {
      type: Number,
      min: 0,
      default: null
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  { _id: false }
);

const settingsSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
      default: "default",
      unique: true,
      required: true
    },

    targets: {
      calories: {
        type: Number,
        default: 1800,
        min: 1
      },
      protein: {
        type: Number,
        default: 90,
        min: 1
      },
      water: {
        type: Number,
        default: 3000,
        min: 1
      }
    },

    habits: {
      type: [habitSchema],
      default: []
    },

    measurementUnit: {
      type: String,
      enum: ["cm", "in"],
      default: "in"
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata"
    }
  },
  { timestamps: true }
);

const Settings = mongoose.model(
  "Settings",
  settingsSchema
);

export default Settings;