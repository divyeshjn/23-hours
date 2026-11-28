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
      border-gray-200 p-5 dark:border-neutral-800"
    >
      <div>
        <h2 className="text-lg font-semibold">
          Body measurements
        </h2>

        <p className="mt-1 text-sm text-gray-500">
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

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Measurement date
          </label>

          <input
            type="date"
            name="measuredOn"
            value={form.measuredOn}
            max={getISTDate()}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-200
            bg-transparent px-4 py-3
            dark:border-neutral-700"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          Circumference measurements
        </h3>

        <div className="flex rounded-lg border
          border-gray-200 p-1 dark:border-neutral-700">
          {["in", "cm"].map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => handleUnitChange(unit)}
              className={`rounded-md px-4 py-1 text-sm ${
                form.unit === unit
                  ? "bg-emerald-600 text-white"
                  : "text-gray-500"
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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

      <div className="space-y-2">
        {/* <label className="text-sm font-medium">
          Weekly notes
        </label> */}

        {/* <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Strength, recovery, energy,
          digestion, hunger and other observations..."
          className="w-full resize-none rounded-xl border
          border-gray-200 bg-transparent p-4 outline-none
          focus:border-emerald-500 dark:border-neutral-700"
        /> */}
      </div>

      {saved && (
        <p className="text-sm text-emerald-600">
          Weekly check-in saved successfully.
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-xl bg-emerald-600
        py-3 font-medium text-white hover:bg-emerald-700
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