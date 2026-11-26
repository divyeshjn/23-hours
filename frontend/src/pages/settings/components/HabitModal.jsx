import { useState } from "react";
import { X } from "lucide-react";

function HabitModal({ habit, onSave, onClose }) {
  const [form, setForm] = useState({
    name: habit?.name || "",
    icon: habit?.icon || "✨",
    category: habit?.category || "food",
    quantity: habit?.quantity || "",
    calories: habit?.calories ?? "",
    protein: habit?.protein ?? "",
    required: habit?.required ?? true
  });

  function update(field, value) {
    setForm(previous => ({
      ...previous,
      [field]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) return;

    onSave({
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
  }

  const inputClass = `w-full p-3 border border-border
    rounded-xl outline-none focus:border-sage`;

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
            onClick={onClose}
            aria-label="Close"
          >
            <X size={22} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          <div className="flex gap-3">

            <label className="w-20 flex flex-col gap-2 text-sm">
              Icon

              <input
                value={form.icon}
                onChange={e => update("icon", e.target.value)}
                className={inputClass}
              />
            </label>

            <label className="flex-1 flex flex-col gap-2 text-sm">
              Name

              <input
                required
                value={form.name}
                onChange={e => update("name", e.target.value)}
                placeholder="Morning fruit"
                className={inputClass}
              />
            </label>

          </div>

          <label className="flex flex-col gap-2 text-sm">
            Category

            <select
              value={form.category}
              onChange={e => update("category", e.target.value)}
              className={inputClass}
            >
              <option value="food">Food</option>
              <option value="supplement">Supplement</option>
              <option value="activity">Activity</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Quantity or description

            <input
              value={form.quantity}
              onChange={e => update("quantity", e.target.value)}
              placeholder="1 serving"
              className={inputClass}
            />
          </label>

          {form.category !== "activity" && (
            <>
              <div className="grid grid-cols-2 gap-3">

                <label className="flex flex-col gap-2 text-sm">
                  Calories

                  <input
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

          <label className="flex items-center gap-3 text-sm">

            <input
              type="checkbox"
              checked={form.required}
              onChange={e =>
                update("required", e.target.checked)
              }
              className="w-5 h-5 accent-primary"
            />

            Include in daily goals

          </label>

          <button
            type="submit"
            className="bg-primary text-white
              py-3.5 rounded-xl font-semibold"
          >
            Save essential
          </button>

        </form>

      </div>
    </div>
  );
}

export default HabitModal;