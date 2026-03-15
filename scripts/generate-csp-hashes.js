import fs from "fs";
import crypto from "crypto";

const htmlPath = "./dist/index.html";
const vercelConfigPath = "./vercel.json";

const html = fs.readFileSync(htmlPath, "utf8");

// ─── BASELINE CSP ────────────────────────────────────────────────────
// This is the canonical CSP template.  The build script REPLACES the
// entire CSP value with this baseline + any discovered inline-script
// hashes.  This guarantees idempotent builds — running the script
// multiple times will never accumulate duplicate hashes.
const CSP_BASELINE = [
  // default-src
  "default-src 'self' wss://*.tawk.to",

  // script-src  (inline hashes are appended dynamically below)
  "script-src 'self' https://www.google.com https://www.gstatic.com https://*.tawk.to https://cdn.jsdelivr.net",

  // connect-src
  "connect-src 'self' https://api.brevo.com https://*.sentry.io https://*.tawk.to https://www.google.com https://www.gstatic.com wss://*.tawk.to",

  // img-src
  "img-src 'self' data: https://*.tawk.to https://fonts.gstatic.com https://*.google.com https://*.googleapis.com",

  // style-src
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.tawk.to",

  // font-src
  "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://*.tawk.to https://r2cdn.perplexity.ai",

  // frame-src
  "frame-src https://www.google.com https://*.tawk.to",

  // Restrictive directives
  "frame-ancestors 'none'",
  "form-action 'self'",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ") + ";";

// ─── Extract inline-script hashes ────────────────────────────────────

// Match ALL inline scripts — <script>, <script type="module">, <script nomodule>, etc.
// Excludes scripts that have a src attribute (those are external, not inline)
const scriptRegex = /<script(?:\s[^>]*)?>([^<]+)<\/script>/g;

const hashSet = new Set(); // ← Deduplication via Set
let match;

while ((match = scriptRegex.exec(html)) !== null) {
  const fullTag = match[0];
  const scriptContent = match[1];

  // Skip external scripts (those with src="...")
  if (/\ssrc\s*=\s*["']/.test(fullTag)) {
    continue;
  }

  const trimmed = scriptContent.trim();
  if (trimmed) {
    const hash = crypto
      .createHash("sha256")
      .update(trimmed)
      .digest("base64");

    const cspHash = `'sha256-${hash}'`;
    if (!hashSet.has(cspHash)) {
      console.log(`  → Hashed inline script (${trimmed.length} chars): ${cspHash}`);
    }
    hashSet.add(cspHash);
  }
}

const hashes = [...hashSet];

if (hashes.length === 0) {
  console.log("No inline scripts found in dist/index.html.");
}

console.log(`\nGenerated ${hashes.length} unique CSP hash(es):`, hashes);

// ─── Build final CSP ─────────────────────────────────────────────────
// Insert hashes into the baseline script-src directive
let cspValue = CSP_BASELINE;
if (hashes.length > 0) {
  cspValue = cspValue.replace(
    /(script-src\s[^;]*)/,
    `$1 ${hashes.join(" ")}`
  );
}

// ─── Write to vercel.json ────────────────────────────────────────────
const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, "utf8"));

vercelConfig.headers.forEach((header) => {
  if (header.headers) {
    header.headers.forEach((h) => {
      if (h.key === "Content-Security-Policy") {
        h.value = cspValue;
      }
    });
  }
});

fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2) + "\n");

// ─── Verify header size ──────────────────────────────────────────────
const headerBytes = Buffer.byteLength(cspValue, "utf8");
console.log(`\n✅ CSP updated in vercel.json (${headerBytes} bytes)`);
if (headerBytes > 4096) {
  console.warn(`⚠️  WARNING: CSP header is ${headerBytes} bytes — exceeds 4KB safety threshold.`);
} else {
  console.log(`   Header size is within safe limits (< 4KB).`);
}
