import {
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from "lucide-react";

export default function PeriodComparison({
  summary,
  previousSummary,
  period
}) {
  if (!previousSummary || period === "all") {
    return null;
  }

  const metrics = [
    {
      label: "Average calories",
      key: "averageCalories",
      unit: "kcal",
      divisor: 1,
      decimals: 0
    },
    {
      label: "Average protein",
      key: "averageProtein",
      unit: "g",
      divisor: 1,
      decimals: 1
    },
    {
      label: "Average water",
      key: "averageWater",
      unit: "L",
      divisor: 1000,
      decimals: 2
    },
    {
      label: "Workouts",
      key: "workoutDays",
      unit: "days",
      divisor: 1,
      decimals: 0
    }
  ];

  return (
    <section className="rounded-2xl border
      border-border bg-card p-4 sm:p-6">

      <h2 className="font-heading font-bold text-lg">
        Period comparison
      </h2>

      <p className="mt-1 text-sm text-muted">
        Compared with the previous {period}
      </p>

      {!previousSummary.loggedDays ? (
        <p className="py-8 text-center
          text-sm text-muted">

          Not enough previous records
          for comparison.

        </p>
      ) : (
        <div className="mt-5 divide-y divide-border">

          {metrics.map(item => {
            const current = summary[item.key];
            const previous = previousSummary[item.key];

            const difference =
              current == null ||
              previous == null ||
              !summary.loggedDays
                ? null
                : Number(
                    ((current - previous) /
                      item.divisor)
                      .toFixed(item.decimals)
                  );

            const Icon =
              difference > 0
                ? ArrowUpRight
                : difference < 0
                  ? ArrowDownRight
                  : Minus;

            return (
              <div
                key={item.key}
                className="flex items-center
                  justify-between gap-3 py-4"
              >

                <div>
                  <p className="text-sm font-medium">
                    {item.label}
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    Previous:{" "}
                    {previous == null
                      ? "—"
                      : `${(
                          previous / item.divisor
                        ).toFixed(item.decimals)} ${item.unit}`}
                  </p>
                </div>

                <div className="flex items-center
                  gap-1 font-heading font-bold
                  text-primary">

                  {difference !== null && (
                    <Icon size={17} />
                  )}

                  {difference === null
                    ? "—"
                    : `${difference > 0 ? "+" : ""}${difference.toFixed(item.decimals)} ${item.unit}`}

                </div>

              </div>
            );
          })}

        </div>
      )}

    </section>
  );
}