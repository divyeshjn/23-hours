export function calculateTotals(entries = []) {
  return entries.reduce(
    (totals, entry) => ({
      calories: totals.calories + Number(entry.calories || 0),
      protein: totals.protein + Number(entry.protein || 0)
    }),
    {
      calories: 0,
      protein: 0
    }
  );
}

export function calculatePercentage(value, target) {
  if (target <= 0) return 0;

  return Math.round((value / target) * 100);
}

export function calculateRemaining(value, target) {
  return Math.max(0, target - value);
}
