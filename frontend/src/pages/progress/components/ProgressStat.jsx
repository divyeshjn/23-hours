export default function ProgressStat({
  label,
  value,
  unit,
  icon: Icon
}) {

  return (

    <div className="min-w-0 rounded-2xl border
      border-border bg-card p-4">

      <div className="flex items-center
        justify-between gap-2">

        <p className="text-xs sm:text-sm text-muted">
          {label}
        </p>

        {Icon && (
          <Icon
            size={17}
            className="shrink-0 text-primary"
          />
        )}

      </div>

      <div className="mt-3 flex flex-wrap
        items-baseline gap-1">

        <span className="text-2xl sm:text-3xl
          font-heading font-bold text-primary">

          {value ?? "—"}

        </span>

        {value !== null &&
          value !== undefined &&
          unit && (

          <span className="text-sm text-muted">
            {unit}
          </span>

        )}

      </div>

    </div>

  );
}