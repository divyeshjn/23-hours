import NutritionEntryModal from "./NutritionEntryModal";

function MealModal({
  meal,
  entry,
  onClose,
  onSave,
  onDelete
}) {
  if (!meal) return null;

  return (
    <NutritionEntryModal
      title={`${entry ? "Edit" : "Log"} ${meal.label}`}
      entry={entry}
      onClose={onClose}
      onSave={({ calories, protein }) =>
        onSave({
          description: meal.label,
          calories,
          protein
        })
      }
      onDelete={onDelete}
    />
  );
}

export default MealModal;