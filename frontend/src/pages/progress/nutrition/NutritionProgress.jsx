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
import PeriodComparison from "./PeriodComparison";

export default function NutritionProgress() {
  const { settings } = useSettings();

  const targets = settings?.targets || {};

  const {
    period,
    changePeriod,

    startDate,
    endDate,

    days,
    chartData,

    summary,
    previousSummary,

    isCurrentPeriod,
    previousPeriod,
    nextPeriod,
    resetPeriod,

    loading,
    error,
    refresh
  } = useWeeklyNutrition();

  const isAggregated =
    period === "year" || period === "all";

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
        period={period}
        changePeriod={changePeriod}
        startDate={startDate}
        endDate={endDate}
        isCurrentPeriod={isCurrentPeriod}
        previousPeriod={previousPeriod}
        nextPeriod={nextPeriod}
        resetPeriod={resetPeriod}
      />

      <WeeklyOverview summary={summary} />

      <PeriodComparison
        summary={summary}
        previousSummary={previousSummary}
        period={period}
      />

      <NutritionChart
        title="Calorie trends"
        subtitle={
          isAggregated
            ? "Average daily calories by month"
            : "Recorded daily calorie intake"
        }
        days={chartData}
        metric="calories"
        target={targets.calories}
        unit="kcal"
        icon={Flame}
      />

      <NutritionChart
        title="Protein trends"
        subtitle={
          isAggregated
            ? "Average daily protein by month"
            : "Recorded daily protein intake"
        }
        days={chartData}
        metric="protein"
        target={targets.protein}
        unit="g"
        icon={Beef}
      />

      <NutritionChart
        title="Hydration trends"
        subtitle={
          isAggregated
            ? "Average daily water intake by month"
            : "Recorded daily water consumption"
        }
        days={chartData}
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

    </div>
  );
}