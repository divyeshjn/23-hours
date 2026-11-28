import {
  analyseFoodImage
} from "../services/foodAnalysisService.js";

export async function analyseFood(req, res, next) {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({
        success: false,
        message: "Please provide a food photograph."
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        success: false,
        message: "AI food analysis is not configured."
      });
    }

    const result = await analyseFoodImage(
      req.file.buffer
    );

    if (!result.foodDetected) {
      return res.status(422).json({
        success: false,
        message:
          "No recognisable food was detected. Please try another photograph."
      });
    }

    res.set("Cache-Control", "no-store");

    return res.status(200).json({
    success: true,
    message: "Food analysed successfully.",
    data: {
        calories: result.calories,
        protein: result.protein
    }
    });

  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message
      });
    }

    next(error);
  }
}