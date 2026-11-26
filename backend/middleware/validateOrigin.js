export default function validateOrigin(req, res, next) {
  const safeMethods = [
    "GET",
    "HEAD",
    "OPTIONS"
  ];

  if (safeMethods.includes(req.method)) {
    return next();
  }

  const allowedOrigin =
    process.env.CLIENT_URL ||
    "http://localhost:5173";

  const origin = req.get("Origin");

  if (origin !== allowedOrigin) {
    return res.status(403).json({
      success: false,
      message: "Request origin not allowed"
    });
  }

  next();
}