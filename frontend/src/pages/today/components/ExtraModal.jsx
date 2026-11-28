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
      requireName={true}
      onClose={onClose}
      onDelete={onDelete}
      onSave={nutrition =>
        onSave({
          id: entry?.id,
          name: nutrition.name.trim(),
          quantity: "",
          calories: nutrition.calories,
          protein: nutrition.protein
        })
      }
    />
  );
}