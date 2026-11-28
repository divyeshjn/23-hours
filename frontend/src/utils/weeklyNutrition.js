import { getTodayKey } from "./date";

export function getTodayIST() {
  return getTodayKey();
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

export function buildWeeklyData(
  logs,
  weekStart,
  endDate = addDays(weekStart, 6)
) {
  const logMap = new Map(
    logs.map(log => [log.date, log])
  );

  const today = getTodayIST();

  return getDateRange(weekStart, endDate).map(date => {
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

export function getDateRange(start, end) {
  const dates = [];

  for (
    let date = start;
    date <= end;
    date = addDays(date, 1)
  ) {
    dates.push(date);
  }

  return dates;
}

export function getPeriodStart(
  period,
  date = getTodayIST()
) {
  switch (period) {
    case "week":
      return getWeekStart(date);

    case "month":
      return `${date.slice(0, 7)}-01`;

    case "year":
      return `${date.slice(0, 4)}-01-01`;

    default:
      return date;
  }
}

export function shiftPeriod(start, period, amount) {
  if (period === "week") {
    return addDays(start, amount * 7);
  }

  const date = new Date(`${start}T12:00:00Z`);

  if (period === "month") {
    date.setUTCMonth(date.getUTCMonth() + amount);
  }

  if (period === "year") {
    date.setUTCFullYear(
      date.getUTCFullYear() + amount
    );
  }

  return date.toISOString().slice(0, 10);
}

export function getPeriodEnd(start, period) {
  if (period === "all") {
    return getTodayIST();
  }

  return addDays(
    shiftPeriod(start, period, 1),
    -1
  );
}

export function formatPeriodLabel(
  start,
  end,
  period
) {
  const date = new Date(`${start}T12:00:00Z`);

  if (period === "all") {
    return "All recorded history";
  }

  if (period === "year") {
    return start.slice(0, 4);
  }

  if (period === "month") {
    return date.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata"
    });
  }

  return `${formatShortDate(start)} ${start.slice(0, 4)} – ${formatShortDate(end)} ${end.slice(0, 4)}`;
}

export function aggregateChartData(days, period) {
  if (period === "week" || period === "month") {
    return days;
  }

  const groups = new Map();

  for (const day of days) {
    if (day.future) continue;

    const month = day.date.slice(0, 7);

    if (!groups.has(month)) {
      groups.set(month, []);
    }

    groups.get(month).push(day);
  }

  return Array.from(groups, ([month, records]) => {
    const summary = calculateWeeklySummary(records);

    return {
      date: `${month}-01`,

      label: new Date(`${month}-01T12:00:00Z`)
        .toLocaleDateString("en-IN", {
          month: "short",
          year: "2-digit",
          timeZone: "Asia/Kolkata"
        }),

      calories: summary.averageCalories,
      protein: summary.averageProtein,
      water: summary.averageWater,

      future: false
    };
  });
}