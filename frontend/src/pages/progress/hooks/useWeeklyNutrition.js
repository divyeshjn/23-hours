import {
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";

import {
  dailyLogService
} from "../../../services/dailyLogService";

import {
  getTodayIST,
  getPeriodStart,
  getPeriodEnd,
  shiftPeriod,
  addDays,
  buildWeeklyData,
  calculateWeeklySummary,
  aggregateChartData
} from "../../../utils/weeklyNutrition";

export default function useWeeklyNutrition() {
  const [logs, setLogs] = useState([]);

  const [period, setPeriod] = useState("week");

  const [anchorDate, setAnchorDate] = useState(
    getTodayIST
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const today = getTodayIST();

  const loadLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const records = await dailyLogService.getAll();

      if (!Array.isArray(records)) {
        throw new Error("Invalid daily log records");
      }

      setLogs(records);
    } catch (err) {
      setError(
        err.message || "Unable to load nutrition data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  const earliestDate = useMemo(() => {
    const dates = logs
      .filter(log => log.date && log.date <= today)
      .map(log => log.date)
      .sort();

    return dates[0] || today;
  }, [logs, today]);

  const startDate =
    period === "all"
      ? earliestDate
      : getPeriodStart(period, anchorDate);

  const endDate = getPeriodEnd(
    startDate,
    period
  );

  const isCurrentPeriod =
    period === "all" ||
    startDate === getPeriodStart(period, today);

  const days = useMemo(
    () => buildWeeklyData(
      logs,
      startDate,
      endDate
    ),
    [logs, startDate, endDate]
  );

  const summary = useMemo(
    () => calculateWeeklySummary(days),
    [days]
  );

  const chartData = useMemo(
    () => aggregateChartData(days, period),
    [days, period]
  );

  const previousSummary = useMemo(() => {
    if (period === "all") return null;

    const previousStart = shiftPeriod(
      startDate,
      period,
      -1
    );

    let previousEnd = getPeriodEnd(
      previousStart,
      period
    );

    // Compare equal elapsed durations when
    // the current period is still in progress.
    if (isCurrentPeriod) {
      const elapsedDays = days.filter(
        day => !day.future
      ).length;

      const comparableEnd = addDays(
        previousStart,
        elapsedDays - 1
      );

      if (comparableEnd < previousEnd) {
        previousEnd = comparableEnd;
      }
    }

    const previousDays = buildWeeklyData(
      logs,
      previousStart,
      previousEnd
    );

    return calculateWeeklySummary(previousDays);
  }, [
    logs,
    startDate,
    period,
    days,
    isCurrentPeriod
  ]);

  function changePeriod(value) {
    setPeriod(value);
    setAnchorDate(getTodayIST());
  }

  function previousPeriod() {
    if (period === "all") return;

    setAnchorDate(
      shiftPeriod(startDate, period, -1)
    );
  }

  function nextPeriod() {
    if (isCurrentPeriod || period === "all") {
      return;
    }

    const next = shiftPeriod(
      startDate,
      period,
      1
    );

    if (next <= today) {
      setAnchorDate(next);
    }
  }

  return {
    period,
    changePeriod,

    startDate,
    endDate,

    days,
    chartData,
    summary,
    previousSummary,

    isCurrentPeriod,
    previousPeriod,
    nextPeriod,

    resetPeriod: () =>
      setAnchorDate(getTodayIST()),

    loading,
    error,
    refresh: loadLogs
  };
}