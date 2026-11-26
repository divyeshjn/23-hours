import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import Card from "../../../components/common/Card";
import HabitModal from "./HabitModal";

function HabitManager({
  habits,
  onAdd,
  onUpdate,
  onDelete
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  function openModal(habit = null) {
    setSelected(habit);
    setModalOpen(true);
  }

  function closeModal() {
    setSelected(null);
    setModalOpen(false);
  }

  function handleSave(habit) {
    if (selected) {
      onUpdate(selected.id, habit);
    } else {
      onAdd(habit);
    }

    closeModal();
  }

  function handleDelete(habit) {
    if (window.confirm(`Remove ${habit.name} from daily essentials?`)) {
      onDelete(habit.id);
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
            onClick={() => openModal()}
            className="bg-primary text-white
              p-2.5 rounded-xl"
            aria-label="Add essential"
          >
            <Plus size={20} />
          </button>

        </div>

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
                onClick={() => openModal(habit)}
                aria-label={`Edit ${habit.name}`}
                className="p-2 text-muted"
              >
                <Pencil size={17} />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(habit)}
                aria-label={`Delete ${habit.name}`}
                className="p-2 text-red-400"
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
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

    </>
  );
}

export default HabitManager;