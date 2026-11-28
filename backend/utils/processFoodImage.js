import sharp from "sharp";

export async function processFoodImage(buffer) {
  try {
    const image = await sharp(buffer, {
      limitInputPixels: 40_000_000
    })
      .rotate()
      .resize({
        width: 768,
        height: 768,
        fit: "inside",
        withoutEnlargement: true
      })
      .flatten({
        background: "#ffffff"
      })
      .jpeg({
        quality: 75
      })
      .toBuffer();

    return {
      data: image.toString("base64"),
      mimeType: "image/jpeg"
    };

  } catch {
    const error = new Error(
      "Unable to process this image. Please try a JPEG or PNG photograph."
    );

    error.status = 400;

    throw error;
  }
}