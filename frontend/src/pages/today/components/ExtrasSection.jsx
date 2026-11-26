import { useState } from "react";
import { Plus, Pencil, Apple } from "lucide-react";

import Card from "../../../components/common/Card";
import ExtraModal from "./ExtraModal";

function ExtrasSection({
  extras,
  onSave,
  onDelete
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  function openModal(entry = null) {
    setSelected(entry);
    setModalOpen(true);
  }

  function closeModal() {
    setSelected(null);
    setModalOpen(false);
  }

  return (
    <>
      <Card>

        <div className="flex items-center
          justify-between mb-4">

          <div>
            <h2 className="text-lg font-bold">
              Extra foods
            </h2>

            <p className="text-xs text-muted mt-1">
              Fruits, snacks and drinks
            </p>
          </div>

          <button
            type="button"
            onClick={() => openModal()}
            className="flex items-center gap-1.5
              bg-primary text-white rounded-xl
              px-3 py-2 text-sm"
          >
            <Plus size={17} />
            Add
          </button>

        </div>

        {!extras.length && (
          <div className="flex flex-col items-center
            py-6 text-muted gap-2">

            <Apple size={30} strokeWidth={1.3} />

            <p className="text-sm">
              No extra foods logged.
            </p>

          </div>
        )}

        <div className="divide-y divide-border">

          {extras.map(extra => (
            <button
              key={extra.id}
              type="button"
              onClick={() => openModal(extra)}
              className="flex items-center gap-3
                w-full py-3 text-left"
            >

              <div className="flex-1">

                <h3 className="font-semibold text-sm">
                  {extra.name}
                </h3>

                <p className="text-xs text-muted mt-1">
                  {extra.quantity}
                </p>

                <p className="text-xs mt-1">
                  {extra.calories} kcal ·
                  {" "}{extra.protein} g protein
                </p>

              </div>

              <Pencil size={17} />

            </button>
          ))}

        </div>

      </Card>

      {modalOpen && (
        <ExtraModal
          entry={selected}
          onClose={closeModal}
          onSave={entry => {
            onSave(entry);
            closeModal();
          }}
          onDelete={() => {
            onDelete(selected.id);
            closeModal();
          }}
        />
      )}

    </>
  );
}

export default ExtrasSection;