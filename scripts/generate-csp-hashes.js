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
        // Insert hashes into script-src directive
        h.value = h.value.replace(
          /(script-src\s[^;]*)/,
          `$1 ${hashes.join(" ")}`
        );

        // Helper to safely append to a directive
        const appendDirective = (directive, value) => {
          if (!h.value.includes(value)) {
            const regex = new RegExp(`(${directive}\\s[^;]*)`);
            if (regex.test(h.value)) {
              h.value = h.value.replace(regex, `$1 ${value}`);
            } else {
              // If directive doesn't exist at all, add it to the end
              h.value = h.value.trim();
              if (!h.value.endsWith(";")) h.value += ";";
              h.value += ` ${directive} 'self' ${value};`;
            }
          }
        };

        // Add perplexity to font-src
        appendDirective("font-src", "https://r2cdn.perplexity.ai");

        // Add Tawk.to domains required for the widget and WebSockets
        appendDirective("default-src", "wss://*.tawk.to");
        appendDirective("connect-src", "wss://*.tawk.to https://*.tawk.to");
        appendDirective("script-src", "https://*.tawk.to");
        appendDirective("style-src", "https://*.tawk.to");
        appendDirective("font-src", "https://*.tawk.to");
        appendDirective("frame-src", "https://*.tawk.to");
        appendDirective("img-src", "https://*.tawk.to");

        // Append object-src and base-uri if they don't exist
        if (!h.value.includes("object-src")) {
          h.value = h.value.trim();
          if (!h.value.endsWith(";")) h.value += ";";
          h.value += " object-src 'none'; base-uri 'self';";
        }
        
        // Remove duplicate base-uri 'self' if it appears more than once
        const baseUriMatches = h.value.match(/base-uri 'self'/g);
        if (baseUriMatches && baseUriMatches.length > 1) {
          h.value = h.value.replace(/;\s*base-uri 'self'/, "");
        }
      }
    });
  }
});

fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2) + "\n");

console.log("\n✅ CSP hashes updated in vercel.json");
