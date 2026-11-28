import {
  Flame,
  Beef,
  Droplets,
  Dumbbell
} from "lucide-react";

import ProgressStat
  from "../../progress/components/ProgressStat";

export default function HistoryDaySummary({
  summary
}) {
  return (
    <div className="space-y-3">

      <div className="grid grid-cols-2
        lg:grid-cols-4 gap-3">

        <ProgressStat
          label="Calories"
          value={
            summary.calories === null
              ? null
              : Math.round(summary.calories)
          }
          unit="kcal"
          icon={Flame}
        />

        <ProgressStat
          label="Protein"
          value={
            summary.protein === null
              ? null
              : summary.protein.toFixed(1)
          }
          unit="g"
          icon={Beef}
        />

        <ProgressStat
          label="Water"
          value={
            summary.water === null
              ? null
              : (summary.water / 1000).toFixed(2)
          }
          unit="L"
          icon={Droplets}
        />

        <div className="rounded-2xl border
          border-border bg-card p-4">

          <div className="flex items-center
            justify-between gap-2">

            <p className="text-xs
              sm:text-sm text-muted">
              Workout
            </p>

            <Dumbbell
              size={17}
              className="text-primary"
            />

          </div>

          <p className="mt-3 font-heading
            text-lg sm:text-xl
            font-bold text-primary">

            {summary.workout}

          </p>

        </div>

      </div>

      {summary.hasUnknownNutrition && (
        <p className="text-xs text-muted">
          Some entries have unknown nutritional
          values. Totals include known values only.
        </p>
      )}

    </div>
  );
}