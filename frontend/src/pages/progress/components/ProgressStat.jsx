export default function ProgressStat({
  label,
  value,
  unit,
  icon: Icon
}) {
  const hasValue =
    value !== null && value !== undefined;

  return (
    <div className="min-w-0 rounded-2xl
      border border-border bg-card
      p-4 sm:p-5">

      <div className="flex items-center
        justify-between gap-2">

        <p className="text-xs font-medium
          text-muted sm:text-sm">
          {label}
        </p>

        {Icon && (

          <div className="flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-xl bg-primary/10">

            <Icon
              size={18}
              className="text-primary"
            />

          </div>

        )}

      </div>

      <div className="mt-3 flex flex-wrap
        items-baseline gap-1.5">

        <span className={`break-words font-heading
          text-2xl font-bold tabular-nums
          sm:text-3xl ${
            hasValue
              ? "text-foreground"
              : "text-muted"
          }`}>

          {value ?? "—"}

        </span>

        {hasValue && unit && (

          <span className="text-xs font-medium
            text-muted sm:text-sm">
            {unit}
          </span>

        )}

      </div>

    </div>
  );
}