import { useState } from "react";
import { X, Trash2 } from "lucide-react";

function MealModal({
  meal,
  entry,
  onClose,
  onSave,
  onDelete
}) {
  const [description, setDescription] = useState(
    entry?.description || ""
  );

  const [calories, setCalories] = useState(
    entry?.calories ?? ""
  );

  const [protein, setProtein] = useState(
    entry?.protein ?? ""
  );

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      description: description.trim(),
      calories: Number(calories),
      protein: Number(protein)
    });
  }

  return (
    <div className="fixed inset-0 z-60
      bg-black/30 backdrop-blur-sm
      flex items-end sm:items-center
      justify-center">

      <div className="bg-white w-full sm:max-w-md
        rounded-t-3xl sm:rounded-3xl p-6
        max-h-[90dvh] overflow-y-auto">

        <div className="flex items-center
          justify-between mb-6">

          <h2 className="text-xl font-heading font-bold">
            {entry ? "Edit" : "Log"} {meal.label}
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

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              What did you eat?
            </span>

            <textarea
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe your meal..."
              className="border border-border rounded-xl
                p-3 min-h-24 outline-none
                focus:border-sage resize-none"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">
                Calories (kcal)
              </span>

              <input
                required
                type="number"
                min="0"
                step="any"
                value={calories}
                onChange={e => setCalories(e.target.value)}
                className="border border-border rounded-xl
                  p-3 w-full outline-none focus:border-sage"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">
                Protein (g)
              </span>

              <input
                required
                type="number"
                min="0"
                step="any"
                value={protein}
                onChange={e => setProtein(e.target.value)}
                className="border border-border rounded-xl
                  p-3 w-full outline-none focus:border-sage"
              />
            </label>

          </div>

          <button
            type="submit"
            disabled={!description.trim()}
            className="bg-primary text-white
              rounded-xl py-3.5 font-semibold
              disabled:opacity-50"
          >
            Save meal
          </button>

          {entry && (
            <button
              type="button"
              onClick={onDelete}
              className="flex items-center justify-center
                gap-2 text-red-500 text-sm py-2"
            >
              <Trash2 size={16} />
              Delete meal
            </button>
          )}

        </form>

      </div>
    </div>
  );
}

export default MealModal;
