import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import {
  formatShortDate
} from "../../../utils/weeklyNutrition";

export default function WeekSelector({
  weekStart,
  weekEnd,
  isCurrentWeek,
  previousWeek,
  nextWeek,
  resetWeek
}) {
  return (
    <div className="rounded-2xl border
      border-border bg-card p-4">

      <div className="flex items-center
        justify-between gap-3">

        <button
          type="button"
          onClick={previousWeek}
          aria-label="Previous week"
          className="rounded-lg border
            border-border p-2 text-primary"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="text-center">
          <p className="font-heading
            font-bold text-primary">
            {formatShortDate(weekStart)}
            {" – "}
            {formatShortDate(weekEnd)}
            {", "}
            {weekEnd.slice(0, 4)}
          </p>

          <p className="mt-1 text-xs text-muted">
            {isCurrentWeek
              ? "This week"
              : "Previous week"}
          </p>
        </div>

        <button
          type="button"
          onClick={nextWeek}
          disabled={isCurrentWeek}
          aria-label="Next week"
          className="rounded-lg border
            border-border p-2 text-primary
            disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>

      </div>

      {!isCurrentWeek && (
        <button
          type="button"
          onClick={resetWeek}
          className="mt-3 block mx-auto
            text-xs font-medium text-primary"
        >
          Return to this week
        </button>
      )}

    </div>
  );
}