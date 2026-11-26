export default function requireAuth(req, res, next) {
  if (req.session?.authenticated !== true) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }

  next();
}