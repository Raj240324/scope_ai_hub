#!/usr/bin/env node
/**
 * convert-frames-to-webp.js
 *
 * Converts all JPG frames in public/frames/ to WebP format.
 * Quality 80 is visually lossless for video frames.
 *
 * Usage: node scripts/convert-frames-to-webp.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRAMES_DIR = path.resolve(__dirname, '..', 'public', 'frames');
const QUALITY = 80;

async function convert() {
  const files = fs.readdirSync(FRAMES_DIR)
    .filter(f => f.endsWith('.jpg'))
    .sort();

  if (files.length === 0) {
    console.log('No JPG frames found in public/frames/');
    return;
  }

  console.log(`Converting ${files.length} JPG frames to WebP (quality ${QUALITY})...\n`);

  let totalJpg = 0;
  let totalWebp = 0;

  for (let i = 0; i < files.length; i++) {
    const jpgPath = path.join(FRAMES_DIR, files[i]);
    const webpName = files[i].replace(/\.jpg$/i, '.webp');
    const webpPath = path.join(FRAMES_DIR, webpName);

    const jpgSize = fs.statSync(jpgPath).size;
    totalJpg += jpgSize;

    await sharp(jpgPath)
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const webpSize = fs.statSync(webpPath).size;
    totalWebp += webpSize;

    const saved = ((1 - webpSize / jpgSize) * 100).toFixed(1);

    if ((i + 1) % 20 === 0 || i === files.length - 1) {
      console.log(`  [${i + 1}/${files.length}] ${files[i]} → ${webpName} (${saved}% smaller)`);
    }
  }

  const totalSavedMB = ((totalJpg - totalWebp) / (1024 * 1024)).toFixed(2);
  const totalSavedPct = ((1 - totalWebp / totalJpg) * 100).toFixed(1);

  console.log(`\n✅ Done! Converted ${files.length} frames.`);
  console.log(`   JPG total:  ${(totalJpg / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`   WebP total: ${(totalWebp / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`   Saved:      ${totalSavedMB} MB (${totalSavedPct}%)`);
  console.log(`\nYou can now delete the JPG originals with:`);
  console.log(`   del public\\frames\\*.jpg`);
}

convert().catch(err => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
