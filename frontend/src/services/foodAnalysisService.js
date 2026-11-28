import api from "./api";

export async function analyseFoodImage(image, signal) {
  const formData = new FormData();

  formData.append("image", image, "meal.jpg");

  const response = await api.post(
    "/food-analysis/analyse",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      timeout: 180000,
      signal
    }
  );

  const { calories, protein } = response.data;

  if (
    !Number.isFinite(calories) ||
    !Number.isFinite(protein) ||
    calories < 0 ||
    protein < 0
  ) {
    throw new Error("Invalid nutrition estimate.");
  }

  return { calories, protein };
}