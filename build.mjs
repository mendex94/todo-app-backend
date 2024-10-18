// build.mjs
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Run tsup
execSync("tsup", { stdio: "inherit" });

// Copy HTML file
const src = path.join(__dirname, "index.html");
const dest = path.join(__dirname, "dist", "public", "index.html");

fs.copyFileSync(src, dest);

console.log("Build complete, HTML file copied.");
