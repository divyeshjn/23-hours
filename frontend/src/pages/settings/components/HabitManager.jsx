import { useState, useRef } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  ClipboardList
} from "lucide-react";

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

        <div className="mb-5 flex items-center
          justify-between gap-3">

          <div>
            <h2 className="font-heading text-lg
              font-bold text-foreground">

              Daily essentials

            </h2>

            <p className="mt-1 text-xs text-muted">
              Manage your recurring habits
            </p>
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={() => openModal()}
            className="flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl bg-primary text-background
              transition-opacity hover:opacity-90
              disabled:opacity-50"
            aria-label="Add essential"
          >
            <Plus size={22} strokeWidth={2.5} />
          </button>

        </div>

        {deleteError && (

          <div
            role="alert"
            className="mb-4 flex items-start gap-2
              rounded-xl border border-danger/20
              bg-danger/10 p-3 text-sm text-red-400"
          >

            <AlertCircle
              size={17}
              className="mt-0.5 shrink-0"
            />

            <p>{deleteError}</p>

          </div>

        )}

        {habits.length === 0 && (

          <div className="rounded-2xl border
            border-dashed border-border
            bg-surface/50 px-4 py-8 text-center">

            <div className="mx-auto mb-3 flex
              h-14 w-14 items-center justify-center
              rounded-2xl bg-primary/10">

              <ClipboardList
                size={26}
                className="text-primary"
              />

            </div>

            <p className="text-sm text-muted">
              No daily essentials added yet.
            </p>

            <button
              type="button"
              disabled={saving}
              onClick={() => openModal()}
              className="mt-4 rounded-xl
                bg-primary/10 px-4 py-2.5
                text-sm font-semibold text-primary
                transition-colors hover:bg-primary/20
                disabled:opacity-50"
            >
              Add your first essential
            </button>

          </div>

        )}

        <div className="divide-y divide-border">

          {habits.map(habit => (

            <div
              key={habit.id}
              className="flex items-center
                gap-3 py-4"
            >

              <div className="flex h-12 w-12
                shrink-0 items-center justify-center
                rounded-xl border border-border
                bg-surface text-2xl">

                {habit.icon}

              </div>

              <div className="min-w-0 flex-1">

                <h3 className="wrap-break-words
                  text-sm font-semibold
                  text-foreground">

                  {habit.name}

                </h3>

                <p className="mt-1 wrap-break-words
                  text-xs text-muted">

                  {habit.quantity}

                </p>

                <span className={`mt-2 inline-flex
                  rounded-md px-2 py-1
                  text-[10px] font-medium ${
                    habit.required
                      ? "bg-primary/10 text-primary"
                      : "bg-surface text-muted"
                  }`}>

                  {habit.required
                    ? "Daily goal"
                    : "Optional"}

                </span>

              </div>

              <div className="flex shrink-0
                items-center gap-1">

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => openModal(habit)}
                  aria-label={`Edit ${habit.name}`}
                  className="flex h-9 w-9
                    items-center justify-center
                    rounded-lg text-muted
                    transition-colors
                    hover:bg-primary/10
                    hover:text-primary
                    disabled:opacity-50"
                >

                  <Pencil size={17} />

                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleDelete(habit)}
                  aria-label={`Delete ${habit.name}`}
                  className="flex h-9 w-9
                    items-center justify-center
                    rounded-lg text-red-400
                    transition-colors
                    hover:bg-danger/10
                    disabled:opacity-50"
                >

                  <Trash2 size={17} />

                </button>

              </div>

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