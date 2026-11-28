import multer from "multer";

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif"
];

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1
  },

  fileFilter: (req, file, callback) => {
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error(
        "Please upload a supported image file."
      );

      error.status = 400;

      return callback(error);
    }

    callback(null, true);
  }
});

export default function uploadFoodImage(req, res, next) {
  upload.single("image")(req, res, error => {
    if (error) {
      return res.status(
        error.code === "LIMIT_FILE_SIZE" ? 413 : 400
      ).json({
        success: false,
        message:
          error.code === "LIMIT_FILE_SIZE"
            ? "Image must be smaller than 10 MB."
            : error.message
      });
    }

    next();
  });
}