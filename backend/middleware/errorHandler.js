function errorHandler(err, req, res, next) {
  console.error(err.message);

  if (
    err.name === "ValidationError" ||
    err.name === "CastError"
  ) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Record already exists"
    });
  }

  const status = err.status || 500;

  return res.status(status).json({
    success: false,
    message: status === 500
      ? "Internal server error"
      : err.message
  });
}

export default errorHandler;