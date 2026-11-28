import {
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";

import {
  dailyLogService
} from "../../../services/dailyLogService";

import {
  getTodayKey
} from "../../../utils/date";

import {
  getCurrentMonth,
  changeMonth,
  hasRecordedData,
  getDailySummary
} from "../../../utils/history";

export default function useHistory() {
  const today = getTodayKey();

  const [logs, setLogs] = useState([]);

  const [month, setMonth] = useState(
    getCurrentMonth
  );

  const [selectedDate, setSelectedDate] =
    useState(today);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await dailyLogService.getAll();

      if (!Array.isArray(data)) {
        throw new Error("Invalid history records");
      }

      setLogs(data);

    } catch (err) {
      setError(
        err.message || "Unable to load history"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const logMap = useMemo(() => {
    return new Map(
      logs.map(log => [log.date, log])
    );
  }, [logs]);

  const recordedDates = useMemo(() => {
    return new Set(
      logs
        .filter(hasRecordedData)
        .map(log => log.date)
    );
  }, [logs]);

  const selectedLog = logMap.get(selectedDate);

  const summary = useMemo(
    () => getDailySummary(selectedLog),
    [selectedLog]
  );

  function selectDate(date) {
    if (date > today) return;

    setSelectedDate(date);
    setMonth(date.slice(0, 7));
  }

  function previousMonth() {
    setMonth(previous =>
      changeMonth(previous, -1)
    );
  }

  function nextMonth() {
    setMonth(previous => {
      const next = changeMonth(previous, 1);

      return next <= getCurrentMonth()
        ? next
        : previous;
    });
  }

  function goToToday() {
    setMonth(getCurrentMonth());
    setSelectedDate(getTodayKey());
  }

  function updateLocalLog(updatedLog) {
    if (!updatedLog?.date) return;

    setLogs(previous => [
      ...previous.filter(
        log => log.date !== updatedLog.date
      ),
      updatedLog
    ]);
  }

  return {
    month,
    today,
    selectedDate,
    selectedLog,

    recordedDates,
    summary,

    hasData: hasRecordedData(selectedLog),

    isCurrentMonth: month === getCurrentMonth(),

    selectDate,
    previousMonth,
    nextMonth,
    goToToday,

    loading,
    error,
    
    updateLocalLog,

    refresh: loadHistory
  };
}