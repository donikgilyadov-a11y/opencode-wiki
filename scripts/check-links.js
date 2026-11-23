#!/usr/bin/env node
// Проверка локальных ссылок в Markdown вики. Только чтение, без внешних зависимостей.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SKIP = new Set([".git", "node_modules", "dist", "build", "coverage"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) out.push(full);
  }
  return out;
}

function existsTarget(base) {
  const candidates = [
    base,
    base + ".md",
    path.join(base, "README.md"),
    path.join(base, "index.md"),
  ];
  return candidates.some((p) => fs.existsSync(p) && fs.statSync(p).isFile());
}

const allMd = walk(ROOT);
let checked = 0;
let broken = 0;

for (const file of allMd) {
  // Инлайновый код — это примеры синтаксиса, а не реальные ссылки.
  const text = fs.readFileSync(file, "utf8").replace(/`[^`\n]*`/g, "");
  const dir = path.dirname(file);
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");

  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const raw = match[1].trim().split(/\s+/)[0];
    if (!raw || /^(https?:|mailto:|data:|#)/i.test(raw)) continue;
    const clean = raw.split("#")[0].split("?")[0];
    if (!clean) continue;
    checked++;
    const target = clean.startsWith("/")
      ? path.resolve(ROOT, clean.slice(1))
      : path.resolve(dir, clean);
    if (!existsTarget(target)) {
      broken++;
      console.log(`BROKEN ${rel} -> ${match[1]}`);
    }
  }

  for (const match of text.matchAll(/\[\[([^\]]+)\]\]/g)) {
    const name = match[1].split("|")[0].trim().toLowerCase();
    if (!name) continue;
    checked++;
    let found;
    if (name.includes("/") || name.startsWith(".")) {
      const base = path.resolve(dir, name);
      found = existsTarget(base);
    } else {
      found = allMd.some((f) => {
        const base = path.basename(f, ".md").toLowerCase();
        const relF = path.relative(ROOT, f).replace(/\\/g, "/").toLowerCase();
        return base === name || relF.includes(name);
      });
    }
    if (!found) {
      broken++;
      console.log(`BROKEN-WIKI ${rel} -> [[${match[1]}]]`);
    }
  }
}

console.log(`Проверено ссылок: ${checked}, битых: ${broken}`);
process.exitCode = broken ? 1 : 0;
