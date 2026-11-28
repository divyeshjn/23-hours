export default function MeasurementInput({
  label,
  name,
  value,
  onChange,
  unit,
  required = false,
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">

      <label
        htmlFor={name}
        className="text-sm font-medium text-foreground"
      >
        {label}

        {required && (
          <span className="text-red-400"> *</span>
        )}

      </label>

      <div className="relative">

        <input
          id={name}
          name={name}
          type="number"
          inputMode="decimal"
          min="0.1"
          step="0.1"
          value={value ?? ""}
          onChange={onChange}
          required={required}
          placeholder="0.0"
          className="w-full min-w-0 rounded-xl
            border border-border bg-surface
            px-4 py-3 pr-12
            text-foreground
            placeholder:text-muted/60
            outline-none
            focus:border-primary
            focus:ring-2 focus:ring-primary/10
            transition-all duration-200
            appearance:textfield
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
            [appearance:textfield]"
        />

        <span className="pointer-events-none absolute
          right-4 top-1/2 -translate-y-1/2
          text-sm font-medium text-muted">
          {unit}
        </span>

      </div>

    </div>
  );
}