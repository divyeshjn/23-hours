import { CalendarDays } from "lucide-react";

import { formatWeekDate } from "../../../utils/week";

export default function CheckInHistory({ checkIns }) {
  const sorted = [...checkIns].sort(
    (a, b) => b.weekDate.localeCompare(a.weekDate)
  );

  return (
    <section className="space-y-4">

      <div className="flex items-center gap-2">

        <CalendarDays
          size={20}
          className="text-primary"
        />

        <h2 className="text-lg font-heading font-bold text-foreground">
          Previous check-ins
        </h2>

      </div>

      {!sorted.length && (

        <div className="rounded-2xl border border-dashed
          border-border bg-card p-8 text-center">

          <CalendarDays
            size={32}
            className="mx-auto mb-3 text-muted"
          />

          <p className="text-sm text-muted">
            No weekly check-ins recorded yet.
          </p>

        </div>

      )}

      {sorted.map((item, index) => {
        const previous = sorted[index + 1];

        const change =
          previous &&
          item.weight != null &&
          previous.weight != null
            ? item.weight - previous.weight
            : null;

        return (
          <div
            key={item.weekDate}
            className="rounded-2xl border border-border
              bg-card p-4 sm:p-5"
          >

            <div className="mb-4 flex items-center
              justify-between gap-3">

              <p className="text-sm font-semibold text-foreground">
                Week of {formatWeekDate(item.weekDate)}
              </p>

              {index === 0 && (

                <span className="rounded-full bg-primary/10
                  px-3 py-1 text-xs font-medium text-primary">
                  Latest
                </span>

              )}

            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">

              <div className="min-w-0 rounded-xl border
                border-border bg-surface p-3">

                <p className="text-xs text-muted">
                  Weight
                </p>

                <p className="mt-2 text-base sm:text-lg
                  font-heading font-bold text-foreground">

                  {item.weight ?? "—"}

                  {item.weight != null && (
                    <span className="ml-1 text-xs
                      font-medium text-muted">
                      kg
                    </span>
                  )}

                </p>

              </div>

              <div className="min-w-0 rounded-xl border
                border-border bg-surface p-3">

                <p className="text-xs text-muted">
                  Waist
                </p>

                <p className="mt-2 text-base sm:text-lg
                  font-heading font-bold text-foreground">

                  {item.measurements?.waist ?? "—"}

                  {item.measurements?.waist != null && (
                    <span className="ml-1 text-xs
                      font-medium text-muted">
                      {item.unit}
                    </span>
                  )}

                </p>

              </div>

              <div className="min-w-0 rounded-xl border
                border-border bg-surface p-3">

                <p className="text-xs text-muted">
                  Weight change
                </p>

                <p className="mt-2 text-base sm:text-lg
                  font-heading font-bold text-foreground">

                  {change === null
                    ? "—"
                    : `${change > 0 ? "+" : ""}${change.toFixed(1)}`}

                  {change !== null && (
                    <span className="ml-1 text-xs
                      font-medium text-muted">
                      kg
                    </span>
                  )}

                </p>

              </div>

            </div>

            {item.notes && (

              <p className="mt-4 border-t border-border
                pt-3 text-sm leading-relaxed text-muted">

                {item.notes}

              </p>

            )}

          </div>
        );
      })}

    </section>
  );
}