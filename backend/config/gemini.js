import { GoogleGenAI } from "@google/genai";

let client = null;

export function getGeminiClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  if (!client) {
    client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });
  }

  return client;
}

export function getGeminiModel() {
  return (
    process.env.GEMINI_MODEL ||
    "gemini-3.8-flash"
  );
}