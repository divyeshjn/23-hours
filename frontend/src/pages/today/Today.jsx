import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import NutritionOverview from "./components/NutritionOverview";
import MealSection from "./components/MealSection";
import MealModal from "./components/MealModal";

import EssentialsSection from "./components/EssentialsSection";
import WaterTracker from "./components/WaterTracker";
import WorkoutCard from "./components/WorkoutCard";
import ExtrasSection from "./components/ExtrasSection";

import useDailyLog from "./hooks/useDailyLog";
import useSettings from "../../hooks/useSettings";
import useTodayDate from "../../hooks/useTodayDate";

import { getFormattedDate } from "../../utils/date";

function DailyDashboard({ date }) {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const { settings } = useSettings();

  const {
    meals,
    totals,
    completedHabits,
    water,
    workout,
    extras,
    hasUnknownNutrition,
    saveMeal,
    deleteMeal,
    toggleHabit,
    changeWater,
    updateWorkout,
    saveExtra,
    deleteExtra
  } = useDailyLog(date);

  // Keep completed habits visible even if their
  // templates have subsequently been deleted.
  const visibleHabits = [
    ...settings.habits,
    ...Object.values(completedHabits).filter(
      habit => !settings.habits.some(
        template => template.id === habit.id
      )
    )
  ];

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
        subtitle={getFormattedDate(date)}
      />

      <div className="flex flex-col gap-7">

        <NutritionOverview
          totals={totals}
          targets={settings.targets}
        />

        {hasUnknownNutrition && (
          <p className="text-xs text-muted">
            Some logged items have unknown nutritional
            values. Totals include known values only.
          </p>
        )}

        <MealSection
          meals={meals}
          onSelectMeal={setSelectedMeal}
        />

        <EssentialsSection
          habits={visibleHabits}
          completedHabits={completedHabits}
          onToggle={toggleHabit}
        />

        <div className="grid grid-cols-1
          lg:grid-cols-2 gap-5">

          <WaterTracker
            water={water}
            target={settings.targets.water}
            onChange={changeWater}
          />

          <WorkoutCard
            workout={workout}
            onChange={updateWorkout}
          />

        </div>

        <ExtrasSection
          extras={extras}
          onSave={saveExtra}
          onDelete={deleteExtra}
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

function Today() {
  const date = useTodayDate();

  return (
    <DailyDashboard
      key={date}
      date={date}
    />
  );
}

export default Today;