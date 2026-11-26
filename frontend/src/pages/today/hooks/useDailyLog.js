import { useState, useEffect } from "react";
import { calculateTotals } from "../../../utils/nutrition";

function getTodayKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function useDailyLog() {
  const date = getTodayKey();

  const storageKey = `23-hours:daily-log:${date}`;

  const [meals, setMeals] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(storageKey)
      ) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(meals)
    );
  }, [meals, storageKey]);

  function saveMeal(mealId, entry) {
    setMeals(previous => ({
      ...previous,
      [mealId]: entry
    }));
  }

  function deleteMeal(mealId) {
    setMeals(previous => {
      const updated = { ...previous };

      delete updated[mealId];

      return updated;
    });
  }

  const totals = calculateTotals(Object.values(meals));

  return {
    meals,
    totals,
    saveMeal,
    deleteMeal
  };
}

export default useDailyLog;
