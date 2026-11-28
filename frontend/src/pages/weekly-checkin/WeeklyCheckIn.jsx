import { CalendarDays, CheckCircle2, Clock, AlertCircle } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import LoadingState from "../../components/common/LoadingState";

import CheckInForm from "./components/CheckInForm";
import CheckInHistory from "./components/CheckInHistory";

import useWeeklyCheckIn from "./hooks/useWeeklyCheckIn";
import { formatWeekDate } from "../../utils/week";

export default function WeeklyCheckIn() {
  const {
    checkIns,
    currentCheckIn,
    completed,
    weekDate,
    loading,
    saving,
    error,
    save,
    refresh,
  } = useWeeklyCheckIn();

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="Weekly Check-in"
        subtitle="Track your physical progress over time"
      />

      <div className="flex flex-wrap items-center
        justify-between gap-3 rounded-2xl
        border border-border bg-card p-4 sm:p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 shrink-0
            items-center justify-center rounded-xl
            bg-primary/10">

            <CalendarDays
              size={23}
              className="text-primary"
            />

          </div>

          <div>

            <p className="text-xs text-muted">
              Current week
            </p>

            <p className="mt-1 font-heading
              font-bold text-foreground">

              {formatWeekDate(weekDate)}

            </p>

          </div>

        </div>

        <span
          className={`inline-flex items-center gap-1.5
            rounded-full border px-3 py-1.5
            text-xs font-medium ${
              completed
                ? "border-primary/20 bg-primary/10 text-primary"
                : "border-amber-500/20 bg-amber-500/10 text-amber-400"
            }`}
        >

          {completed ? (
            <CheckCircle2 size={14} />
          ) : (
            <Clock size={14} />
          )}

          {completed ? "Completed" : "Pending"}

        </span>

      </div>

      {error && (

        <div
          role="alert"
          className="flex items-start gap-3
            rounded-xl border border-danger/20
            bg-danger/10 p-4 text-sm text-red-400"
        >

          <AlertCircle
            size={19}
            className="mt-0.5 shrink-0"
          />

          <div className="flex-1">

            <p>{error}</p>

            <button
              type="button"
              onClick={refresh}
              className="mt-2 font-semibold underline
                underline-offset-4 hover:text-red-300"
            >
              Retry
            </button>

          </div>

        </div>

      )}

      {currentCheckIn && (

        <CheckInForm
          key={weekDate}
          initialData={currentCheckIn}
          completed={completed}
          onSave={save}
          saving={saving}
        />

      )}

      <CheckInHistory checkIns={checkIns} />

    </div>
  );
}