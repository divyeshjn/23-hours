export const MEASUREMENT_FIELDS = [
  { key: "chest", label: "Chest" },
  { key: "waist", label: "Waist" },
  { key: "lowerAbdomen", label: "Lower abdomen" },
  { key: "hips", label: "Hips" },
  { key: "leftThigh", label: "Left thigh" },
  { key: "rightThigh", label: "Right thigh" },
  { key: "leftUpperArm", label: "Left upper arm" },
  { key: "rightUpperArm", label: "Right upper arm" }
];

export function convertMeasurement(
  value,
  fromUnit,
  toUnit
) {
  if (value === null || value === undefined) {
    return null;
  }

  if (fromUnit === toUnit) {
    return value;
  }

  return fromUnit === "in"
    ? value * 2.54
    : value / 2.54;
}

export function roundValue(value, digits = 1) {
  if (value === null || value === undefined) {
    return null;
  }

  return Number(value.toFixed(digits));
}

export function formatProgressDate(date) {
  if (!date) return "";

  return new Date(`${date.slice(0, 10)}T12:00:00Z`)
    .toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      timeZone: "Asia/Kolkata"
    });
}

export function formatChange(value, unit = "") {
  if (value === null || value === undefined) {
    return "—";
  }

  const rounded = roundValue(value);

  const sign = rounded > 0 ? "+" : "";

  return `${sign}${rounded.toFixed(1)} ${unit}`.trim();
}

export function getMetricHistory(
  checkIns,
  metric,
  unit = "in"
) {
  return [...checkIns]
    .sort((a, b) =>
      a.measuredOn.localeCompare(b.measuredOn) ||
      a.weekDate.localeCompare(b.weekDate)
    )
    .map(record => {

      const value =
        metric === "weight"
          ? record.weight
          : convertMeasurement(
              record.measurements?.[metric],
              record.unit,
              unit
            );

      return {
        date: record.measuredOn,
        weekDate: record.weekDate,
        label: formatProgressDate(record.measuredOn),
        value
      };
    })
    .filter(item =>
      typeof item.value === "number" &&
      Number.isFinite(item.value)
    );
}

export function getMetricSummary(history) {

  if (!history.length) {
    return {
      initial: null,
      latest: null,
      change: null,
      count: 0
    };
  }

  const initial = history[0].value;

  const latest =
    history[history.length - 1].value;

  return {
    initial: roundValue(initial),

    latest: roundValue(latest),

    change:
      history.length > 1
        ? roundValue(latest - initial)
        : null,

    count: history.length
  };
}