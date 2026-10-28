/**
 * Convert source PNG/JPG artwork to WebP in place.
 *
 * Usage: node scripts/optimize-images.mjs <dir> [quality] [--keep]
 *
 * Hero and article artwork arrives as multi-megabyte PNGs. Next.js can
 * transform them on the fly, but every cold cache pays for that, so the files
 * that ship are converted once here instead. The original is deleted unless
 * `--keep` is passed.
 */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

// `sharp` ships inside Next.js rather than as a direct dependency.
const require = createRequire(import.meta.url);
const sharp = require("sharp");

const [dir, qualityArg] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const keep = process.argv.includes("--keep");
const quality = Number(qualityArg ?? 80);

if (!dir) {
  console.error("usage: node scripts/optimize-images.mjs <dir> [quality] [--keep]");
  process.exit(1);
}

const sources = fs
  .readdirSync(dir)
  .filter((f) => /\.(png|jpe?g)$/i.test(f))
  .sort();

if (sources.length === 0) {
  console.log(`No PNG or JPG files in ${dir}.`);
  process.exit(0);
}

let before = 0;
let after = 0;

for (const file of sources) {
  const src = path.join(dir, file);
  const out = src.replace(/\.(png|jpe?g)$/i, ".webp");
  const info = await sharp(src).webp({ quality }).toFile(out);
  const srcKb = Math.round(fs.statSync(src).size / 1024);
  const outKb = Math.round(info.size / 1024);
  before += srcKb;
  after += outKb;

  console.log(
    `${file.padEnd(38)} ${String(srcKb).padStart(5)} KB -> ${String(outKb).padStart(4)} KB  ${info.width}x${info.height}`,
  );
  if (!keep) fs.unlinkSync(src);
}

console.log(
  `\n${sources.length} file(s): ${before} KB -> ${after} KB (${Math.round((1 - after / before) * 100)}% smaller)`,
);
