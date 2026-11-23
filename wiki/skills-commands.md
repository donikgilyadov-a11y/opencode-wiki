# Навыки и команды

## Глобальные навыки

Источник: `~/Desktop/opencode-boost/skills/`, подключён через `skills` в `opencode.jsonc`.
Все регистрируются автоматически; вызов — через инструмент `skill` или по описанию в сессии.

| Навык | Когда использовать |
| --- | --- |
| `second-brain` | «запомни», «сохрани в мозг», «что мы решали», «найди в памяти» |
| `opencode-tuner` | Любые изменения `~/.config/opencode/`, установка плагинов, проверка сервиса |
| `md-examples` | Создание AGENTS.md, SKILL.md, команд, агентов, opencode.jsonc |
| `admin-panel` | Работа с дашбордом `http://127.0.0.1:8787` |
| `graph` | Граф проекта, граф памяти, схема связей |
| `autopilot` | Многошаговые и межсессионные задачи. См. [автопилот](autonomy.md) |
| `computer-use` | Управление Windows и браузером. См. [computer use](computer-use.md) |
| `repo-audit` | Изучить чужой или большой репозиторий без изменений. См. [аудит](repo-audit.md) |
| `obsidian` | Работа с vault через Local REST API: читать, искать, писать и открывать заметки. См. [Obsidian](obsidian-integration.md) |
| `session-audit` | Разбор логов сессий: ошибки, циклы, перезапуски CLI. См. [аудит сессий](session-audit.md) |
| `react-expert` | React 18/19, Server Components, хуки, миграция с классов, состояние и производительность |
| `typescript-pro` | Продвинутые типы TypeScript, type guards, utility types, брендированные типы, tRPC |
| `react-best-practices` | 47 правил производительности React от Vercel (адаптация для Vite) |
| `deep-research-lite` | Быстрое многоисточниковое исследование через встроенные `websearch`/`webfetch` |

## Глобальные команды

Лежат в `~/.config/opencode/commands/`.

| Команда | Назначение |
| --- | --- |
| `/brain` | Работа с памятью |
| `/brain-digest` | Короткий дайджест дневника по темам; те же возможности дают `brain.js tags/links/digest` и инструменты `brain.tags/links` |
| `/oc-doctor` | Диагностика OpenCode: план безопасных исправлений |
| `/oc-doctor-fix` | Применить безопасные исправления с бэкапами. См. [самопроверку](self-check.md) |
| `/oc-audit` | Аудит конфигурации |
| `/md-new` | Новый MD-конфиг по шаблону |
| `/graph-memory` | Перестроить граф памяти |
| `/graph-project` | Граф структуры проекта |
| `/autopilot <цель>` | Поставить цель и начать долгую работу |
| `/goal <цель>` | Встроенная: продолжать до достижения цели (`pause|resume|clear`) |
| `/computer <задача>` | Диагностика и выполнение действия с GUI или браузером |
| `/oc-check` | Самопроверка сборки (20 проверок), отчёт в `brain/reports/`. См. [self-check](self-check.md) |
| `/repo-audit <путь>` | Read-only аудит репозитория, отчёт в `brain/reports/`. См. [аудит](repo-audit.md) |
| `/session-audit` | Read-only аудит логов сессий, отчёт в `brain/reports/`. См. [аудит сессий](session-audit.md) |

## От плагинов

Помимо локальных файлов, навыки и команды регистрируют плагины. Сейчас через API видно **24 навыка** и **36 команд** (включая встроенные).

- `opencode-v2-ponytail-scoped` добавляет 6 навыков и 6 команд: `/ponytail`, `/ponytail-review`, `/ponytail-audit`, `/ponytail-debt`, `/ponytail-gain`, `/ponytail-help`. По умолчанию выключен: `~/.config/opencode/ponytail-scoped.json` содержит `{"default":"off","agents":{}}`. См. [плагины](plugins.md).
- `@slkiser/opencode-quota` добавляет 4 команды: `/quota`, `/quota_usage [range]`, `/quota_status`, `/quota_settings`, плюс инструменты `quota_status`, `quota_settings_get/set`, `quota_provider_add/remove/test`.
- `envsitter-guard` добавляет 15 инструментов `envsitter_*` для безопасной работы с `.env` без вывода секретов.
- `cc-safety-net` добавляет команду `/cc-safety-net` и защитные хуки; `opencode-auto-resume` — `/auto-resume off|on|status`.
- `hffmnnj.deep-research` регистрирует навык `deep-research`, 12 инструментов `tools.research.*` (только Code Mode) и трёх read-only субагентов: `deep-research/researcher`, `deep-research/verifier`, `deep-research/librarian`. Библиотека исследований хранится в `~/.local/share/opencode-deep-research/library/`. См. [глубокое исследование](deep-research.md).

Итого собственных файлов: 14 навыков в `~/Desktop/opencode-boost/skills/` и 13 команд в `~/.config/opencode/commands/`.

## Глобальные агенты

- `brain-keeper` — subagent; edit запрещён везде, кроме `~/Desktop/opencode-boost/brain/**`; shell запрещён.
- `oc-admin` — subagent; read-only диагностика.
- `deep-research/researcher`, `deep-research/verifier`, `deep-research/librarian` — read-only субагенты плагина `hffmnnj.deep-research`. См. [глубокое исследование](deep-research.md).

## Инструкции

`INSTRUCTIONS.md` из `opencode-boost` подключён через поле `instructions` глобального конфига.
Он загружается в каждую сессию и содержит правила памяти, OpenCode, автопилота и стиля ответов.
