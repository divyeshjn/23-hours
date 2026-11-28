import { formatWeekDate } from "../../../utils/week";

export default function CheckInHistory({ checkIns }) {
  const sorted = [...checkIns].sort(
    (a, b) => b.weekDate.localeCompare(a.weekDate)
  );

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">
        Previous check-ins
      </h2>

      {!sorted.length && (
        <div className="rounded-xl border border-dashed
          border-gray-300 p-8 text-center text-gray-500
          dark:border-neutral-700">
          No weekly check-ins recorded yet.
        </div>
      )}

      {sorted.map((item, index) => {
        const previous = sorted[index + 1];

        const change =
          previous && item.weight != null &&
          previous.weight != null
            ? item.weight - previous.weight
            : null;

        return (
          <div
            key={item.weekDate}
            className="rounded-xl border border-gray-200
            p-4 dark:border-neutral-800"
          >
            <p className="mb-4 text-sm text-gray-500">
              Week of {formatWeekDate(item.weekDate)}
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-gray-500">
                  Weight
                </p>

                <p className="text-lg font-semibold">
                  {item.weight ?? "—"} kg
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Waist
                </p>

                <p className="text-lg font-semibold">
                  {item.measurements?.waist ?? "—"} {item.unit}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Weight change
                </p>

                <p className="text-lg font-semibold">
                  {change === null
                    ? "—"
                    : `${change > 0 ? "+" : ""}${change.toFixed(1)} kg`}
                </p>
              </div>
            </div>

            {item.notes && (
              <p className="mt-4 border-t border-gray-200
                pt-3 text-sm text-gray-500
                dark:border-neutral-800">
                {item.notes}
              </p>
            )}
          </div>
        );
      })}
    </section>
  );
}