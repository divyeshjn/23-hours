import {
  useState,
  useEffect,
  useCallback,
  useRef
} from "react";

import { dailyLogService } from "../../../services/dailyLogService";

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

function normaliseLog(data) {
  return {
    ...EMPTY_LOG,
    ...data,

    meals: data.meals || {},
    completedHabits: data.completedHabits || {},
    extras: data.extras || [],

    workout: {
      ...EMPTY_LOG.workout,
      ...data.workout,
      duration: data.workout?.duration ?? ""
    }
  };
}

export default function useDailyLog(date, onLogUpdated) {
  const [log, setLog] = useState(EMPTY_LOG);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const logRef = useRef(EMPTY_LOG);
  const queueRef = useRef(Promise.resolve());
  const pendingRef = useRef(0);
  const readyRef = useRef(false);

  function applyLog(data) {
    const updatedLog = normaliseLog(data);

    logRef.current = updatedLog;
    setLog(updatedLog);
  }

  // FETCH DAILY LOG

  const loadLog = useCallback(async () => {
    if (pendingRef.current > 0) {
      return;
    }

    try {
      readyRef.current = false;

      setLoading(true);
      setError(null);

      const data =
        await dailyLogService.getByDate(date);

      applyLog(data);

      readyRef.current = true;

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    loadLog();
  }, [loadLog]);

  // PROCESS UPDATES SEQUENTIALLY

  function executeUpdate(operation) {
    if (!readyRef.current) {
      setError("Daily log is not ready.");
      return Promise.resolve(false);
    }

    pendingRef.current += 1;
    setSaving(true);

    const task = queueRef.current.then(async () => {
      try {
        setError(null);

        const data = await operation();

        applyLog(data);
        onLogUpdated?.(data);
        return true;

      } catch (error) {
        setError(error.message);

        return false;

      } finally {
        pendingRef.current -= 1;

        if (pendingRef.current === 0) {
          setSaving(false);
        }
      }
    });

    queueRef.current = task;

    return task;
  }

  // MEALS

  function saveMeal(mealId, entry) {
    return executeUpdate(() =>
      dailyLogService.saveMeal(
        date,
        mealId,
        entry
      )
    );
  }

  function deleteMeal(mealId) {
    return executeUpdate(() =>
      dailyLogService.deleteMeal(
        date,
        mealId
      )
    );
  }

  // CUSTOM ESSENTIALS

  function toggleHabit(habit) {
    return executeUpdate(() => {
      const completed =
        logRef.current.completedHabits[habit.id];

      if (completed) {
        return dailyLogService.uncompleteHabit(
          date,
          habit.id
        );
      }

      return dailyLogService.completeHabit(
        date,
        habit.id
      );
    });
  }

  // WATER

  function changeWater(amount) {
    return executeUpdate(() => {
      const water = Math.max(
        0,
        logRef.current.water + amount
      );

      return dailyLogService.updateWater(
        date,
        water
      );
    });
  }

  // WORKOUT

  function updateWorkout(data) {
    return executeUpdate(() =>
      dailyLogService.updateWorkout(
        date,
        data
      )
    );
  }

  // EXTRA FOODS

  function saveExtra(entry) {
    return executeUpdate(() => {
      if (entry.id) {
        return dailyLogService.updateExtra(
          date,
          entry.id,
          entry
        );
      }

      return dailyLogService.createExtra(
        date,
        entry
      );
    });
  }

  function deleteExtra(id) {
    return executeUpdate(() =>
      dailyLogService.deleteExtra(date, id)
    );
  }

  // NUTRITION TOTALS

  const entries = [
    ...Object.values(log.meals),
    ...Object.values(log.completedHabits),
    ...log.extras
  ].filter(Boolean);

  const totals = calculateTotals(entries);

  const hasUnknownNutrition = entries.some(
    entry =>
      entry.calories == null ||
      entry.protein == null
  );

  return {
    ...log,

    totals,
    hasUnknownNutrition,

    loading,
    saving,
    error,
    ready: readyRef.current,

    loadLog,

    saveMeal,
    deleteMeal,

    toggleHabit,

    changeWater,
    updateWorkout,

    saveExtra,
    deleteExtra
  };
}