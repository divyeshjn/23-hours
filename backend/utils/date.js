export function getTodayIST() {

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());

  const getPart = type =>
    parts.find(part => part.type === type).value;

  return [
    getPart("year"),
    getPart("month"),
    getPart("day")
  ].join("-");
}

export function isValidDate(value) {

  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return false;
  }

  const date = new Date(
    `${value}T00:00:00Z`
  );

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

export function isSunday(value) {

  if (!isValidDate(value)) {
    return false;
  }

  const date = new Date(
    `${value}T00:00:00Z`
  );

  return date.getUTCDay() === 0;
}

export function getLatestSunday(
  value = getTodayIST()
) {

  if (!isValidDate(value)) {
    throw new Error("Invalid date");
  }

  const date = new Date(
    `${value}T00:00:00Z`
  );

  date.setUTCDate(
    date.getUTCDate() - date.getUTCDay()
  );

  return date.toISOString().slice(0, 10);
}