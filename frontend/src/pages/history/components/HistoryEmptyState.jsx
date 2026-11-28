import {
  CalendarDays,
  Plus
} from "lucide-react";

export default function HistoryEmptyState({
  onAddRecord
}) {
  return (
    <section className="rounded-2xl border
      border-border bg-card p-8 text-center">

      <div className="mx-auto flex h-16 w-16
        items-center justify-center
        rounded-2xl bg-primary/10">

        <CalendarDays
          size={30}
          className="text-primary"
        />

      </div>

      <h2 className="mt-5 font-heading
        text-xl font-bold text-primary">

        No records for this day

      </h2>

      <p className="mt-2 text-sm text-muted">

        You haven't recorded any meals, water,
        essentials or workouts for this date.

      </p>

      <button
        type="button"
        onClick={onAddRecord}
        className="mx-auto mt-6 inline-flex
          items-center justify-center gap-2
          rounded-xl bg-primary px-5 py-3
          text-sm font-medium text-background"
      >

        <Plus size={18} />

        Add daily record

      </button>

    </section>
  );
}