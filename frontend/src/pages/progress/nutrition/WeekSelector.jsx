import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import {
  formatPeriodLabel
} from "../../../utils/weeklyNutrition";

const PERIODS = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
  { value: "all", label: "All time" }
];

export default function WeekSelector({
  period,
  changePeriod,
  startDate,
  endDate,
  isCurrentPeriod,
  previousPeriod,
  nextPeriod,
  resetPeriod
}) {
  return (
    <section className="rounded-2xl border
      border-border bg-card p-4 space-y-5">

      <div className="grid grid-cols-4 gap-1
        rounded-xl bg-background p-1">

        {PERIODS.map(item => (
          <button
            key={item.value}
            type="button"
            onClick={() => changePeriod(item.value)}
            className={`rounded-lg px-2 py-2.5
              text-xs sm:text-sm font-medium
              transition-colors
              ${
                period === item.value
                  ? "bg-primary text-background"
                  : "text-muted"
              }`}
          >
            {item.label}
          </button>
        ))}

      </div>

      <div className="flex items-center
        justify-between gap-3">

        {period !== "all" && (
          <button
            type="button"
            onClick={previousPeriod}
            aria-label="Previous period"
            className="rounded-lg border
              border-border p-2 text-primary"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div className="flex-1 text-center">

          <p className="font-heading
            font-bold text-primary">

            {formatPeriodLabel(
              startDate,
              endDate,
              period
            )}

          </p>

          {period !== "all" && (
            <p className="mt-1 text-xs text-muted">
              {isCurrentPeriod
                ? `This ${period}`
                : `Past ${period}`}
            </p>
          )}

        </div>

        {period !== "all" && (
          <button
            type="button"
            onClick={nextPeriod}
            disabled={isCurrentPeriod}
            aria-label="Next period"
            className="rounded-lg border
              border-border p-2 text-primary
              disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        )}

      </div>

      {!isCurrentPeriod && (
        <button
          type="button"
          onClick={resetPeriod}
          className="block mx-auto text-xs
            font-medium text-primary"
        >
          Return to current {period}
        </button>
      )}

    </section>
  );
}