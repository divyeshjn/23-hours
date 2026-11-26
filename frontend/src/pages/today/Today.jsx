import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import NutritionOverview from "./components/NutritionOverview";
import MealSection from "./components/MealSection";
import MealModal from "./components/MealModal";

import useDailyLog from "./hooks/useDailyLog";

import { DEFAULT_TARGETS } from "../../constants/nutrition";

function Today() {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const {
    meals,
    totals,
    saveMeal,
    deleteMeal
  } = useDailyLog();

  const date = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Asia/Kolkata"
  }).format(new Date());

  function handleSave(entry) {
    saveMeal(selectedMeal.id, entry);
    setSelectedMeal(null);
  }

  function handleDelete() {
    deleteMeal(selectedMeal.id);
    setSelectedMeal(null);
  }

  return (
    <>
      <PageHeader
        title="Today"
        subtitle={date}
      />

      <div className="flex flex-col gap-7">

        <NutritionOverview
          totals={totals}
          targets={DEFAULT_TARGETS}
        />

        <MealSection
          meals={meals}
          onSelectMeal={setSelectedMeal}
        />

      </div>

      {selectedMeal && (
        <MealModal
          key={selectedMeal.id}
          meal={selectedMeal}
          entry={meals[selectedMeal.id]}
          onClose={() => setSelectedMeal(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}

    </>
  );
}

export default Today;
