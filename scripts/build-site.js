#!/usr/bin/env node
// Сборка статического сайта из Markdown-вики без внешних зависимостей.
// Результат: _site/index.html и HTML-страницы с теми же относительными путями.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "_site");
const SKIP = new Set([".git", ".github", "scripts", "_site", "node_modules"]);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeHref(href) {
  let value = String(href || "").trim();
  value = value.replace(/\.md(?=#|$|\?)/i, ".html");
  if (/^(javascript|data):/i.test(value)) return "#";
  return value.replace(/"/g, "%22");
}

function inline(text) {
  let result = escapeHtml(text);
  const images = [];
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_all, alt, href) => {
    images.push(`<img src="${safeHref(href)}" alt="${alt}">`);
    return `\u0001${images.length - 1}\u0001`;
  });
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_all, label, href) =>
    `<a href="${safeHref(href)}">${label}</a>`);
  result = result.replace(/`([^`]+)`/g, "<code>$1</code>");
  result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/\[\[([^\]]+)\]\]/g, (_all, name) => escapeHtml(name));
  result = result.replace(/\u0001(\d+)\u0001/g, (_all, index) => images[Number(index)] || "");
  return result;
}

function markdownToHtml(source) {
  // Ссылки на .md внутри репозитория становятся ссылками на сгенерированные .html.
  const md = source
    .replace(/\r\n/g, "\n")
    .replace(/\]\(([^)]+)\)/g, (_all, href) => `](${safeHref(href)})`);
  const lines = md.split("\n");
  const out = [];
  let i = 0;
  let paragraph = [];

  const flush = () => {
    if (!paragraph.length) return;
    out.push(`<p>${paragraph.map(inline).join("<br>")}</p>`);
    paragraph = [];
  };

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*```/.test(line)) {
      flush();
      i += 1;
      const code = [];
      while (i < lines.length && !/^\s*```/.test(lines[i])) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1;
      out.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    if (/^\s*$/.test(line)) {
      flush();
      i += 1;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flush();
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }

    if (/^\s*([-*+])\s+/.test(line)) {
      flush();
      const items = [];
      while (i < lines.length && /^\s*([-*+])\s+/.test(lines[i])) {
        items.push(inline(lines[i].replace(/^\s*([-*+])\s+/, "")));
        i += 1;
      }
      out.push(`<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      flush();
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(inline(lines[i].replace(/^\s*\d+\.\s+/, "")));
        i += 1;
      }
      out.push(`<ol>${items.map((item) => `<li>${item}</li>`).join("")}</ol>`);
      continue;
    }

    if (/^\s*\|/.test(line)) {
      flush();
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        rows.push(lines[i]);
        i += 1;
      }
      const cells = (row) => row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
      const body = rows.filter((row) => !/^\s*\|[\s:|-]+\|\s*$/.test(row));
      if (body.length) {
        const head = `<tr>${cells(body[0]).map((c) => `<th>${inline(c)}</th>`).join("")}</tr>`;
        const rest = body.slice(1).map((row) => `<tr>${cells(row).map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`);
        out.push(`<table>${head}${rest.join("")}</table>`);
      }
      continue;
    }

    if (/^>\s?/.test(line)) {
      flush();
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      out.push(`<blockquote>${quote.map(inline).join("<br>")}</blockquote>`);
      continue;
    }

    if (/^\s*---+\s*$/.test(line)) {
      flush();
      out.push("<hr>");
      i += 1;
      continue;
    }

    paragraph.push(line);
    i += 1;
  }
  flush();
  return out.join("\n");
}

function collect(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collect(full, acc);
    else if (entry.name.toLowerCase().endsWith(".md")) acc.push(full);
  }
  return acc;
}

function titleOf(source, fallback) {
  const match = source.match(/^#\s+(.+)$/m);
  return inline(match ? match[1] : fallback);
}

const STYLE = `
:root{color-scheme:dark}body{margin:0;background:#0d1117;color:#e6edf3;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
header,main{max-width:960px;margin:0 auto;padding:24px}header{border-bottom:1px solid #30363d;margin-bottom:24px}
a{color:#58a6ff;text-decoration:none}a:hover{text-decoration:underline}h1,h2,h3{line-height:1.25}
pre{background:#161b22;border:1px solid #30363d;border-radius:8px;padding:12px;overflow:auto}
code{background:#161b22;border-radius:4px;padding:2px 5px}pre code{background:none;padding:0}
table{border-collapse:collapse;width:100%;margin:12px 0}th,td{border:1px solid #30363d;padding:6px 10px;text-align:left}
blockquote{border-left:3px solid #58a6ff;margin:12px 0;padding-left:12px;color:#b1bac4}
ul,ol{padding-left:24px}.groups{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
.group{background:#161b22;border:1px solid #30363d;border-radius:8px;padding:12px 16px}
.group h2{margin-top:0}.group ul{margin-bottom:0}footer{border-top:1px solid #30363d;margin-top:32px;color:#8b949e;font-size:14px}
`;

function shell(title, body, prefix) {
  return `<!doctype html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${title}</title>\n<style>${STYLE}</style>\n</head>\n<body>\n<header><a href="${prefix}index.html">opencode-wiki</a> · ${title}</header>\n<main>${body}</main>\n<footer>Сгенерировано из Markdown-источников репозитория opencode-wiki.</footer>\n</body>\n</html>\n`;
}

function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

  const files = collect(ROOT);
  const pages = [];
  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    const relative = path.relative(ROOT, file).replace(/\\/g, "/");
    const outRelative = relative.replace(/\.md$/i, ".html");
    const outPath = path.join(OUT, outRelative);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const name = path.basename(file, path.extname(file));
    const title = titleOf(source, name);
    const prefix = "../".repeat(outRelative.split("/").length - 1);
    const body = markdownToHtml(source);
    fs.writeFileSync(outPath, shell(title, body, prefix));
    pages.push({ title, href: outRelative, group: relative.split("/")[0] || "root" });
  }

  const groups = new Map();
  for (const page of pages) {
    if (!groups.has(page.group)) groups.set(page.group, []);
    groups.get(page.group).push(page);
  }
  const blocks = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([name, items]) => {
    const links = items
      .sort((a, b) => a.href.localeCompare(b.href))
      .map((item) => `<li><a href="${item.href}">${item.title}</a></li>`)
      .join("");
    return `<section class="group"><h2>${escapeHtml(name)}</h2><ul>${links}</ul></section>`;
  });
  const index = shell("Оглавление", `<h1>opencode-wiki</h1><p>Документация и журнал проектов OpenCode Boost.</p><div class="groups">${blocks.join("")}</div>`, "");
  fs.writeFileSync(path.join(OUT, "index.html"), index);
  console.log(`Собрано страниц: ${pages.length};_OUTPUT=${OUT}`);
}

main();
