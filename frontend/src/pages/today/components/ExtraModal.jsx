import { useState, useRef } from "react";
import { X, Trash2 } from "lucide-react";

function ExtraModal({
  entry,
  onSave,
  onDelete,
  onClose
}) {
  const [name, setName] = useState(
    entry?.name || ""
  );

  const [quantity, setQuantity] = useState(
    entry?.quantity || ""
  );

  const [calories, setCalories] = useState(
    entry?.calories ?? ""
  );

  const [protein, setProtein] = useState(
    entry?.protein ?? ""
  );

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const lock = useRef(false);

  async function run(operation) {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      if (!(await operation())) {
        setError("Could not save changes. Check your connection and try again.");
      }
    } catch (err) {
      setError(err.message || "Request failed.");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    run(() => onSave({
      id: entry?.id,
      name: name.trim(),
      quantity: quantity.trim(),
      calories: Number(calories),
      protein: Number(protein)
    }));
  }

  return (
    <div className="fixed inset-0 z-60
      bg-black/30 backdrop-blur-sm
      flex items-end sm:items-center justify-center">

      <div className="bg-white w-full sm:max-w-md
        rounded-t-3xl sm:rounded-3xl p-6
        max-h-[90dvh] overflow-y-auto">

        <div className="flex items-center
          justify-between mb-5">

          <h2 className="text-xl font-bold">
            {entry ? "Edit extra food" : "Add extra food"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            aria-label="Close"
          >
            <X size={22} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          <label className="flex flex-col gap-2 text-sm">
            Food name

            <input
              disabled={busy}
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Apple, makhana, coffee..."
              className="p-3 border border-border
                rounded-xl outline-none focus:border-sage"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Quantity

            <input
              disabled={busy}
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              placeholder="1 medium apple"
              className="p-3 border border-border
                rounded-xl outline-none focus:border-sage"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">

            <label className="flex flex-col gap-2 text-sm">
              Calories (kcal)

              <input
                disabled={busy}
              required
                type="number"
                min="0"
                step="any"
                value={calories}
                onChange={e => setCalories(e.target.value)}
                className="w-full p-3 border
                  border-border rounded-xl outline-none"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              Protein (g)

              <input
                disabled={busy}
              required
                type="number"
                min="0"
                step="any"
                value={protein}
                onChange={e => setProtein(e.target.value)}
                className="w-full p-3 border
                  border-border rounded-xl outline-none"
              />
            </label>

          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={busy || !name.trim()}
            className="bg-primary text-white
              rounded-xl py-3.5 font-semibold"
          >
            {busy ? "Please wait..." : "Save food"}
          </button>

          {entry && (
            <button
              type="button"
              onClick={() => run(onDelete)}
              disabled={busy}
              className="flex justify-center items-center
                gap-2 text-red-500 text-sm"
            >
              <Trash2 size={16} />
              Delete food
            </button>
          )}

        </form>

      </div>
    </div>
  );
}

export default ExtraModal;