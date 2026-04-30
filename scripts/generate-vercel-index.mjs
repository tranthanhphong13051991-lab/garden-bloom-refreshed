// Reads dist/client/.vite/manifest.json and generates dist/client/index.html
// so Vercel can serve the TanStack Start app as a SPA.
import { readFileSync, writeFileSync, existsSync } from "fs";

const manifestPath = "dist/client/.vite/manifest.json";
if (!existsSync(manifestPath)) {
  console.error("Vite manifest not found at", manifestPath);
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));

let entryJs = null;
const entryCss = new Set();

for (const value of Object.values(manifest)) {
  if (value.isEntry) {
    entryJs = value.file;
    if (value.css) value.css.forEach((f) => entryCss.add(f));
  }
  // Collect all CSS files from any chunk
  if (value.file?.endsWith(".css")) entryCss.add(value.file);
}

// If no entry found, pick the largest JS file (likely the vendor bundle)
if (!entryJs) {
  let maxSize = 0;
  for (const [key, value] of Object.entries(manifest)) {
    const size = value.file ? value.file.length : 0;
    if (value.file?.endsWith(".js") && size > maxSize) {
      maxSize = size;
      entryJs = value.file;
    }
  }
}

const cssLinks = [...entryCss]
  .map((f) => `  <link rel="stylesheet" href="/${f}" />`)
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Hoa Tươi Thanh Ngọc — Tiệm Hoa Bình Thạnh, TP.HCM</title>
${cssLinks}
</head>
<body>
  ${entryJs ? `<script type="module" src="/${entryJs}"></script>` : ""}
</body>
</html>
`;

writeFileSync("dist/client/index.html", html);
console.log("✓ Generated dist/client/index.html");
console.log("  CSS:", [...entryCss]);
console.log("  JS entry:", entryJs);
