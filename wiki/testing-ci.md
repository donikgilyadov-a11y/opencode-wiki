# Тесты и CI

Локальные проверки `opencode-boost` и автоматическая проверка ссылок этой вики.
Никаких внешних зависимостей: только Node.js 22+ и встроенный `node:test`.

## Юнит-тесты

Команда из `~/Desktop/opencode-boost`:

```powershell
npm test
# или
node --test scripts/tests/*.test.js scripts/tests/*.test.mjs
```

`package.json` содержит именно glob-форму: Node 24 не принимает каталог `scripts/tests`
как аргумент `--test`. Сейчас **13 тестов**, все проходят:

| Файл | Что проверяет |
| --- | --- |
| `scripts/tests/brain.test.js` | `brain.js save/find/tags/links/index` на временном мозге через `OPENCODE_BRAIN` |
| `scripts/tests/graph.test.mjs` | `collectFiles`, `buildProjectGraph/TreeGraph/MemoryGraph`, `renderMermaid`, `saveGraph` |
| `scripts/tests/audit.test.mjs` | `auditRepo`, `renderReport`, `saveReport`; секреты сохраняются только как `(значение скрыто)` |
| `scripts/tests/oc-check.test.js` | `readJsonc` (комментарии внутри URL, битый JSON), `count` |

Для тестов `brain.js` научился читать `OPENCODE_BRAIN`, а `oc-check.js` экспортирует
вспомогательные функции и не запускает `main()` при импорте.

## Дымовая проверка админки

```powershell
npm run smoke
# или
node scripts/smoke-admin.js
```

Скрипт делает только GET-запросы к `http://127.0.0.1:8787` (адрес меняется через `ADMIN_URL`):
`/`, `/api/data`, `/api/graphs`, `/api/logs?lines=5`, `/api/brain`, `/api/quota`, `/api/obsidian`, `/api/oc-check`.
Последний прогон: **8/8 OK**, `/api/graphs` отдаёт 3 графа, `/api/brain` — 15 MD-файлов,
`/api/oc-check` — `ok=true`.

## Проверка в браузере

Через Playwright открыта страница админки. Подтверждено:

- заголовок «OpenCode Admin — вторая админка», 5 якорей в шапке, блок `#overview`;
- детали плагинов загружаются;
- ошибок консоли **0**. Ранее был `404 /favicon.ico`; исправлено добавлением
  data-URI SVG-иконки в `admin/index.html` и `admin/graph.html`;
- кнопка «Проверка» показывает `Итог всё_ok / Проверок 19 / Все проверки пройдены`,
  полный отчёт — 1090 символов.

## GitHub Actions вики

- Скрипт: `scripts/check-links.js` (только чтение Markdown).
- Workflow: `.github/workflows/links.yml` — `actions/checkout@v4`, `actions/setup-node@v4` (Node 22),
  затем `node scripts/check-links.js`.
- Проверяются относительные ссылки Markdown и вики-ссылки `[[...]]`. Внешние `http(s)`, `mailto:`,
  `data:` и якоря `#...` пропускаются; инлайновый код в backticks игнорируется.
- Локальный прогон: **79 ссылок, 0 битых**. Workflow срабатывает на `push`, `pull_request`
  и вручную (`workflow_dispatch`).

## Связи

См. [самопроверку](self-check.md), [админку](admin-panel.md), [проект opencode-boost](projects/opencode-boost.md).
