export default function MeasurementInput({
  label,
  name,
  value,
  onChange,
  unit,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium"
      >
        {label}
        {required && (
          <span className="text-red-500"> *</span>
        )}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type="number"
          min="0.1"
          step="0.1"
          value={value ?? ""}
          onChange={onChange}
          required={required}
          placeholder="0.0"
          className="w-full rounded-xl border border-gray-200
          bg-transparent px-4 py-3 pr-14 outline-none
          focus:border-emerald-500 dark:border-neutral-700"
        />

        <span className="absolute right-4 top-1/2
          -translate-y-1/2 text-sm text-gray-500">
          {unit}
        </span>
      </div>
    </div>
  );
}