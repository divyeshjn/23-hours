import {
  ChevronLeft,
  ChevronRight,
  CalendarDays
} from "lucide-react";

import {
  formatMonth,
  getCalendarDays
} from "../../../utils/history";

const WEEKDAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

export default function HistoryCalendar({
  month,
  today,
  selectedDate,
  recordedDates,
  isCurrentMonth,
  onSelectDate,
  onPreviousMonth,
  onNextMonth,
  onToday
}) {
  const days = getCalendarDays(month);

  return (
    <section className="rounded-2xl border
      border-border bg-card p-4 sm:p-6">

      {/* Calendar header */}

      <div className="flex items-center
        justify-between gap-3">

        <button
          type="button"
          onClick={onPreviousMonth}
          aria-label="Previous month"
          className="rounded-xl border
            border-border p-2 text-primary
            hover:bg-background"
        >
          <ChevronLeft size={20} />
        </button>

        <h2 className="font-heading
          font-bold text-lg text-primary">

          {formatMonth(month)}

        </h2>

        <button
          type="button"
          onClick={onNextMonth}
          disabled={isCurrentMonth}
          aria-label="Next month"
          className="rounded-xl border
            border-border p-2 text-primary
            hover:bg-background
            disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>

      </div>

      {/* Weekdays */}

      <div className="mt-6 grid
        grid-cols-7 gap-1 sm:gap-2">

        {WEEKDAYS.map(day => (
          <div
            key={day}
            className="py-2 text-center
              text-xs font-medium text-muted"
          >
            {day}
          </div>
        ))}

        {/* Calendar dates */}

        {days.map((item, index) => {
          if (!item) {
            return (
              <div key={`empty-${index}`} />
            );
          }

          const isSelected =
            selectedDate === item.date;

          const isToday =
            today === item.date;

          const isFuture =
            item.date > today;

          const isRecorded =
            recordedDates.has(item.date);

          return (
            <button
              key={item.date}
              type="button"
              disabled={isFuture}
              onClick={() =>
                onSelectDate(item.date)
              }
              aria-pressed={isSelected}
              aria-label={`${item.date}${
                isRecorded ? ", recorded" : ""
              }`}
              className={`relative flex
                min-h-11 sm:min-h-14
                flex-col items-center
                justify-center gap-1
                rounded-xl text-sm font-medium
                transition-colors

                ${
                  isSelected
                    ? "bg-primary text-background"
                    : isFuture
                      ? "text-muted/40 cursor-not-allowed"
                      : isRecorded
                        ? "bg-sage/25 text-primary"
                        : "text-primary hover:bg-background"
                }

                ${
                  isToday && !isSelected
                    ? "ring-1 ring-primary"
                    : ""
                }
              `}
            >

              {item.day}

              {isRecorded && (
                <span
                  className={`h-1.5 w-1.5
                    rounded-full
                    ${
                      isSelected
                        ? "bg-background"
                        : "bg-primary"
                    }`}
                />
              )}

            </button>
          );
        })}

      </div>

      {/* Legend */}

      <div className="mt-5 flex flex-wrap
        items-center justify-center
        gap-x-5 gap-y-2 text-xs text-muted">

        <span className="flex items-center gap-2">
          <span className="h-3 w-3
            rounded bg-sage/40" />
          Recorded
        </span>

        <span className="flex items-center gap-2">
          <span className="h-3 w-3
            rounded bg-primary" />
          Selected
        </span>

        <span className="flex items-center gap-2">
          <span className="h-3 w-3
            rounded border border-primary" />
          Today
        </span>

      </div>

      {/* Return to today */}

      <button
        type="button"
        onClick={onToday}
        className="mx-auto mt-5 flex
          items-center justify-center gap-2
          text-sm font-medium text-primary"
      >
        <CalendarDays size={16} />
        Go to today
      </button>

    </section>
  );
}