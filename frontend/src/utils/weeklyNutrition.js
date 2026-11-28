export function getTodayIST() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

export function addDays(date, days) {
  const value = new Date(`${date}T12:00:00Z`);

  value.setUTCDate(value.getUTCDate() + days);

  return value.toISOString().slice(0, 10);
}

export function getWeekStart(date = getTodayIST()) {
  const value = new Date(`${date}T12:00:00Z`);

  return addDays(date, -value.getUTCDay());
}

export function formatShortDate(date) {
  return new Date(`${date}T12:00:00Z`)
    .toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      timeZone: "Asia/Kolkata"
    });
}

export function getWeekDates(weekStart) {
  return Array.from(
    { length: 7 },
    (_, index) => addDays(weekStart, index)
  );
}

function isNumber(value) {
  return typeof value === "number" &&
    Number.isFinite(value);
}

function getFoodEntries(log) {
  return [
    ...Object.values(log?.meals || {}),
    ...Object.values(log?.completedHabits || {})
      .filter(item => item.category !== "activity"),
    ...(log?.extras || [])
  ].filter(Boolean);
}

function getRecordedTotal(entries, field) {
  const values = entries
    .map(item => item[field])
    .filter(isNumber);

  if (!values.length) return null;

  return values.reduce(
    (total, value) => total + value,
    0
  );
}

export function buildWeeklyData(logs, weekStart) {
  const logMap = new Map(
    logs.map(log => [log.date, log])
  );

  const today = getTodayIST();

  return getWeekDates(weekStart).map(date => {
    const log = logMap.get(date);

    const entries = getFoodEntries(log);

    return {
      date,

      label: formatShortDate(date),

      future: date > today,

      logged: Boolean(log),

      calories: getRecordedTotal(entries, "calories"),

      protein: getRecordedTotal(entries, "protein"),

      water: log?.water > 0
        ? log.water
        : null,

      workout: log?.workout?.completed === true,

      restDay: log?.workout?.restDay === true,

      mealsLogged: Object.values(
        log?.meals || {}
      ).filter(Boolean).length
    };
  });
}

function calculateAverage(days, field) {
  const values = days
    .map(day => day[field])
    .filter(isNumber);

  if (!values.length) return null;

  return values.reduce(
    (sum, value) => sum + value,
    0
  ) / values.length;
}

export function calculateWeeklySummary(days) {
  const elapsedDays = days.filter(
    day => !day.future
  );

  return {
    averageCalories: calculateAverage(
      elapsedDays, "calories"
    ),

    averageProtein: calculateAverage(
      elapsedDays, "protein"
    ),

    averageWater: calculateAverage(
      elapsedDays, "water"
    ),

    loggedDays: elapsedDays.filter(
      day => day.logged
    ).length,

    nutritionDays: elapsedDays.filter(
      day => day.calories !== null ||
        day.protein !== null
    ).length,

    workoutDays: elapsedDays.filter(
      day => day.workout
    ).length,

    restDays: elapsedDays.filter(
      day => day.restDay
    ).length,

    elapsedDays: elapsedDays.length
  };
}

export function getTargetPercentage(value, target) {
  if (value === null || !target || target <= 0) {
    return null;
  }

  return Math.round((value / target) * 100);
}

export function getTargetDays(days, field, target) {
  if (!target || target <= 0) {
    return { achieved: 0, recorded: 0 };
  }

  const recorded = days.filter(
    day => !day.future && isNumber(day[field])
  );

  return {
    achieved: recorded.filter(
      day => day[field] >= target
    ).length,

    recorded: recorded.length
  };
}