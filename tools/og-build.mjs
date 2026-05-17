// Convert public/og-cover.svg -> og-cover.jpg + og-cover.png (1200x630)
// Usage: node tools/og-build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const svgPath = path.join(root, 'public', 'og-cover.svg');
const jpgPath = path.join(root, 'public', 'og-cover.jpg');
const pngPath = path.join(root, 'public', 'og-cover.png');

const svg = fs.readFileSync(svgPath);

await sharp(svg, { density: 200 })
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(jpgPath);

await sharp(svg, { density: 200 })
  .resize(1200, 630, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(pngPath);

console.log('OG cover written:');
console.log(' -', jpgPath, fs.statSync(jpgPath).size, 'bytes');
console.log(' -', pngPath, fs.statSync(pngPath).size, 'bytes');
