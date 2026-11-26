import { useState, useRef } from "react";

import { X } from "lucide-react";

function HabitModal({
  habit,
  onSave,
  onClose,
  saving
}) {
  const [form, setForm] = useState({
    name: habit?.name || "",
    icon: habit?.icon || "✨",
    category: habit?.category || "food",
    quantity: habit?.quantity || "",
    calories: habit?.calories ?? "",
    protein: habit?.protein ?? "",
    required: habit?.required ?? true
  });

  const busy = useRef(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const disabled = saving || submitting;

  function update(field, value) {
    setForm(previous => ({
      ...previous,
      [field]: value
    }));

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      busy.current ||
      disabled ||
      !form.name.trim()
    ) {
      return;
    }

    busy.current = true;

    setSubmitting(true);
    setError("");

    try {
      const success = await onSave({
        ...form,

        name: form.name.trim(),

        calories: form.category === "activity"
          ? 0
          : form.calories === ""
            ? null
            : Number(form.calories),

        protein: form.category === "activity"
          ? 0
          : form.protein === ""
            ? null
            : Number(form.protein)
      });

      if (!success) {
        setError(
          "Could not save essential. Please retry."
        );
      }

    } catch (err) {
      setError(
        err.message || "Could not save essential."
      );

    } finally {
      busy.current = false;
      setSubmitting(false);
    }
  }

  const inputClass = `
    w-full p-3 border border-border
    rounded-xl outline-none focus:border-sage
    disabled:opacity-50
  `;

  return (
    <div className="fixed inset-0 z-60
      bg-black/30 backdrop-blur-sm
      flex items-end sm:items-center justify-center">

      <div className="bg-white w-full sm:max-w-md
        rounded-t-3xl sm:rounded-3xl p-6
        max-h-[90dvh] overflow-y-auto">

        <div className="flex justify-between
          items-center mb-5">

          <h2 className="text-xl font-bold">
            {habit ? "Edit essential" : "New essential"}
          </h2>

          <button
            type="button"
            onClick={() => {
              if (!busy.current && !disabled) {
                onClose();
              }
            }}
            disabled={disabled}
            aria-label="Close"
            className="disabled:opacity-50"
          >
            <X size={22} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          {/* Icon and name */}

          <div className="flex gap-3">

            <label className="w-20 flex flex-col gap-2 text-sm">

              Icon

              <input
                disabled={disabled}
                value={form.icon}
                onChange={e =>
                  update("icon", e.target.value)
                }
                className={inputClass}
              />

            </label>

            <label className="flex-1 flex flex-col gap-2 text-sm">

              Name

              <input
                disabled={disabled}
                required
                value={form.name}
                onChange={e =>
                  update("name", e.target.value)
                }
                placeholder="Morning fruit"
                className={inputClass}
              />

            </label>

          </div>

          {/* Category */}

          <label className="flex flex-col gap-2 text-sm">

            Category

            <select
              disabled={disabled}
              value={form.category}
              onChange={e =>
                update("category", e.target.value)
              }
              className={inputClass}
            >
              <option value="food">
                Food
              </option>

              <option value="supplement">
                Supplement
              </option>

              <option value="activity">
                Activity
              </option>
            </select>

          </label>

          {/* Quantity */}

          <label className="flex flex-col gap-2 text-sm">

            Quantity or description

            <input
              disabled={disabled}
              value={form.quantity}
              onChange={e =>
                update("quantity", e.target.value)
              }
              placeholder="1 serving"
              className={inputClass}
            />

          </label>

          {/* Nutritional information */}

          {form.category !== "activity" && (
            <>
              <div className="grid grid-cols-2 gap-3">

                <label className="flex flex-col gap-2 text-sm">

                  Calories

                  <input
                    disabled={disabled}
                    type="number"
                    min="0"
                    step="any"
                    value={form.calories}
                    onChange={e =>
                      update("calories", e.target.value)
                    }
                    className={inputClass}
                  />

                </label>

                <label className="flex flex-col gap-2 text-sm">

                  Protein (g)

                  <input
                    disabled={disabled}
                    type="number"
                    min="0"
                    step="any"
                    value={form.protein}
                    onChange={e =>
                      update("protein", e.target.value)
                    }
                    className={inputClass}
                  />

                </label>

              </div>

              <p className="text-xs text-muted">
                Leave unknown nutritional values blank.
              </p>
            </>
          )}

          {/* Required or optional habit */}

          <label className="flex items-center gap-3 text-sm">

            <input
              disabled={disabled}
              type="checkbox"
              checked={form.required}
              onChange={e =>
                update("required", e.target.checked)
              }
              className="w-5 h-5 accent-primary"
            />

            Include in daily goals

          </label>

          {/* Error message */}

          {error && (
            <p
              role="alert"
              className="text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Submit button */}

          <button
            disabled={disabled}
            type="submit"
            className="bg-primary text-white
              py-3.5 rounded-xl font-semibold
              disabled:opacity-50"
          >
            {disabled
              ? "Please wait..."
              : "Save essential"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default HabitModal;