import {
  Scale,
  Ruler,
  TrendingUp,
  Flag
} from "lucide-react";

import ProgressStat from "./ProgressStat";

import {
  formatChange
} from "../../../utils/bodyProgress";

export default function ProgressOverview({
  weightSummary,
  waistSummary,
  unit
}) {

  return (

    <div className="grid grid-cols-2
      lg:grid-cols-4 gap-3">

      <ProgressStat
        label="Starting weight"
        value={weightSummary.initial}
        unit="kg"
        icon={Flag}
      />

      <ProgressStat
        label="Current weight"
        value={weightSummary.latest}
        unit="kg"
        icon={Scale}
      />

      <ProgressStat
        label="Weight change"
        value={
          weightSummary.change === null
            ? null
            : formatChange(weightSummary.change)
        }
        unit="kg"
        icon={TrendingUp}
      />

      <ProgressStat
        label="Waist change"
        value={
          waistSummary?.change == null
            ? null
            : formatChange(waistSummary.change)
        }
        unit={unit}
        icon={Ruler}
      />

    </div>

  );
}