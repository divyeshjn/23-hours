import { useState } from "react";

import MeasurementInput from "./MeasurementInput";
import { getISTDate } from "../../../utils/week";

const measurements = [
  { name: "chest", label: "Chest" },
  { name: "waist", label: "Waist" },
  { name: "lowerAbdomen", label: "Lower abdomen" },
  { name: "hips", label: "Hips" },
  { name: "leftThigh", label: "Left thigh" },
  { name: "rightThigh", label: "Right thigh" },
  { name: "leftUpperArm", label: "Left upper arm" },
  { name: "rightUpperArm", label: "Right upper arm" },
];

export default function CheckInForm({
  initialData,
  completed,
  onSave,
  saving,
}) {
  const [form, setForm] = useState({
    weight: initialData?.weight ?? "",
    unit: initialData?.unit ?? "in",
    measuredOn:
      initialData?.measuredOn?.slice(0, 10) ??
      getISTDate(),
    notes: initialData?.notes ?? "",
    ...Object.fromEntries(
      measurements.map(({ name }) => [
        name,
        initialData?.measurements?.[name] ?? "",
      ])
    ),
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSaved(false);

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUnitChange = (unit) => {
    if (unit === form.unit) return;

    setSaved(false);

    setForm((previous) => {
      const updated = { ...previous, unit };

      measurements.forEach(({ name }) => {
        if (previous[name] === "") return;

        const value = Number(previous[name]);

        updated[name] = Number(
          (unit === "cm"
            ? value * 2.54
            : value / 2.54
          ).toFixed(2)
        );
      });

      return updated;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      weight: form.weight === "" ? null : Number(form.weight),
      unit: form.unit,
      measuredOn: form.measuredOn,
      notes: form.notes,
      measurements: Object.fromEntries(
        measurements.map(({ name }) => [
          name,
          form[name] === "" ? null : Number(form[name])
        ])
      )
    };

    const success = await onSave(payload);

    setSaved(success);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border
        border-border bg-card p-4 sm:p-6"
    >

      <div>

        <h2 className="text-lg font-heading font-bold text-foreground">
          Body measurements
        </h2>

        <p className="mt-1 text-sm text-muted">
          Record your measurements under similar
          conditions each week.
        </p>

      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <MeasurementInput
          label="Body weight"
          name="weight"
          value={form.weight}
          onChange={handleChange}
          unit="kg"
        />

        <div className="flex flex-col gap-2 min-w-0">

          <label
            htmlFor="measuredOn"
            className="text-sm font-medium text-foreground"
          >
            Measurement date
          </label>

          <input
            id="measuredOn"
            type="date"
            name="measuredOn"
            value={form.measuredOn}
            max={getISTDate()}
            onChange={handleChange}
            required
            className="w-full min-w-0 rounded-xl
              border border-border bg-surface
              px-4 py-3 text-foreground
              outline-none focus:border-primary
              transition-colors"
          />

        </div>

      </div>

      <div className="border-t border-border" />

      <div className="flex flex-wrap items-center
        justify-between gap-3">

        <h3 className="font-heading font-semibold text-foreground">
          Circumference measurements
        </h3>

        <div className="flex rounded-xl border
          border-border bg-surface p-1">

          {["in", "cm"].map((unit) => (

            <button
              key={unit}
              type="button"
              onClick={() => handleUnitChange(unit)}
              aria-pressed={form.unit === unit}
              className={`rounded-lg px-4 py-2
                text-sm font-medium transition-colors ${
                  form.unit === unit
                    ? "bg-primary text-background"
                    : "text-muted hover:text-foreground"
                }`}
            >
              {unit}
            </button>

          ))}

        </div>

      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">

        {measurements.map(({ name, label }) => (

          <MeasurementInput
            key={name}
            label={label}
            name={name}
            value={form[name]}
            onChange={handleChange}
            unit={form.unit}
          />

        ))}

      </div>

      {saved && (

        <div
          role="status"
          className="rounded-xl border
            border-primary/20 bg-primary/10
            px-4 py-3 text-sm text-primary"
        >
          Weekly check-in saved successfully.
        </div>

      )}

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-xl bg-primary
          py-3.5 font-bold text-background
          transition-opacity hover:opacity-90
          disabled:opacity-50"
      >

        {saving
          ? "Saving..."
          : completed
            ? "Update Check-in"
            : "Save Weekly Check-in"}

      </button>

    </form>
  );
}