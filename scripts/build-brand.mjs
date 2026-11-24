/**
 * Generates PNG logos, app icons and favicon.ico from public/brand/logo-mark.svg.
 *   node scripts/build-brand.mjs
 */
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const svg = await readFile("public/brand/logo-mark.svg");
await mkdir("public/brand", { recursive: true });

// Render once at high resolution, then downscale for crisp small sizes.
const master = await sharp(svg, { density: 900 }).resize(2048, 2048).png().toBuffer();

async function png(size, { pad = 0, bg = null } = {}) {
  const inner = size - pad * 2;
  let img = sharp(master).resize(inner, inner, { kernel: "lanczos3" });
  img = img.extend({
    top: pad, bottom: pad, left: pad, right: pad,
    background: bg ?? { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (bg) img = img.flatten({ background: bg });
  return img.png({ compressionLevel: 9 }).toBuffer();
}

const white = { r: 255, g: 255, b: 255, alpha: 1 };

// Transparent logo files for general use
await writeFile("public/brand/logo-mark-512.png", await png(512));
await writeFile("public/brand/logo-mark-1024.png", await png(1024));

// App icons (Next.js file conventions in src/app)
await writeFile("src/app/icon.png", await png(512, { pad: 24 }));
await writeFile("src/app/apple-icon.png", await png(180, { pad: 16, bg: white }));

// PWA / Android icons with white background and safe padding
await writeFile("public/brand/icon-192.png", await png(192, { pad: 18, bg: white }));
await writeFile("public/brand/icon-512.png", await png(512, { pad: 48, bg: white }));

// favicon.ico containing 16, 32 and 48 px PNG images
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(s, { pad: s >= 32 ? 1 : 0 })));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);
const dir = Buffer.alloc(16 * images.length);
let offset = 6 + dir.length;
images.forEach((img, i) => {
  const s = sizes[i];
  const o = i * 16;
  dir.writeUInt8(s, o);
  dir.writeUInt8(s, o + 1);
  dir.writeUInt8(0, o + 2);
  dir.writeUInt8(0, o + 3);
  dir.writeUInt16LE(1, o + 4);
  dir.writeUInt16LE(32, o + 6);
  dir.writeUInt32LE(img.length, o + 8);
  dir.writeUInt32LE(offset, o + 12);
  offset += img.length;
});
await writeFile("src/app/favicon.ico", Buffer.concat([header, dir, ...images]));

console.log("Brand assets generated.");
