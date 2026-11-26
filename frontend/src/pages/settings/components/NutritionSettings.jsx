import { useState, useRef } from "react";

import Card from "../../../components/common/Card";

function NutritionSettings({ targets, onSave, saving }) {
  const [form, setForm] = useState({
    ...targets
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const busy = useRef(false);

  const fields = [
    {
      key: "calories",
      label: "Daily calories",
      unit: "kcal"
    },
    {
      key: "protein",
      label: "Daily protein",
      unit: "g"
    },
    {
      key: "water",
      label: "Daily water",
      unit: "ml"
    }
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    if (busy.current || saving) return;

    const updated = {
      calories: Number(form.calories),
      protein: Number(form.protein),
      water: Number(form.water)
    };

    if (
      Object.values(updated).some(
        value => !Number.isFinite(value) || value <= 0
      )
    ) {
      setError("Please enter valid positive targets.");
      return;
    }

    busy.current = true;

    setSaved(false);
    setError("");

    try {
      const success = await onSave(updated);

      setSaved(success === true);

      if (!success) {
        setError(
          "Targets could not be saved. Please retry."
        );
      }

    } catch (err) {
      setError(
        err.message || "Unable to save targets."
      );

    } finally {
      busy.current = false;
    }
  }

  return (
    <Card>

      <h2 className="text-lg font-bold mb-5">
        Daily targets
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >

        {fields.map(field => (
          <label
            key={field.key}
            className="flex items-center
              justify-between gap-3"
          >

            <span className="text-sm font-medium">
              {field.label}
            </span>

            <div className="flex items-center gap-2">

              <input
                disabled={saving}
                required
                type="number"
                min="1"
                step="any"
                value={form[field.key]}
                onChange={e => {
                  setForm(previous => ({
                    ...previous,
                    [field.key]: e.target.value
                  }));

                  setSaved(false);
                  setError("");
                }}
                className="w-24 sm:w-32 p-2.5
                  rounded-xl border border-border
                  outline-none focus:border-sage
                  disabled:opacity-50"
              />

              <span className="text-xs text-muted w-8">
                {field.unit}
              </span>

            </div>

          </label>
        ))}

        {error && (
          <p
            role="alert"
            className="text-sm text-red-600"
          >
            {error}
          </p>
        )}

        <button
          disabled={saving}
          type="submit"
          className="bg-primary text-white
            rounded-xl py-3 font-semibold mt-2
            disabled:opacity-50"
        >
          {saving
            ? "Please wait..."
            : saved
              ? "Targets saved"
              : "Save targets"}
        </button>

      </form>

    </Card>
  );
}

export default NutritionSettings;