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
    <>

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

        <div className="space-y-6">

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

          <div className="flex flex-wrap
            items-center justify-between gap-3">

            <div className="flex items-center gap-2">

              <CalendarDays
                size={20}
                className="text-primary"
              />

              <h2 className="font-heading
                font-bold text-lg text-primary">

                {getFormattedDate(selectedDate)}

                {", "}

                {selectedDate.slice(0, 4)}

              </h2>

            </div>

            {(hasData || editing) && (

              <button
                type="button"
                onClick={() =>
                  setEditing(previous => !previous)
                }
                className="flex items-center gap-2
                  rounded-xl border border-border
                  bg-card px-3 py-2
                  text-sm font-medium text-primary"
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

    </>
  );
}

export default History;