import {
  Flame,
  Beef,
  Sparkles,
  Trash2,
  ArrowLeft
} from "lucide-react";

export default function NutritionEntryForm({
  calories,
  protein,
  setCalories,
  setProtein,
  estimated,
  busy,
  error,
  editing,
  onSubmit,
  onDelete,
  onBack
}) {
  const valid =
    String(calories).trim() !== "" &&
    String(protein).trim() !== "" &&
    Number.isFinite(Number(calories)) &&
    Number.isFinite(Number(protein)) &&
    Number(calories) >= 0 &&
    Number(protein) >= 0;

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        if (valid && !busy) {
          onSubmit();
        }
      }}
      className="flex flex-col gap-4"
    >

      {estimated && (

        <div className="flex items-start
          gap-3 bg-sage/15 rounded-xl p-3">

          <Sparkles
            size={20}
            className="text-primary shrink-0"
          />

          <div>

            <p className="text-sm font-semibold">
              AI estimation complete
            </p>

            <p className="text-xs text-muted mt-1">
              Review the estimated values
              before saving.
            </p>

          </div>

        </div>

      )}

      <div className="grid grid-cols-2 gap-3">

        <label className="flex flex-col
          gap-3 rounded-2xl bg-background
          border border-border p-4">

          <Flame
            size={25}
            className="text-[#CB906D]"
          />

          <span className="text-xs font-medium">
            Calories (kcal)
          </span>

          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            required
            disabled={busy}
            value={calories}
            onChange={event =>
              setCalories(event.target.value)
            }
            placeholder="0"
            className="w-full bg-transparent
              outline-none text-2xl
              font-heading font-bold
              text-primary"
          />

        </label>

        <label className="flex flex-col
          gap-3 rounded-2xl bg-background
          border border-border p-4">

          <Beef
            size={25}
            className="text-primary"
          />

          <span className="text-xs font-medium">
            Protein (g)
          </span>

          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            required
            disabled={busy}
            value={protein}
            onChange={event =>
              setProtein(event.target.value)
            }
            placeholder="0"
            className="w-full bg-transparent
              outline-none text-2xl
              font-heading font-bold
              text-primary"
          />

        </label>

      </div>

      {error && (
        <p
          role="alert"
          className="text-sm text-red-600"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy || !valid}
        className="bg-primary text-white
          rounded-xl py-3.5 font-semibold
          disabled:opacity-50"
      >

        {busy
          ? "Please wait..."
          : editing
            ? "Update entry"
            : "Save entry"}

      </button>

      {editing && (

        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          className="flex items-center
            justify-center gap-2 text-red-500
            text-sm py-2"
        >

          <Trash2 size={16} />

          Delete entry

        </button>

      )}

      {!editing && (

        <button
          type="button"
          onClick={onBack}
          disabled={busy}
          className="flex items-center
            justify-center gap-2 text-muted
            text-sm py-2"
        >

          <ArrowLeft size={16} />

          Back

        </button>

      )}

    </form>
  );
}