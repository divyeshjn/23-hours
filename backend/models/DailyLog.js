import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    description: {
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
    imageUrl: {
      type: String,
      default: null
    }
  },
  { _id: false }
);

const completedHabitSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    icon: String,
    category: String,
    quantity: String,

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

    required: Boolean,

    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const extraSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
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
    imageUrl: {
      type: String,
      default: null
    }
  },
  { _id: false }
);

const dailyLogSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{4}-\d{2}-\d{2}$/
    },

    meals: {
      breakfast: {
        type: mealSchema,
        default: undefined
      },
      lunch: {
        type: mealSchema,
        default: undefined
      },
      dinner: {
        type: mealSchema,
        default: undefined
      }
    },

    completedHabits: {
      type: Map,
      of: completedHabitSchema,
      default: {}
    },

    extras: {
      type: [extraSchema],
      default: []
    },

    water: {
      type: Number,
      min: 0,
      default: 0
    },

    workout: {
      completed: {
        type: Boolean,
        default: false
      },
      restDay: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
        default: ""
      },
      duration: {
        type: Number,
        min: 0,
        default: null
      }
    }
  },
  { timestamps: true }
);

const DailyLog = mongoose.model(
  "DailyLog",
  dailyLogSchema
);

export default DailyLog;