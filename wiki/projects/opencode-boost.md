# Проект: opencode-boost

- Статус: в работе, базовая версия готова и проверена
- Дата начала: 2026-11-23
- Локальный путь: `C:\Users\deda donik\Desktop\opencode-boost\`
- GitHub-вики: [opencode-wiki](https://github.com/donikgilyadov-a11y/opencode-wiki)

## Цель

Улучшить OpenCode на этом компьютере: второй мозг, набор навыков и команд, вторая админка,
графы структуры, примеры рабочих Markdown-конфигов и поддержка долгой автономной работы.

## Состав

| Папка | Назначение |
| --- | --- |
| `brain/` | Второй мозг: индекс, долгосрочные факты, дневник, знания, ADR, карточки проектов, графы, состояние автопилота |
| `skills/` | Навыки: `second-brain`, `opencode-tuner`, `md-examples`, `admin-panel`, `graph`, `autopilot`, `computer-use`, `repo-audit`, `obsidian` |
| `admin/` | Локальная админка на `127.0.0.1:8787`: `server.js`, `index.html`, `graph.html`, `start.cmd` |
| `md-examples/` | Рабочие шаблоны: `AGENTS.md`, `SKILL.md`, `review.md`, `reviewer.md`, `opencode.jsonc` |
| `scripts/` | CLI `brain.js`, `graph.js`, `oc-check.js`, `repo-audit.js`, `smoke-admin.js`, ядра `graph-core.mjs`, `audit-core.mjs`, юнит-тесты в `scripts/tests/`, `package.json` |

## Глобальная интеграция

- `~/.config/opencode/opencode.jsonc`: `instructions`, `skills`, `references.brain`, `permissions`, `plugins`.
- Команды: `brain`, `oc-doctor`, `oc-audit`, `md-new`, `graph-memory`, `graph-project`, `autopilot`.
- Агенты: `brain-keeper` (только запись в `brain/**`), `oc-admin` (только чтение диагностики).
- Плагины: `brain-tools`, `graph-tools`, `autopilot-tools`, `opencode-dcp`.

## Как запускать

```powershell
# админка
C:\Users\deda donik\Desktop\opencode-boost\admin\start.cmd
# или
node "C:\Users\deda donik\Desktop\opencode-boost\admin\server.js"

# граф памяти
node "C:\Users\deda donik\Desktop\opencode-boost\scripts\graph.js" memory
```

## Проверено

- Сервис OpenCode v2.3.2 на `127.0.0.1:28894`, `/api/info` отвечает.
- Все четыре плагина активны в `/api/plugin`.
- Админка `/api/data` и `/api/graphs` — HTTP 200; `/graph.html` рисует Mermaid SVG.
- Граф памяти: 15 узлов, 41 связь.
- Сканер посторонних символов: `SUSPECT_LINES=0`.
- Юнит-тесты: 13/13; дымовая проверка админки: 8/8; проверка ссылок вики: 97/0; самопроверка: 20/20.
  См. [тесты и CI](../testing-ci.md).

## Ссылки

- [Второй мозг](../second-brain.md) · [Админка](../admin-panel.md) · [Автопилот](../autonomy.md) · [Тесты и CI](../testing-ci.md)
- [Решение 0001](../../decisions/0001-opencode-boost.md) · [Журнал](../../journal/2026-11-23.md)
