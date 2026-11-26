import {
  Sunrise,
  Sun,
  Moon,
  Camera,
  Pencil
} from "lucide-react";

const mealIcons = {
  breakfast: Sunrise,
  lunch: Sun,
  dinner: Moon
};

function MealCard({ meal, entry, onClick }) {
  const Icon = mealIcons[meal.id];

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-4
        bg-white border border-border rounded-2xl
        p-4 text-left hover:border-sage
        transition-all"
    >

      <div className="w-14 h-14 shrink-0
        bg-sage/20 rounded-2xl
        flex items-center justify-center">

        <Icon size={25} strokeWidth={1.7} />

      </div>

      <div className="flex-1 min-w-0">

        <h3 className="font-semibold">
          {meal.label}
        </h3>

        {entry ? (
          <>
            <p className="text-sm text-muted truncate">
              {entry.description}
            </p>

            <p className="text-xs font-medium mt-1">
              {entry.calories} kcal · {entry.protein} g protein
            </p>
          </>
        ) : (
          <p className="text-sm text-muted mt-1">
            Not logged yet
          </p>
        )}

      </div>

      <div className="bg-background p-3 rounded-xl">
        {entry ? (
          <Pencil size={19} strokeWidth={1.8} />
        ) : (
          <Camera size={21} strokeWidth={1.8} />
        )}
      </div>

    </button>
  );
}

export default MealCard;
