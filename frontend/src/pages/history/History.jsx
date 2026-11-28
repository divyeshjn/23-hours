import { useState } from "react";

import {
  Pencil,
  X,
  CalendarDays
} from "lucide-react";

import PageHeader
  from "../../components/common/PageHeader";

import LoadingState
  from "../../components/common/LoadingState";

import ErrorState
  from "../../components/common/ErrorState";

import HistoryCalendar
  from "./components/HistoryCalendar";

import HistoryDaySummary
  from "./components/HistoryDaySummary";

import HistoryEmptyState
  from "./components/HistoryEmptyState";

import useHistory
  from "./hooks/useHistory";

import {
  DailyDashboard
} from "../today/Today";

import {
  getFormattedDate
} from "../../utils/date";

function History() {
  const [editing, setEditing] = useState(false);

  const {
    month,
    today,
    selectedDate,

    recordedDates,
    summary,
    hasData,

    isCurrentMonth,

    selectDate,
    previousMonth,
    nextMonth,
    goToToday,

    loading,
    error,

    updateLocalLog,
    refresh
  } = useHistory();

  function handleSelectDate(date) {
    setEditing(false);
    selectDate(date);
  }

  function handleToday() {
    setEditing(false);
    goToToday();
  }

  return (
    <div className="min-w-0">

      <PageHeader
        title="History"
        subtitle="Your daily nutrition journey"
      />

      {loading ? (

        <LoadingState
          message="Loading your history..."
        />

      ) : error ? (

        <ErrorState
          message={error}
          onRetry={refresh}
        />

      ) : (

        <div className="min-w-0 space-y-5 sm:space-y-6">

          {/* Calendar */}

          <HistoryCalendar
            month={month}
            today={today}
            selectedDate={selectedDate}
            recordedDates={recordedDates}
            isCurrentMonth={isCurrentMonth}
            onSelectDate={handleSelectDate}
            onPreviousMonth={previousMonth}
            onNextMonth={nextMonth}
            onToday={handleToday}
          />

          {/* Selected date */}

          <div className="flex flex-wrap items-center
            justify-between gap-3 rounded-2xl
            border border-border bg-card p-4">

            <div className="flex min-w-0
              items-center gap-3">

              <div className="flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl bg-primary/10">

                <CalendarDays
                  size={20}
                  className="text-primary"
                />

              </div>

              <div className="min-w-0">

                <p className="text-xs text-muted">
                  Selected date
                </p>

                <h2 className="mt-0.5 font-heading
                  text-base font-bold text-foreground
                  sm:text-lg">

                  {getFormattedDate(selectedDate)}

                  {", "}

                  {selectedDate.slice(0, 4)}

                </h2>

              </div>

            </div>

            {(hasData || editing) && (

              <button
                type="button"
                aria-pressed={editing}
                onClick={() =>
                  setEditing(previous => !previous)
                }
                className={`inline-flex shrink-0
                  items-center justify-center gap-2
                  rounded-xl border px-4 py-2.5
                  text-sm font-semibold
                  transition-colors ${
                    editing
                      ? "border-border bg-surface text-muted hover:text-foreground"
                      : "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
              >

                {editing ? (
                  <>
                    <X size={16} />
                    Close
                  </>
                ) : (
                  <>
                    <Pencil size={16} />
                    View / Edit
                  </>
                )}

              </button>

            )}

          </div>

          {/* Daily summary */}

          {hasData && !editing && (

            <HistoryDaySummary
              summary={summary}
            />

          )}

          {/* Empty state */}

          {!hasData && !editing && (

            <HistoryEmptyState
              onAddRecord={() =>
                setEditing(true)
              }
            />

          )}

          {/* Full daily record */}

          {editing && (

            <DailyDashboard
              key={selectedDate}
              date={selectedDate}
              isHistory={true}
              onLogUpdated={updateLocalLog}
            />

          )}

        </div>

      )}

    </div>
  );
}

export default History;