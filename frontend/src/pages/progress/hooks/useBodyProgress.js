import {
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";

import {
  getWeeklyCheckIns
} from "../../../services/weeklyCheckInService";

import {
  MEASUREMENT_FIELDS,
  getMetricHistory,
  getMetricSummary
} from "../../../utils/bodyProgress";

export default function useBodyProgress(
  unit = "in"
) {

  const [checkIns, setCheckIns] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadProgress = useCallback(async () => {

    try {

      setLoading(true);
      setError("");

      const records = await getWeeklyCheckIns();

      if (!Array.isArray(records)) {
        throw new Error("Invalid check-in records");
      }

      setCheckIns(records);

    } catch (err) {

      setError(
        err.message || "Unable to load progress"
      );

    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const weightHistory = useMemo(
    () => getMetricHistory(checkIns, "weight"),
    [checkIns]
  );

  const weightSummary = useMemo(
    () => getMetricSummary(weightHistory),
    [weightHistory]
  );

  const measurements = useMemo(() => {

    return MEASUREMENT_FIELDS.map(field => {

      const history = getMetricHistory(
        checkIns,
        field.key,
        unit
      );

      return {
        ...field,

        history,

        ...getMetricSummary(history)
      };

    });

  }, [checkIns, unit]);

  const waistSummary = measurements.find(
    item => item.key === "waist"
  );

  return {
    checkIns,

    totalCheckIns: checkIns.length,

    weightHistory,
    weightSummary,

    measurements,
    waistSummary,

    loading,
    error,

    refresh: loadProgress
  };
}