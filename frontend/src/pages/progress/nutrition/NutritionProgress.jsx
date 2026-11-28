import {
  Flame,
  Beef,
  Droplets
} from "lucide-react";

import useSettings from "../../../hooks/useSettings";

import LoadingState from "../../../components/common/LoadingState";
import ErrorState from "../../../components/common/ErrorState";

import useWeeklyNutrition from "../hooks/useWeeklyNutrition";

import WeekSelector from "./WeekSelector";
import WeeklyOverview from "./WeeklyOverview";
import NutritionChart from "./NutritionChart";
import TargetAdherence from "./TargetAdherence";
import WeeklyInsights from "./WeeklyInsights";

export default function NutritionProgress() {
  const { settings } = useSettings();

  const targets = settings?.targets || {};

  const {
    days,
    summary,

    weekStart,
    weekEnd,
    isCurrentWeek,

    previousWeek,
    nextWeek,
    resetWeek,

    loading,
    error,
    refresh
  } = useWeeklyNutrition();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={refresh}
      />
    );
  }

  return (
    <div className="space-y-5">

      <WeekSelector
        weekStart={weekStart}
        weekEnd={weekEnd}
        isCurrentWeek={isCurrentWeek}
        previousWeek={previousWeek}
        nextWeek={nextWeek}
        resetWeek={resetWeek}
      />

      <WeeklyOverview
        summary={summary}
      />

      <NutritionChart
        title="Daily calorie intake"
        subtitle="Recorded calories throughout the week"
        days={days}
        metric="calories"
        target={targets.calories}
        unit="kcal"
        icon={Flame}
      />

      <NutritionChart
        title="Daily protein intake"
        subtitle="Protein intake and consistency"
        days={days}
        metric="protein"
        target={targets.protein}
        unit="g"
        icon={Beef}
      />

      <NutritionChart
        title="Daily hydration"
        subtitle="Recorded water consumption"
        days={days}
        metric="water"
        target={targets.water}
        unit="L"
        divisor={1000}
        icon={Droplets}
      />

      <TargetAdherence
        summary={summary}
        targets={targets}
        days={days}
      />

      <WeeklyInsights
        summary={summary}
        targets={targets}
      />

      <p className="text-center text-xs
        leading-relaxed text-muted">

        Analytics are based on recorded intake.
        Missing values are excluded from averages.
        Historical intake is compared with current targets.

      </p>

    </div>
  );
}