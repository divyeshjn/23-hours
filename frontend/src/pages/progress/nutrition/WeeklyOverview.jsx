import {
  Flame,
  Beef,
  Droplets,
  CalendarCheck,
  Dumbbell,
  Moon
} from "lucide-react";

import ProgressStat from "../components/ProgressStat";

export default function WeeklyOverview({
  summary
}) {
  return (
    <div className="grid grid-cols-2
      lg:grid-cols-3 gap-3">

      <ProgressStat
        label="Average calories"
        value={
          summary.averageCalories === null
            ? null
            : Math.round(summary.averageCalories)
        }
        unit="kcal"
        icon={Flame}
      />

      <ProgressStat
        label="Average protein"
        value={
          summary.averageProtein?.toFixed(1) ?? null
        }
        unit="g"
        icon={Beef}
      />

      <ProgressStat
        label="Average water"
        value={
          summary.averageWater === null
            ? null
            : (summary.averageWater / 1000).toFixed(2)
        }
        unit="L"
        icon={Droplets}
      />

      <ProgressStat
        label="Nutrition days"
        value={`${summary.nutritionDays}/${summary.elapsedDays}`}
        unit="days"
        icon={CalendarCheck}
      />

      <ProgressStat
        label="Workouts completed"
        value={summary.workoutDays}
        unit="days"
        icon={Dumbbell}
      />

      <ProgressStat
        label="Rest days recorded"
        value={summary.restDays}
        unit="days"
        icon={Moon}
      />

    </div>
  );
}