import { MEAL_TYPES } from "../../../constants/nutrition";
import MealCard from "./MealCard";

function MealSection({ meals, onSelectMeal }) {
  return (
    <section>

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-lg font-heading font-bold">
          Today's meals
        </h2>

        <span className="text-xs text-muted">
          {MEAL_TYPES.filter(meal => meals[meal.id]).length}/3 logged
        </span>

      </div>

      <div className="flex flex-col gap-3">

        {MEAL_TYPES.map(meal => (
          <MealCard
            key={meal.id}
            meal={meal}
            entry={meals[meal.id]}
            onClick={() => onSelectMeal(meal)}
          />
        ))}

      </div>

    </section>
  );
}

export default MealSection;
