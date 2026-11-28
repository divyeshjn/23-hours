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
      border-amber-500/20 bg-amber-500/5
      p-4 sm:p-5">

      <button
        type="button"
        onClick={dismissReminder}
        aria-label="Dismiss reminder for today"
        className="absolute right-3 top-3
          flex h-8 w-8 items-center justify-center
          rounded-lg text-muted
          transition-colors hover:bg-surface
          hover:text-foreground"
      >
        <X size={18} />
      </button>

      <div className="flex items-start gap-3">

        <div className="flex h-12 w-12 shrink-0
          items-center justify-center rounded-xl
          bg-amber-500/10 text-amber-400">

          <CalendarClock size={23} />

        </div>

        <div className="min-w-0 flex-1 pr-6">

          <h3 className="font-heading font-bold
            text-foreground">
            Weekly check-in is due
          </h3>

          <p className="mt-1.5 text-sm
            leading-relaxed text-muted">

            Record your weight and body measurements
            to track your weekly progress.

          </p>

        </div>

      </div>

      <div className="mt-4 flex flex-wrap
        justify-end gap-3">

        <button
          type="button"
          onClick={dismissReminder}
          className="rounded-xl px-4 py-2.5
            text-sm font-medium text-muted
            transition-colors hover:bg-surface
            hover:text-foreground"
        >
          Later
        </button>

        <Link
          to="/weekly-checkin"
          className="rounded-xl bg-primary
            px-4 py-2.5 text-sm font-bold
            text-background transition-opacity
            hover:opacity-90"
        >
          Check in now
        </Link>

      </div>

    </div>
  );
}