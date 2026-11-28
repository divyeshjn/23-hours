import {
  getGeminiClient,
  getGeminiModel
} from "../config/gemini.js";

import {
  FOOD_ANALYSIS_PROMPT
} from "../prompts/foodAnalysisPrompt.js";

import {
  foodAnalysisSchema
} from "../schemas/foodAnalysisSchema.js";

import {
  processFoodImage
} from "../utils/processFoodImage.js";

import {
  validateFoodAnalysis
} from "../utils/validateFoodAnalysis.js";

export async function analyseFoodImage(buffer) {
  const image = await processFoodImage(buffer);

  const client = getGeminiClient();
  const model = getGeminiModel();

  let response;

  try {
    console.log("Analysing food using:", model);
    const startTime = Date.now();

    console.log("Sending image to Gemini...");

    response = await client.models.generateContent({
      model,

      contents: [
        {
          role: "user",
          parts: [
            {
              text: FOOD_ANALYSIS_PROMPT
            },
            {
              inlineData: {
                data: image.data,
                mimeType: image.mimeType
              }
            }
          ]
        }
      ],

      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: foodAnalysisSchema,
        maxOutputTokens: 2048
      }
    });
    console.log(
      `Gemini completed in ${(Date.now() - startTime) / 1000}s`
    );

  } catch (error) {
    const status = Number(
      error.status || error.code || 500
    );

    // Log diagnostic information without photos or keys
    console.error("Gemini API request failed");
    console.error("Model:", model);
    console.error("Status:", status);
    console.error(
      "Error:",
      String(error.message || "Unknown error")
        .replace(/AIza[\w-]+/g, "[REDACTED]")
    );

    let message;

    switch (status) {
      case 400:
        message = "Invalid Gemini API request or configuration.";
        break;

      case 401:
      case 403:
        message = "Gemini API authentication failed.";
        break;

      case 404:
        message = "The configured Gemini model is unavailable.";
        break;

      case 429:
        message = "Gemini usage limit reached. Try again later.";
        break;

      case 503:
        message = "Gemini is temporarily overloaded.";
        break;

      default:
        message = "Food analysis failed. Please try again.";
    }

    const apiError = new Error(message);

    apiError.status = status === 429 ? 429 : 502;

    throw apiError;
  }

  if (!response.text) {
    const error = new Error(
      "AI could not analyse this photograph."
    );

    error.status = 502;

    throw error;
  }

  let result;

  try {
    result = JSON.parse(response.text);

  } catch {
    const error = new Error(
      "Unable to read the AI response. Please retry."
    );

    error.status = 502;

    throw error;
  }

  return validateFoodAnalysis(result);
}