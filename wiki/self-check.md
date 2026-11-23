# Самопроверка OpenCode Boost

`scripts/oc-check.js` — нулевой зависимостей CLI, который проверяет состояние всей сборки.
Это «красная кнопка» перед долгой автономной работой и после изменений конфигурации.

## Что проверяется (20 проверок)

- Сервис OpenCode (`opencode api get /api/info`, версия).
- Активные сторонние плагины (`/api/plugin`, без встроенных).
- Конфиги: `opencode.jsonc`, `cli.json`, `opencode-notifier.json`, `dcp.jsonc` — существование и корректный JSONC.
- Подключённые `instructions` и `plugins` в глобальном конфиге.
- Количество навыков, команд, агентов и локальных плагинов.
- Файлы мозга (`MEMORY.md`, `LONG_TERM.md`, дневник), решения и графы.
- Админка: `/api/data` и `/api/graphs` на `127.0.0.1:8787`.
- Obsidian MCP-мост: порты 27125 (прокси) и 27123 (REST плагина) плюс ярлык автозапуска в Startup.
- Сканер посторонних символов в `.md/.js/.json/.html/.cmd` boost и вики.
- Последний коммит вики через `git.exe`.

## Запуск

```powershell
node "C:\Users\deda donik\Desktop\opencode-boost\scripts\oc-check.js"
```

Отчёт пишется в `~/Desktop/opencode-boost/brain/reports/oc-check-YYYY-MM-DD.md` и выводится в консоль.
Код выхода `0` — всё_ok, `1` — есть провальные проверки.

Для админки есть endpoint `GET /api/oc-check`: он запускает тот же скрипт с `--json` и возвращает
`{date, ok, total, failed, items}`. В дашборде за это отвечает кнопка **«Проверка»** и карточка
«Самопроверка». Также доступна глобальная команда `/oc-check`.

## Нюансы реализации

- Парсер JSONC — конечный автомат: комментарии `//` и `/* */` вырезаются только вне строк,
  поэтому URL вида `https://...` не ломаются; висячие запятые убираются.
- Плагины читаются из response `/api/plugin` → `data[]`, статус лежит в `state.status`.
- Папки (навыки, локальные плагины) считаются как directories, а не files.

Последний прогон 2026-11-23: `ok=true`, `total=19`, `failed=0`.

Ссылки: [админка](admin-panel.md) · [навыки и команды](skills-commands.md) · [проект](projects/opencode-boost.md)
