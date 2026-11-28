const CONFIDENCE_LEVELS = [
  "high",
  "medium",
  "low"
];

function round(value, decimals = 1) {
  const factor = 10 ** decimals;

  return Math.round(value * factor) / factor;
}

function validNumber(value) {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0
  );
}

function getConfidence(value) {
  return CONFIDENCE_LEVELS.includes(value)
    ? value
    : "low";
}

function invalidResponse() {
  const error = new Error(
    "AI returned an invalid nutrition estimate. Please retry."
  );

  error.status = 502;

  return error;
}

export function validateFoodAnalysis(result) {
  if (
    !result ||
    !Array.isArray(result.items) ||
    result.items.length > 30
  ) {
    throw invalidResponse();
  }

  const items = result.items.map(item => {
    if (
      !item ||
      typeof item.name !== "string" ||
      !item.name.trim() ||
      typeof item.quantity !== "string" ||
      !validNumber(item.calories) ||
      !validNumber(item.protein)
    ) {
      throw invalidResponse();
    }

    return {
      name: item.name.trim().slice(0, 120),

      quantity: item.quantity.trim().slice(0, 100),

      calories: round(item.calories, 0),

      protein: round(item.protein),

      confidence: getConfidence(item.confidence)
    };
  });

  const calories = items.reduce(
    (total, item) => total + item.calories,
    0
  );

  const protein = items.reduce(
    (total, item) => total + item.protein,
    0
  );

  return {
    description:
      typeof result.description === "string"
        ? result.description.trim().slice(0, 500)
        : items.map(item => item.name).join(", "),

    items,

    calories: round(calories, 0),

    protein: round(protein),

    confidence: getConfidence(result.confidence),

    notes:
      typeof result.notes === "string"
        ? result.notes.slice(0, 1000)
        : "",

    foodDetected: items.length > 0
  };
}