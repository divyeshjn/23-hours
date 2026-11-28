import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  CalendarClock,
  X
} from "lucide-react";

import {
  getCurrentWeeklyCheckIn
} from "../../services/weeklyCheckInService";

export default function WeeklyCheckInReminder() {

  const [status, setStatus] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    let active = true;

    const checkReminder = async () => {

      try {

        const data =
          await getCurrentWeeklyCheckIn();

        if (!active) return;

        setStatus(data);

        const storageKey =
          `weekly-checkin-dismissed-${data.weekDate}`;

        const dismissedOn =
          localStorage.getItem(storageKey);

        setVisible(
          !data.completed &&
          dismissedOn !== data.today
        );

      } catch {

        if (active) {
          setVisible(false);
        }
      }
    };

    checkReminder();

    window.addEventListener(
      "focus",
      checkReminder
    );

    return () => {

      active = false;

      window.removeEventListener(
        "focus",
        checkReminder
      );
    };

  }, []);

  const dismissReminder = () => {

    if (!status) return;

    try {

      localStorage.setItem(
        `weekly-checkin-dismissed-${status.weekDate}`,
        status.today
      );

    } finally {
      setVisible(false);
    }
  };

  if (!visible || !status) return null;

  return (

    <div className="relative rounded-2xl border
      border-amber-500/20 bg-amber-500/5 p-4">

      <button
        type="button"
        onClick={dismissReminder}
        aria-label="Dismiss reminder for today"
        className="absolute right-3 top-3
          text-gray-500"
      >
        <X size={18} />
      </button>

      <div className="flex items-start gap-3">

        <div className="rounded-xl
          bg-amber-500/10 p-3 text-amber-600">

          <CalendarClock size={22} />

        </div>

        <div className="flex-1 pr-5">

          <h3 className="font-semibold">
            Weekly check-in is due
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Record your weight and body measurements
            to track your weekly progress.
          </p>

        </div>

      </div>

      <div className="mt-4 flex justify-end gap-3">

        <button
          type="button"
          onClick={dismissReminder}
          className="rounded-lg px-4 py-2
            text-sm text-gray-500"
        >
          Later
        </button>

        <Link
          to="/weekly-checkin"
          className="rounded-lg bg-emerald-600
            px-4 py-2 text-sm font-medium text-white"
        >
          Check in now
        </Link>

      </div>

    </div>
  );
}