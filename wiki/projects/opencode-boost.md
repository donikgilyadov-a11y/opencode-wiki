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
| `skills/` | 52 навыка: `second-brain`, `opencode-tuner`, `md-examples`, `admin-panel`, `graph`, `autopilot`, `computer-use`, `repo-audit`, `obsidian`, `session-audit`, `react-expert`, `typescript-pro`, `react-best-practices`, `deep-research-lite`, `repository-analysis`, `exploring-code`, `analyzing-projects`, `code-explorer`, `opencode-skill-creation`, `skill-doc-authoring`, `skill-creator`, `reaudit`, `systematic-debugging`, `test-driven-development`, `git-commits-prs`, `code-reviewer`, `brainstorming`, `caveman`, `verification-before-completion`, `dispatching-parallel-agents`, `receiving-code-review`, `reviewing-security`, `memory-leaks`, `backpressure`, `race-conditions`, `error-handling`, `observability-instrumentation`, `performance-optimization`, `api-and-interface-design`, `doubt-driven-development`, `deprecation-and-migration`, `frontend-ui-engineering`, `accessibility-engineering`, `web-design-guidelines`, `vercel-composition-patterns`, `ai-agent-evaluation`, `flaky-test-management`, `property-based-testing`, `shipping-and-launch`, `incident-response`, `codebase-onboarding-check`, `tech-writing` |
| `admin/` | Локальная админка на `127.0.0.1:8787`: `server.js`, `index.html`, `graph.html`, `start.cmd` |
| `md-examples/` | Рабочие шаблоны: `AGENTS.md`, `SKILL.md`, `review.md`, `reviewer.md`, `opencode.jsonc` |
| `scripts/` | CLI `brain.js`, `graph.js`, `oc-check.js`, `oc-doctor.js`, `repo-audit.js`, `session-audit.js`, `reaudit.js`, `smoke-admin.js`, ядра `graph-core.mjs`, `audit-core.mjs`, юнит-тесты в `scripts/tests/`, `package.json` |

## Глобальная интеграция

- `~/.config/opencode/opencode.jsonc`: `instructions`, `skills`, `references.brain`, `permissions`, `plugins`.
- Команды: `brain`, `oc-doctor`, `oc-doctor-fix`, `oc-audit`, `md-new`, `graph-memory`, `graph-project`, `autopilot`, `brain-digest`, `session-audit`, `reaudit`.
- Агенты: `brain-keeper` (только запись в `brain/**`), `oc-admin` (только чтение диагностики).
- Локальные плагины: `brain-tools`, `graph-tools`, `autopilot-tools`, `computer-tools`, `audit-tools`, `session-audit-tools`; пакеты: `opencode-dcp`, `opencode-notifier`, `auto-resume`, `cc-safety-net`, `envsitter-guard`, `opencode-quota`, `ponytail-scoped`, `hffmnnj.deep-research`.

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

- Сервис OpenCode v2.4.1 на `127.0.0.1:28894`, `/api/info` отвечает.
- Все четырнадцать плагинов активны в `/api/plugin`.
- Админка `/api/data` и `/api/graphs` — HTTP 200; `/graph.html` рисует Mermaid SVG.
- Граф памяти: 60 узлов, 105 связей.
- Сканер посторонних символов: `SUSPECT_LINES=0`.
- Юнит-тесты: 29/29; дымовая проверка админки: 8/8; проверка ссылок вики: 305/0; самопроверка: 20/20.
  См. [тесты и CI](../testing-ci.md).

## Ссылки

- [Второй мозг](../second-brain.md) · [Админка](../admin-panel.md) · [Автопилот](../autonomy.md) · [Тесты и CI](../testing-ci.md) · [Аудит сессий](../session-audit.md) · [Мета-навыки](../meta-skills.md) · [Стартовый набор](../starter6.md) · [Навыки процесса](../next3.md) · [Дизайн и UI/UX](../ui-design-skills.md) · [Новая волна навыков](../nextwave-skills.md) · [Повторный аудит](../reaudit.md)
- [Решение 0001](../../decisions/0001-opencode-boost.md) · [Журнал](../../journal/2026-11-23.md)
