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
        justify-between gap-3 rounded-xl border
        border-gray-200 p-4 dark:border-neutral-800">

        <div>
          <p className="text-sm text-gray-500">
            Current week
          </p>

          <p className="font-semibold">
            {formatWeekDate(weekDate)}
          </p>
        </div>

        <span className={`rounded-full px-3 py-1 text-xs
          font-medium ${
            completed
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-amber-500/10 text-amber-600"
          }`}>
          {completed ? "Completed" : "Pending"}
        </span>
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10
          p-4 text-sm text-red-500">
          {error}

          <button
            onClick={refresh}
            className="ml-3 underline"
          >
            Retry
          </button>
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