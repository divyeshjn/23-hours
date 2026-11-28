import sharp from "sharp";

const source = "public/app-icon.svg";

const sizes = [180, 192, 512];

for (const size of sizes) {
  await sharp(source)
    .resize(size, size)
    .png()
    .toFile(`public/icon-${size}.png`);

  console.log(`Generated icon-${size}.png`);
}