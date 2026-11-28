import Card from "../../../components/common/Card";
import ProgressRing from "./ProgressRing";

function NutritionOverview({ totals, targets }) {
  return (
    <Card>

      <h2 className="text-lg font-heading font-bold mb-5">
        Daily nutrition
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:gap-8">

        <ProgressRing
          label="Calories"
          value={totals.calories}
          target={targets.calories}
          unit="kcal"
          color="#25D366"
        />

        <ProgressRing
          label="Protein"
          value={totals.protein}
          target={targets.protein}
          unit="g"
          color="#128C7E"
        />

      </div>

    </Card>
  );
}

export default NutritionOverview;