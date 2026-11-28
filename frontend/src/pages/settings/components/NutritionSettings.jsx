import { useState, useRef } from "react";

import {
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  Save
} from "lucide-react";

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

      <div className="mb-6">

        <h2 className="font-heading text-lg
          font-bold text-foreground">

          Daily targets

        </h2>

        <p className="mt-1 text-xs text-muted">
          Manage your daily nutrition and hydration goals
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >

        {fields.map(field => (

          <label
            key={field.key}
            className="flex items-center
              justify-between gap-3
              rounded-xl border border-border
              bg-surface/50 p-3 sm:p-4"
          >

            <span className="text-sm font-medium
              text-foreground">

              {field.label}

            </span>

            <div className="flex shrink-0
              items-center gap-2">

              <input
                disabled={saving}
                required
                type="number"
                min="1"
                step="any"
                inputMode="decimal"
                value={form[field.key]}
                onChange={e => {
                  setForm(previous => ({
                    ...previous,
                    [field.key]: e.target.value
                  }));

                  setSaved(false);
                  setError("");
                }}
                className="w-24 sm:w-32
                  rounded-xl border border-border
                  bg-surface px-3 py-3
                  text-right font-semibold
                  tabular-nums text-foreground
                  outline-none transition-colors
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/10
                  disabled:opacity-50
                  [appearance:textfield]
                  [&::-webkit-inner-spin-button]:appearance-none
                  [&::-webkit-outer-spin-button]:appearance-none"
              />

              <span className="w-8 text-xs
                font-medium text-muted">

                {field.unit}

              </span>

            </div>

          </label>

        ))}

        {error && (

          <div
            role="alert"
            className="flex items-start gap-2
              rounded-xl border border-danger/20
              bg-danger/10 p-3
              text-sm text-red-400"
          >

            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>

          </div>

        )}

        {saved && !error && (

          <div
            role="status"
            className="flex items-center gap-2
              rounded-xl border border-primary/20
              bg-primary/10 p-3
              text-sm text-primary"
          >

            <CheckCircle2
              size={18}
              className="shrink-0"
            />

            Your daily targets have been updated.

          </div>

        )}

        <button
          disabled={saving}
          type="submit"
          className="mt-2 flex w-full
            items-center justify-center gap-2
            rounded-xl bg-primary px-4 py-3.5
            text-sm font-bold text-background
            transition-opacity hover:opacity-90
            disabled:opacity-50"
        >

          {saving ? (

            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />

              Please wait...
            </>

          ) : saved ? (

            <>
              <CheckCircle2 size={18} />

              Targets saved
            </>

          ) : (

            <>
              <Save size={18} />

              Save targets
            </>

          )}

        </button>

      </form>

    </Card>
  );
}

export default NutritionSettings;