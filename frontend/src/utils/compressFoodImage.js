export async function compressFoodImage(file) {
  if (!file) {
    throw new Error("Please select an image.");
  }

  if (
    file.type &&
    !file.type.startsWith("image/")
  ) {
    throw new Error("Please select a valid image.");
  }

  const url = URL.createObjectURL(file);

  try {
    const image = new Image();

    image.src = url;

    try {
      await image.decode();
    } catch {
      throw new Error(
        "Unable to read this image. Please try a JPEG or PNG photograph."
      );
    }

    const maxSize = 1280;

    const scale = Math.min(
      1,
      maxSize / Math.max(
        image.naturalWidth,
        image.naturalHeight
      )
    );

    const canvas = document.createElement("canvas");

    canvas.width = Math.max(
      1,
      Math.round(image.naturalWidth * scale)
    );

    canvas.height = Math.max(
      1,
      Math.round(image.naturalHeight * scale)
    );

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Image processing unavailable.");
    }

    context.fillStyle = "#ffffff";

    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    context.drawImage(
      image,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const blob = await new Promise(
      (resolve, reject) => {
        canvas.toBlob(
          result => {
            if (result) {
              resolve(result);
            } else {
              reject(
                new Error("Image compression failed.")
              );
            }
          },
          "image/jpeg",
          0.8
        );
      }
    );

    canvas.width = 0;
    canvas.height = 0;

    return blob;

  } finally {
    URL.revokeObjectURL(url);
  }
}