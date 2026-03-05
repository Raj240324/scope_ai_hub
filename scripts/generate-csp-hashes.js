import fs from "fs";
import crypto from "crypto";

const htmlPath = "./dist/index.html";
const vercelConfigPath = "./vercel.json";

const html = fs.readFileSync(htmlPath, "utf8");

// Match ALL inline scripts — <script>, <script type="module">, <script nomodule>, etc.
// Excludes scripts that have a src attribute (those are external, not inline)
const scriptRegex = /<script(?:\s[^>]*)?>([^<]+)<\/script>/g;

let hashes = [];
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

    hashes.push(`'sha256-${hash}'`);
    console.log(`  → Hashed inline script (${trimmed.length} chars)`);
  }
}

if (hashes.length === 0) {
  console.log("No inline scripts found in dist/index.html — CSP unchanged.");
  process.exit(0);
}

console.log(`\nGenerated ${hashes.length} CSP hash(es):`, hashes);

let vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, "utf8"));

vercelConfig.headers.forEach((header) => {
  if (header.headers) {
    header.headers.forEach((h) => {
      if (h.key === "Content-Security-Policy") {
        // Remove any existing sha256 hashes from script-src
        h.value = h.value.replace(/ ?'sha256-[^']+'/g, "");

        // Insert hashes into script-src directive
        h.value = h.value.replace(
          /(script-src\s[^;]*)/,
          `$1 ${hashes.join(" ")}`
        );
      }
    });
  }
});

fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2) + "\n");

console.log("\n✅ CSP hashes updated in vercel.json");
