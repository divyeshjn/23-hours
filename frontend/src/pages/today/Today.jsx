import { useState } from "react";
import { AlertCircle } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import WeeklyCheckInReminder from "../../components/common/WeeklyCheckInReminder";

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

export function DailyDashboard({
  date,
  isHistory = false,
  onLogUpdated
}) {
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
  } = useDailyLog(date, onLogUpdated);

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
        message={
          isHistory
            ? "Loading daily record..."
            : "Loading today's nutrition..."
        }
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
    <div className="min-w-0">

      {!isHistory && (
        <PageHeader
          title="Today"
          subtitle={getFormattedDate(date)}
        />
      )}

      {/* API error message */}

      {error && (

        <div
          role="alert"
          className="mb-5 flex items-start gap-3
            rounded-xl border border-danger/20
            bg-danger/10 p-4 text-sm text-red-400"
        >

          <AlertCircle
            size={19}
            className="mt-0.5 shrink-0"
          />

          <p className="min-w-0 break-words">
            {error}
          </p>

        </div>

      )}

      <div className="flex min-w-0 flex-col gap-5 sm:gap-7">

        {/* Weekly check-in reminder */}

        {!isHistory && <WeeklyCheckInReminder />}

        {/* Nutrition overview */}

        <NutritionOverview
          totals={totals}
          targets={settings.targets}
        />

        {/* Unknown nutrition information */}

        {hasUnknownNutrition && (

          <div className="flex items-start gap-2
            rounded-xl border border-amber-500/15
            bg-amber-500/5 px-4 py-3">

            <AlertCircle
              size={16}
              className="mt-0.5 shrink-0 text-amber-400"
            />

            <p className="text-xs leading-relaxed text-muted">

              Some logged items have unknown nutritional
              values. Totals include known values only.

            </p>

          </div>

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

        <div className="grid min-w-0 grid-cols-1
          gap-5 lg:grid-cols-2">

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

    </div>
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