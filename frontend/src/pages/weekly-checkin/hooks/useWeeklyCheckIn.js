import {
  useState,
  useEffect,
  useCallback
} from "react";

import {
  getWeeklyCheckIns,
  getCurrentWeeklyCheckIn,
  saveWeeklyCheckIn
} from "../../../services/weeklyCheckInService";

export default function useWeeklyCheckIn() {

  const [checkIns, setCheckIns] = useState([]);
  const [current, setCurrent] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadCheckIns = useCallback(async () => {

    try {

      setLoading(true);
      setError("");

      const [records, currentStatus] =
        await Promise.all([
          getWeeklyCheckIns(),
          getCurrentWeeklyCheckIn()
        ]);

      setCheckIns(records);
      setCurrent(currentStatus);

    } catch (err) {

      setError(
        err.message || "Unable to load check-ins"
      );

    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    loadCheckIns();
  }, [loadCheckIns]);

  const save = async (payload) => {

    if (!current?.weekDate) return false;

    try {

      setSaving(true);
      setError("");

      const record = await saveWeeklyCheckIn(
        current.weekDate,
        payload
      );

      setCurrent(previous => ({
        ...previous,
        completed: true,
        checkIn: record
      }));

      setCheckIns(previous => [
        record,
        ...previous.filter(
          item => item.weekDate !== record.weekDate
        )
      ]);

      return true;

    } catch (err) {

      setError(
        err.message || "Unable to save check-in"
      );

      return false;

    } finally {
      setSaving(false);
    }
  };

  return {
    checkIns,

    currentCheckIn: current?.checkIn,

    completed: current?.completed ?? false,

    weekDate: current?.weekDate,

    loading,
    saving,
    error,
    save,

    refresh: loadCheckIns
  };
}