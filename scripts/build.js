const fs = require("node:fs");
const path = require("node:path");

const distDir = path.join(process.cwd(), "dist");
const requiredFiles = ["index.html", "styles.css", "app.js"];
const optionalPaths = ["assets", "docs"];

function copyPath(source, target) {
  const stat = fs.statSync(source);

  if (stat.isDirectory()) {
    fs.cpSync(source, target, { recursive: true });
    return;
  }

  fs.copyFileSync(source, target);
}

const missing = requiredFiles.filter((file) => !fs.existsSync(file));

if (missing.length) {
  console.error(`Missing required build files: ${missing.join(", ")}`);
  process.exit(1);
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

requiredFiles.forEach((file) => copyPath(file, path.join(distDir, file)));
optionalPaths
  .filter((filePath) => fs.existsSync(filePath))
  .forEach((filePath) => copyPath(filePath, path.join(distDir, filePath)));

fs.writeFileSync(path.join(distDir, ".nojekyll"), "");
console.log("Static build ready in dist/.");
