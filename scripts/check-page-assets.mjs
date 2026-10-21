import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sources = fs
  .readdirSync("src", { recursive: true })
  .filter((file) => /\.(tsx?|css)$/.test(file))
  .map((file) => path.join("src", file));
const assets = new Set();
for (const file of sources) {
  for (const match of fs
    .readFileSync(file, "utf8")
    .matchAll(/\/(?:images|fonts)\/[a-zA-Z0-9._-]+/g)) {
    assets.add(match[0]);
  }
}
// Gallery paths are built from their names in the component.
for (const name of ["turma", "pratica", "encontro"]) assets.add(`/images/${name}.webp`);
for (const asset of assets) {
  const file = path.resolve(root, "public", "." + asset);
  if (!fs.existsSync(file)) throw new Error(`Missing asset: ${asset}`);
  const data = fs.readFileSync(file);
  const signature = data.subarray(0, 4).toString();
  if (
    asset.endsWith(".webp") &&
    (signature !== "RIFF" || data.subarray(8, 12).toString() !== "WEBP")
  )
    throw new Error(`Invalid WebP: ${asset}`);
  if (asset.endsWith(".woff2") && signature !== "wOF2") throw new Error(`Invalid font: ${asset}`);
}
const images = fs.readdirSync("public/images");
const bytes = images.reduce(
  (sum, file) => sum + fs.statSync(path.join("public/images", file)).size,
  0,
);
console.log(
  `${assets.size} page resources verified; ${images.length} images total ${(bytes / 1024).toFixed(1)} KiB.`,
);
