export function calculateNutrition(log) {
  const meals = Object.values(log.meals || {});

  const habits = log.completedHabits instanceof Map
    ? Array.from(log.completedHabits.values())
    : Object.values(log.completedHabits || {});

  const extras = log.extras || [];

  const entries = [
    ...meals,
    ...habits,
    ...extras
  ].filter(Boolean);

  const totals = entries.reduce(
    (result, entry) => {
      result.calories += entry.calories ?? 0;
      result.protein += entry.protein ?? 0;

      return result;
    },
    {
      calories: 0,
      protein: 0
    }
  );

  return {
    calories: Number(totals.calories.toFixed(2)),
    protein: Number(totals.protein.toFixed(2)),

    hasUnknownNutrition: entries.some(
      entry =>
        entry.calories == null ||
        entry.protein == null
    )
  };
}