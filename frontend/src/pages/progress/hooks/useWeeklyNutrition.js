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
  getWeekStart,
  addDays,
  buildWeeklyData,
  calculateWeeklySummary
} from "../../../utils/weeklyNutrition";

export default function useWeeklyNutrition() {
  const [logs, setLogs] = useState([]);

  const [weekStart, setWeekStart] = useState(
    () => getWeekStart()
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentWeek = getWeekStart();

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

  const days = useMemo(
    () => buildWeeklyData(logs, weekStart),
    [logs, weekStart]
  );

  const summary = useMemo(
    () => calculateWeeklySummary(days),
    [days]
  );

  const previousWeek = () => {
    setWeekStart(previous => addDays(previous, -7));
  };

  const nextWeek = () => {
    setWeekStart(previous => {
      const next = addDays(previous, 7);

      return next <= currentWeek
        ? next
        : currentWeek;
    });
  };

  return {
    days,
    summary,

    weekStart,
    weekEnd: addDays(weekStart, 6),

    isCurrentWeek: weekStart === currentWeek,

    previousWeek,
    nextWeek,

    resetWeek: () => setWeekStart(getWeekStart()),

    loading,
    error,

    refresh: loadLogs
  };
}