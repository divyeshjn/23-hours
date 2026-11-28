import {
  Flame,
  Beef,
  Sparkles,
  Trash2,
  ArrowLeft
} from "lucide-react";

export default function NutritionEntryForm({
  requireName=false,
  name="",
  setName,
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
    (!requireName || name.trim() !== "") &&
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
          gap-3 bg-primary/10 rounded-xl p-3">

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

      {requireName && (
        <label className="flex flex-col gap-2">

          <span className="text-sm font-semibold">
            Food name
          </span>

          <input
            type="text"
            value={name}
            onChange={event =>
              setName(event.target.value)
            }
            placeholder="e.g. Banana, coffee, sandwich"
            maxLength={100}
            required
            disabled={busy}
            className="w-full rounded-xl
              border border-border bg-background
              px-4 py-3 outline-none
              focus:border-primary
              transition-colors"
          />

        </label>
      )}

      <div className="grid grid-cols-2 gap-3">

        <label className="flex flex-col
          gap-3 rounded-2xl bg-surface
          border border-border p-4">

          <Flame
            size={25}
            className="text-primary"
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
          gap-3 rounded-2xl bg-surface
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
          className="text-sm text-red-400"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy || !valid}
        className="bg-primary text-background
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
            justify-center gap-2 text-red-400
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