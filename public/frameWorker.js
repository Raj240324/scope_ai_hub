// ─────────────────────────────────────────────────────────────────────────────
// frameWorker.js
// Place this file at: /public/frameWorker.js
//
// Served from 'self' — passes any CSP that allows script-src 'self'.
// Blob URL workers are blocked by strict CSPs. This file is not.
//
// Decode pipeline per frame:
//   1. ImageDecoder API  — Chrome 94+, Safari 16.4+ (stream-based, fastest)
//   2. img + createImageBitmap — universal fallback (all browsers)
//   3. fetch + blob fallback — last resort
//
// Every bitmap is resized to display resolution before transfer.
// The main thread receives a ready-to-draw GPU texture — zero decode cost at draw time.
// ─────────────────────────────────────────────────────────────────────────────

async function decodeBitmap(url, w, h) {
  // Strategy 1: ImageDecoder (Chrome 94+, Safari 16.4+)
  if (typeof ImageDecoder !== "undefined") {
    try {
      const res  = await fetch(url);
      const type = res.headers.get("content-type") || "image/webp";
      const dec  = new ImageDecoder({ data: res.body, type, preferAnimation: false });
      await dec.completed;
      const { image } = await dec.decode({ frameIndex: 0 });
      const bm = await createImageBitmap(image, {
        resizeWidth: w, resizeHeight: h, resizeQuality: "medium",
      });
      image.close();
      dec.close();
      return bm;
    } catch (_) {
      // fall through
    }
  }

  // Strategy 2: fetch + createImageBitmap (universal)
  const blob = await (await fetch(url)).blob();
  return createImageBitmap(blob, {
    resizeWidth: w, resizeHeight: h, resizeQuality: "medium",
  });
}

self.onmessage = async ({ data: { id, url, w, h } }) => {
  try {
    const bitmap = await decodeBitmap(url, w, h);
    // Transfer bitmap — zero-copy, no serialisation overhead
    self.postMessage({ id, ok: true, bitmap }, [bitmap]);
  } catch (e) {
    self.postMessage({ id, ok: false, error: String(e) });
  }
};