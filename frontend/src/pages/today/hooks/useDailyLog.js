import useLocalStorage from "../../../hooks/useLocalStorage";
import { calculateTotals } from "../../../utils/nutrition";

const EMPTY_LOG = {
  meals: {},
  completedHabits: {},
  extras: [],
  water: 0,
  workout: {
    completed: false,
    restDay: false,
    description: "",
    duration: ""
  }
};

function useDailyLog(date) {
  const storageKey = `23-hours:daily-log:${date}`;

  const [storedLog, setLog] = useLocalStorage(
    storageKey,
    EMPTY_LOG
  );

  // Support meals saved using our Stage 3 format.
  function normaliseLog(value) {
    if (!value.meals) {
      return {
        ...EMPTY_LOG,
        meals: value
      };
    }

    return {
      ...EMPTY_LOG,
      ...value
    };
  }

  const log = normaliseLog(storedLog);

  function updateLog(updater) {
    setLog(previous =>
      updater(normaliseLog(previous))
    );
  }

  function saveMeal(mealId, entry) {
    updateLog(previous => ({
      ...previous,
      meals: {
        ...previous.meals,
        [mealId]: entry
      }
    }));
  }

  function deleteMeal(mealId) {
    updateLog(previous => {
      const meals = { ...previous.meals };

      delete meals[mealId];

      return {
        ...previous,
        meals
      };
    });
  }

  function toggleHabit(habit) {
    updateLog(previous => {
      const completedHabits = {
        ...previous.completedHabits
      };

      if (completedHabits[habit.id]) {
        delete completedHabits[habit.id];
      } else {
        completedHabits[habit.id] = {
          ...habit,
          completedAt: new Date().toISOString()
        };
      }

      return {
        ...previous,
        completedHabits
      };
    });
  }

  function changeWater(amount) {
    updateLog(previous => ({
      ...previous,
      water: Math.max(0, previous.water + amount)
    }));
  }

  function updateWorkout(data) {
    updateLog(previous => ({
      ...previous,
      workout: {
        ...previous.workout,
        ...data
      }
    }));
  }

  function saveExtra(entry) {
    updateLog(previous => {
      const exists = previous.extras.some(
        extra => extra.id === entry.id
      );

      return {
        ...previous,
        extras: exists
          ? previous.extras.map(extra =>
              extra.id === entry.id ? entry : extra
            )
          : [
              ...previous.extras,
              {
                ...entry,
                id: crypto.randomUUID()
              }
            ]
      };
    });
  }

  function deleteExtra(id) {
    updateLog(previous => ({
      ...previous,
      extras: previous.extras.filter(
        extra => extra.id !== id
      )
    }));
  }

  const nutritionEntries = [
    ...Object.values(log.meals),
    ...Object.values(log.completedHabits),
    ...log.extras
  ];

  const totals = calculateTotals(nutritionEntries);

  const hasUnknownNutrition = nutritionEntries.some(
    entry =>
      entry.calories == null ||
      entry.protein == null
  );

  return {
    ...log,
    totals,
    hasUnknownNutrition,
    saveMeal,
    deleteMeal,
    toggleHabit,
    changeWater,
    updateWorkout,
    saveExtra,
    deleteExtra
  };
}

export default useDailyLog;