import { useState, useEffect } from "react";
import { getTodayKey } from "../utils/date";

function useTodayDate() {
  const [date, setDate] = useState(getTodayKey);

  useEffect(() => {
    function updateDate() {
      setDate(getTodayKey());
    }

    const interval = setInterval(updateDate, 1000);

    window.addEventListener("focus", updateDate);

    document.addEventListener(
      "visibilitychange",
      updateDate
    );

    return () => {
      clearInterval(interval);

      window.removeEventListener(
        "focus",
        updateDate
      );

      document.removeEventListener(
        "visibilitychange",
        updateDate
      );
    };
  }, []);

  return date;
}

export default useTodayDate;