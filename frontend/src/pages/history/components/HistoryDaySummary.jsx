import {
  Flame,
  Beef,
  Droplets,
  Dumbbell,
  AlertCircle
} from "lucide-react";

import ProgressStat
  from "../../progress/components/ProgressStat";

export default function HistoryDaySummary({
  summary
}) {
  return (
    <div className="min-w-0 space-y-4">

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

        <div className="min-w-0 rounded-2xl
          border border-border bg-card p-4">

          <div className="flex items-center
            justify-between gap-2">

            <p className="text-xs
              sm:text-sm text-muted">
              Workout
            </p>

            <Dumbbell
              size={18}
              className="shrink-0 text-primary"
            />

          </div>

          <p className={`mt-3 break-words
            font-heading text-lg sm:text-xl
            font-bold ${
              summary.workout === "Completed"
                ? "text-primary"
                : "text-foreground"
            }`}>

            {summary.workout}

          </p>

        </div>

      </div>

      {summary.hasUnknownNutrition && (

        <div className="flex items-start gap-2
          rounded-xl border border-amber-500/15
          bg-amber-500/5 px-4 py-3">

          <AlertCircle
            size={16}
            className="mt-0.5 shrink-0 text-amber-400"
          />

          <p className="text-xs leading-relaxed text-muted">

            Some entries have unknown nutritional
            values. Totals include known values only.

          </p>

        </div>

      )}

    </div>
  );
}