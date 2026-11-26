function validateDate(req, res, next) {
  const { date } = req.params;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({
      success: false,
      message: "Date must be in YYYY-MM-DD format"
    });
  }

  const parsed = new Date(`${date}T00:00:00Z`);

  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== date
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid calendar date"
    });
  }

  next();
}

export default validateDate;