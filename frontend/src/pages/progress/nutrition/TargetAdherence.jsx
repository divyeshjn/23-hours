import {
  getTargetPercentage,
  getTargetDays
} from "../../../utils/weeklyNutrition";

export default function TargetAdherence({
  summary,
  targets,
  days
}) {
  const nutrients = [
    {
      label: "Calories",
      metric: "calories",
      value: summary.averageCalories,
      target: targets?.calories,
      unit: "kcal",
      divisor: 1
    },
    {
      label: "Protein",
      metric: "protein",
      value: summary.averageProtein,
      target: targets?.protein,
      unit: "g",
      divisor: 1
    },
    {
      label: "Water",
      metric: "water",
      value: summary.averageWater,
      target: targets?.water,
      unit: "L",
      divisor: 1000
    }
  ];

  return (
    <section className="rounded-2xl border
      border-border bg-card p-4 sm:p-6">

      <h2 className="font-heading
        font-bold text-lg">
        Target adherence
      </h2>

      <p className="mt-1 text-sm text-muted">
        Average recorded intake against current targets
      </p>

      <div className="mt-6 space-y-6">

        {nutrients.map(item => {
          const percentage = getTargetPercentage(
            item.value,
            item.target
          );

          const consistency = getTargetDays(
            days,
            item.metric,
            item.target
          );

          const format = value =>
            value == null
              ? "—"
              : (value / item.divisor).toFixed(
                  item.divisor === 1 ? 0 : 2
                );

          return (
            <div key={item.metric}>

              <div className="flex flex-wrap
                items-center justify-between
                gap-2 text-sm">

                <span className="font-medium">
                  {item.label}
                </span>

                <span className="text-muted">
                  {format(item.value)}
                  {" / "}
                  {format(item.target)}
                  {" "}
                  {item.unit}
                </span>

              </div>

              <div className="mt-2 flex
                items-center gap-3">

                <div className="h-2.5 flex-1
                  overflow-hidden rounded-full
                  bg-primary/15">

                  <div
                    className="h-full rounded-full
                      bg-primary transition-all"
                    style={{
                      width: `${Math.min(
                        percentage ?? 0,
                        100
                      )}%`
                    }}
                  />

                </div>

                <span className="w-12 text-right
                  text-xs font-medium text-primary">

                  {percentage === null
                    ? "—"
                    : `${percentage}%`}

                </span>

              </div>

              <p className="mt-2 text-xs text-muted">
                {item.metric === "calories"
                  ? "Compared with current calorie target"
                  : `Target reached on ${consistency.achieved}
                     of ${consistency.recorded} recorded days`}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}