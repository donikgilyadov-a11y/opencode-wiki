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
как аргумент `--test`. Сейчас **29 тестов**, все проходят:

| Файл | Что проверяет |
| --- | --- |
| `scripts/tests/brain.test.js` | `brain.js save/find/tags/links/index` на временном мозге через `OPENCODE_BRAIN` |
| `scripts/tests/graph.test.mjs` | `collectFiles`, `buildProjectGraph/TreeGraph/MemoryGraph`, `renderMermaid`, `saveGraph` |
| `scripts/tests/audit.test.mjs` | `auditRepo`, `renderReport`, `saveReport`; секреты сохраняются только как `(значение скрыто)` |
| `scripts/tests/oc-check.test.js` | `readJsonc` (комментарии внутри URL, битый JSON), `count` |
| `scripts/tests/doctor.test.js` | `slug`, `parseFrontmatter`, `replaceTokens`, `writeText` с бэкапом, `skillFixes` на временных навыках |
| `scripts/tests/session-audit.test.js` | `parseLine`, `normalize`, `redact`, `analyze` (паттерны/циклы/CLI), `saveReport` без секретов |
| `scripts/tests/reaudit.test.js` | `redact`, `buildIndex`/`resolveFile`, статусы `evaluateCheck`, `diffBaseline`, `renderReport`/`saveReport` |

Для тестов `brain.js` научился читать `OPENCODE_BRAIN`, а `oc-check.js` экспортирует
вспомогательные функции и не запускает `main()` при импорте. `oc-doctor.js` экспортирует
`slug`, `parseFrontmatter`, `replaceTokens`, `skillFixes`, `writeText`, `backupFile`,
`buildActions` и `main`; каталог бэкапов можно переопределить через `OPENCODE_DOCTOR_BACKUP_ROOT`.
`session-audit.js` экспортирует `parseLine`, `redact`, `normalize`, `analyze`, `renderReport`,
`saveReport` и `RULES`; путь лога и мозга можно переопределить флагами `--log=` и `--brain=`.

Отдельно проверен режим применения авто-врача: при здоровой системе `--apply --json` не создаёт
действий и возвращает перепроверку `oc-check` `ok=true, total=20, failed=0`. Команды
`/oc-doctor` и `/oc-doctor-fix` зарегистрированы.

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

Для CI есть `npm run smoke:ci` (`node scripts/smoke-admin.js --ci`): скрипт сам поднимает
`admin/server.js` на отдельном порту с временными фикстурами, жёстко проверяет 6 локальных
эндпоинтов и пропускает `/api/data` и `/api/oc-check` — им нужны OpenCode CLI и сервис `:28894`.
Локальный прогон режима `--ci`: **6 OK + 2 SKIP**, exit 0.

## Проверка в браузере

Через Playwright открыта страница админки. Подтверждено:

- заголовок «OpenCode Admin — вторая админка», 5 якорей в шапке, блок `#overview`;
- детали плагинов загружаются;
- ошибок консоли **0**. Ранее был `404 /favicon.ico`; исправлено добавлением
  data-URI SVG-иконки в `admin/index.html` и `admin/graph.html`;
- кнопка «Проверка» показывает `Итог всё_ok / Проверок 20 / Все проверки пройдены`,
  полный отчёт — 1090 символов.

## GitHub Actions вики

- Скрипт: `scripts/check-links.js` (только чтение Markdown).
- Workflow `links.yml` закреплён на SHA `actions/checkout@v7` / `actions/setup-node@v7` (Node 22,
  `package-manager-cache: false`), затем `node scripts/check-links.js`.
- Проверяются относительные ссылки Markdown и вики-ссылки `[[...]]`. Внешние `http(s)`, `mailto:`,
  `data:` и якоря `#...` пропускаются; инлайновый код в backticks игнорируется.
- Локальный прогон: **248 ссылок, 0 битых**. Пути вики-ссылок (`[[../wiki/README]]`) разрешаются с сохранением регистра: на регистро-зависимом Linux приведение к нижнему регистру ломало поиск `README.md`, сейчас исправлено. Workflow срабатывает на `push`, `pull_request`
  и вручную (`workflow_dispatch`).

## CI/CD и деплой вики

- `.github/workflows/pages.yml`: `links` → `build` → `deploy`. Сборка делает `node scripts/build-site.js`
  (30 Markdown-страниц → `_site/`, 32 файла), загрузка артефакта и деплой через
  `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v5`.
  Все экшены закреплены по SHA; права `pages: write` и `id-token: write` нужны только job `deploy`.
- Сайт: https://donikgilyadov-a11y.github.io/opencode-wiki/ (GitHub Pages, `build_type: workflow`).
  Статический генератор выбран вместо Jekyll: в вики нет `index.md` и `_config.yml`.
- `.github/dependabot.yml` обновляет GitHub Actions раз в месяц одной группой PR.
- DevKit использует `.github/workflows/ci.yml` (`npm test` + `npm run smoke:ci`), `skills.yml` и
  ручной `release.yml` (semver, `VERSION`, `CHANGELOG.md`, тег `vX.Y.Z`, GitHub Release).
  Подробности — в [DevKit](devkit.md).

Локальная проверка перед пушем:

```powershell
npx.cmd --yes github-actionlint .github\workflows\*.yml
npx.cmd --yes js-yaml .github\workflows\pages.yml
node scripts\build-site.js
```

## Связи

См. [самопроверку](self-check.md), [админку](admin-panel.md), [проект opencode-boost](projects/opencode-boost.md).
