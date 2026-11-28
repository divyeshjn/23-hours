import {
  Lightbulb,
  Info
} from "lucide-react";

export default function WeeklyInsights({
  summary,
  targets
}) {
  const insights = [];

  if (summary.nutritionDays < summary.elapsedDays) {
    insights.push(
      "Some days have no recorded nutrition. " +
      "Recorded averages may not represent your full intake."
    );
  }

  if (
    summary.averageProtein !== null &&
    targets?.protein > 0
  ) {
    const difference =
      targets.protein - summary.averageProtein;

    if (difference > 5) {
      insights.push(
        `Recorded protein averages ${Math.round(difference)} g ` +
        "below your daily target. Consider including " +
        "a protein-rich food in your meals."
      );
    } else {
      insights.push(
        "Your average recorded protein intake " +
        "is close to or above your target."
      );
    }
  }

  if (
    summary.averageCalories !== null &&
    targets?.calories > 0
  ) {
    const ratio =
      summary.averageCalories / targets.calories;

    if (ratio < 0.85) {
      insights.push(
        "Recorded calories are substantially below " +
        "your target. Check whether any meals are missing."
      );
    } else if (ratio > 1.15) {
      insights.push(
        "Average recorded calories are above your target. " +
        "Review your overall intake and activity trends."
      );
    } else {
      insights.push(
        "Average recorded calories are within " +
        "15% of your current target."
      );
    }
  }

  if (
    summary.averageWater !== null &&
    targets?.water > 0 &&
    summary.averageWater < targets.water * 0.9
  ) {
    insights.push(
      "Recorded water intake is below your target. " +
      "Try distributing hydration throughout the day."
    );
  }

  if (summary.workoutDays > 0) {
    insights.push(
      `You recorded ${summary.workoutDays} workout(s) ` +
      "during this period. Maintain adequate nutrition and recovery."
    );
  }

  return (
    <section className="rounded-2xl border
      border-border bg-card p-4 sm:p-6">

      <div className="flex items-center gap-2">

        <Lightbulb
          size={20}
          className="text-primary"
        />

        <h2 className="font-heading
          font-bold text-lg">
          Nutrition insights
        </h2>

      </div>

      <div className="mt-4 space-y-4">

        {!insights.length && (
          <p className="text-sm text-muted">
            Record more data to receive weekly insights.
          </p>
        )}

        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start gap-3"
          >

            <Info
              size={17}
              className="mt-0.5 shrink-0
                text-[#81947B]"
            />

            <p className="text-sm leading-relaxed
              text-muted">
              {insight}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}