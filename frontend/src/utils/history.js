import { getTodayKey } from "./date";

export function getCurrentMonth() {
  return getTodayKey().slice(0, 7);
}

export function changeMonth(month, amount) {
  const [year, monthNumber] = month
    .split("-")
    .map(Number);

  const date = new Date(
    Date.UTC(year, monthNumber - 1 + amount, 1)
  );

  return date.toISOString().slice(0, 7);
}

export function formatMonth(month) {
  return new Date(`${month}-01T12:00:00Z`)
    .toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata"
    });
}

export function getCalendarDays(month) {
  const [year, monthNumber] = month
    .split("-")
    .map(Number);

  const firstDay = new Date(
    Date.UTC(year, monthNumber - 1, 1)
  ).getUTCDay();

  const totalDays = new Date(
    Date.UTC(year, monthNumber, 0)
  ).getUTCDate();

  const days = Array(firstDay).fill(null);

  for (let day = 1; day <= totalDays; day++) {
    days.push({
      day,
      date: `${month}-${String(day).padStart(2, "0")}`
    });
  }

  return days;
}

export function getFoodEntries(log) {
  return [
    ...Object.values(log?.meals || {}),
    ...Object.values(log?.completedHabits || {}),
    ...(log?.extras || [])
  ].filter(Boolean);
}

export function hasRecordedData(log) {
  if (!log) return false;

  return (
    getFoodEntries(log).length > 0 ||
    log.water > 0 ||
    log.workout?.completed === true ||
    log.workout?.restDay === true ||
    Boolean(log.workout?.description) ||
    log.workout?.duration > 0
  );
}

export function getDailySummary(log) {
  const entries = getFoodEntries(log);

  function sumKnown(field) {
    const values = entries
      .map(entry => entry[field])
      .filter(value =>
        typeof value === "number" &&
        Number.isFinite(value)
      );

    return values.length
      ? values.reduce((sum, value) => sum + value, 0)
      : null;
  }

  return {
    calories: sumKnown("calories"),
    protein: sumKnown("protein"),
    water: log?.water > 0 ? log.water : null,

    workout: log?.workout?.completed
      ? "Completed"
      : log?.workout?.restDay
        ? "Rest day"
        : "Not recorded",

    hasUnknownNutrition: entries.some(
      entry =>
        entry.calories == null ||
        entry.protein == null
    )
  };
}