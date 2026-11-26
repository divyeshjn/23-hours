import { useState, useRef } from "react";

import { Plus, Pencil, Trash2 } from "lucide-react";

import Card from "../../../components/common/Card";
import HabitModal from "./HabitModal";

function HabitManager({
  habits,
  onAdd,
  onUpdate,
  onDelete,
  saving
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const busy = useRef(false);

  const [deleteError, setDeleteError] = useState("");

  function openModal(habit = null) {
    if (saving || busy.current) return;

    setSelected(habit);
    setModalOpen(true);
  }

  function closeModal() {
    setSelected(null);
    setModalOpen(false);
  }

  async function handleSave(habit) {
    const success = selected
      ? await onUpdate(selected.id, habit)
      : await onAdd(habit);

    if (success) {
      closeModal();
    }

    return success;
  }

  async function handleDelete(habit) {
    if (saving || busy.current) return;

    const confirmed = window.confirm(
      `Remove ${habit.name} from daily essentials?`
    );

    if (!confirmed) return;

    busy.current = true;

    setDeleteError("");

    try {
      const success = await onDelete(habit.id);

      if (!success) {
        setDeleteError(
          "Could not delete essential. Please retry."
        );
      }

    } catch (err) {
      setDeleteError(
        err.message || "Could not delete essential."
      );

    } finally {
      busy.current = false;
    }
  }

  return (
    <>
      <Card>

        <div className="flex items-center
          justify-between mb-5">

          <div>
            <h2 className="text-lg font-bold">
              Daily essentials
            </h2>

            <p className="text-xs text-muted mt-1">
              Manage your recurring habits
            </p>
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={() => openModal()}
            className="bg-primary text-white
              p-2.5 rounded-xl disabled:opacity-50"
            aria-label="Add essential"
          >
            <Plus size={20} />
          </button>

        </div>

        {deleteError && (
          <p
            role="alert"
            className="text-sm text-red-600 mb-3"
          >
            {deleteError}
          </p>
        )}

        {habits.length === 0 && (
          <div className="py-6 text-center">

            <p className="text-sm text-muted">
              No daily essentials added yet.
            </p>

            <button
              type="button"
              disabled={saving}
              onClick={() => openModal()}
              className="text-sm text-primary
                font-semibold mt-3 disabled:opacity-50"
            >
              Add your first essential
            </button>

          </div>
        )}

        <div className="divide-y divide-border">

          {habits.map(habit => (
            <div
              key={habit.id}
              className="flex items-center gap-3 py-4"
            >

              <span className="text-2xl">
                {habit.icon}
              </span>

              <div className="flex-1 min-w-0">

                <h3 className="font-semibold text-sm">
                  {habit.name}
                </h3>

                <p className="text-xs text-muted mt-1">
                  {habit.quantity}
                </p>

                <p className="text-xs text-muted mt-1">
                  {habit.required
                    ? "Daily goal"
                    : "Optional"}
                </p>

              </div>

              <button
                type="button"
                disabled={saving}
                onClick={() => openModal(habit)}
                aria-label={`Edit ${habit.name}`}
                className="p-2 text-muted
                  disabled:opacity-50"
              >
                <Pencil size={17} />
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => handleDelete(habit)}
                aria-label={`Delete ${habit.name}`}
                className="p-2 text-red-400
                  disabled:opacity-50"
              >
                <Trash2 size={17} />
              </button>

            </div>
          ))}

        </div>

      </Card>

      {modalOpen && (
        <HabitModal
          habit={selected}
          saving={saving}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

    </>
  );
}

export default HabitManager;