import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";

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

    loading,
    saving,
    error,
    ready,
    loadLog,

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

  // Save meal

  async function handleSave(entry) {
    const success = await saveMeal(
      selectedMeal.id,
      entry
    );

    if (success) {
      setSelectedMeal(null);
    }
    return success;
  }

  // Delete meal

  async function handleDelete() {
    const success = await deleteMeal(
      selectedMeal.id
    );

    if (success) {
      setSelectedMeal(null);
    }
    return success;
  }

  // Loading state

  if (loading) {
    return (
      <LoadingState
        message="Loading today's nutrition..."
      />
    );
  }

  // Initial loading error

  if (!ready) {
    return (
      <ErrorState
        message={error || "Unable to load daily log"}
        onRetry={loadLog}
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Today"
        subtitle={getFormattedDate(date)}
      />

      {/* Saving indicator */}

      <div className="flex justify-end items-center min-h-5 mb-3">

        {saving ? (
          <span className="text-xs text-muted">
            Saving changes...
          </span>
        ) : !error ? (
          <span className="text-xs text-[#81947B]">
            All changes saved
          </span>
        ) : null}

      </div>

      {/* API error message */}

      {error && (
        <div
          role="alert"
          className="bg-red-50 border border-red-100
          text-red-600 text-sm p-3 rounded-xl mb-5"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col gap-7">

        {/* Nutrition overview */}

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

        {/* Daily meals */}

        <MealSection
          meals={meals}
          onSelectMeal={setSelectedMeal}
        />

        {/* Custom daily essentials */}

        <EssentialsSection
          habits={visibleHabits}
          completedHabits={completedHabits}
          onToggle={toggleHabit}
        />

        {/* Water and workout */}

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

        {/* Extra foods */}

        <ExtrasSection
          extras={extras}
          onSave={saveExtra}
          onDelete={deleteExtra}
        />

      </div>

      {/* Meal modal */}

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