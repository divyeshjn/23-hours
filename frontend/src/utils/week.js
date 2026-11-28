export const getISTDate = () => {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });
};

export const getWeekDate = (date = getISTDate()) => {
  const current = new Date(`${date}T12:00:00Z`);

  const day = current.getUTCDay();

  current.setUTCDate(current.getUTCDate() - day);

  return current.toISOString().slice(0, 10);
};

export const formatWeekDate = (date) => {
  if (!date) return "";

  return new Date(`${date.slice(0, 10)}T12:00:00Z`)
    .toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
};