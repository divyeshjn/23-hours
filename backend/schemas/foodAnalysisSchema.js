import { Type } from "@google/genai";

export const foodAnalysisSchema = {
  type: Type.OBJECT,

  properties: {
    description: {
      type: Type.STRING
    },

    items: {
      type: Type.ARRAY,

      items: {
        type: Type.OBJECT,

        properties: {
          name: {
            type: Type.STRING
          },

          quantity: {
            type: Type.STRING
          },

          calories: {
            type: Type.NUMBER
          },

          protein: {
            type: Type.NUMBER
          },

          confidence: {
            type: Type.STRING,
            enum: ["high", "medium", "low"]
          }
        },

        required: [
          "name",
          "quantity",
          "calories",
          "protein",
          "confidence"
        ]
      }
    },

    confidence: {
      type: Type.STRING,
      enum: ["high", "medium", "low"]
    },

    notes: {
      type: Type.STRING
    }
  },

  required: [
    "description",
    "items",
    "confidence",
    "notes"
  ]
};