import NutritionEntryModal from "./NutritionEntryModal";

export default function ExtraModal({
  entry,
  onSave,
  onDelete,
  onClose
}) {
  return (
    <NutritionEntryModal
      title={entry ? "Edit extra food" : "Add extra food"}
      entry={entry}
      onClose={onClose}
      onDelete={onDelete}
      onSave={nutrition =>
        onSave({
          id: entry?.id,
          name: "Extra food",
          quantity: "",
          calories: nutrition.calories,
          protein: nutrition.protein
        })
      }
    />
  );
}