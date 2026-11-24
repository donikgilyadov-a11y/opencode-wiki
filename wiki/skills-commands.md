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
| `repository-analysis` | Первый взгляд на незнакомый репозиторий: обзор, архитектура, структура, риски. См. [анализ кода](code-analysis.md) |
| `exploring-code` | Тщательный онбординг: документация → структура → тесты → исходники → интеграции. См. [анализ кода](code-analysis.md) |
| `analyzing-projects` | Пятислойный разбор: скан, зависимости, архитектура, потоки, качество. См. [анализ кода](code-analysis.md) |
| `code-explorer` | Как работает конкретная фича: трассировка путей и абстракций. См. [анализ кода](code-analysis.md) |
| `opencode-skill-creation` | Создать навык по конвенциям OpenCode V2. См. [мета-навыки](meta-skills.md) |
| `skill-doc-authoring` | Превратить SOP в короткий `SKILL.md` с надёжным описанием-триггером. См. [мета-навыки](meta-skills.md) |
| `skill-creator` | Установить, обновить, удалить и диагностировать навыки. См. [мета-навыки](meta-skills.md) |
| `reaudit` | Повторно проверить ai-os-new после исправлений, сравнить с базой 24 проверок. См. [повторный аудит](reaudit.md) |
| `systematic-debugging` | Отладка по шагам: сначала причина, потом фикс. См. [стартовый набор](starter6.md) |
| `test-driven-development` | Тест перед реализацией, затем минимальный код. См. [стартовый набор](starter6.md) |
| `git-commits-prs` | Коммиты, PR и проверки перед отправкой. См. [стартовый набор](starter6.md) |
| `code-reviewer` | Структурное ревью кода с приоритетом по риску. См. [стартовый набор](starter6.md) |
| `brainstorming` | Превратить расплывчатую идею в проверенный дизайн. См. [стартовый набор](starter6.md) |
| `caveman` | Короткий стиль ответа без потери технических фактов. См. [стартовый набор](starter6.md) |
| `verification-before-completion` | Никаких «готово» без свежего вывода проверки. См. [навыки процесса](next3.md) |
| `dispatching-parallel-agents` | Независимые задачи — отдельным субагентам. См. [навыки процесса](next3.md) |
| `receiving-code-review` | Техническая оценка ревью вместо слепого согласия. См. [навыки процесса](next3.md) |
| `reviewing-security` | Безопасность: путь от атакующего к последствию, авторизация, SSRF, секреты. См. [укрепление кода](hardening-skills.md) |
| `memory-leaks` | Утечки памяти: слушатели, таймеры, бесконечно растущие коллекции. См. [укрепление кода](hardening-skills.md) |
| `backpressure` | Ограничение очередей и producer-consumer без бесконечного буфера. См. [укрепление кода](hardening-skills.md) |
| `race-conditions` | Гонки: read-modify-write, check-then-act, переходы состояний. См. [укрепление кода](hardening-skills.md) |
| `error-handling` | Продуманные пути ошибок и аккуратная деградация. См. [укрепление кода](hardening-skills.md) |
| `observability-instrumentation` | Логи, метрики, трейсы и алерты. См. [укрепление кода](hardening-skills.md) |
| `performance-optimization` | Измерения до оптимизации, N+1, пакетные запросы, кэш-ключи. См. [производительность и API](perf-api-skills.md) |
| `api-and-interface-design` | Контракты, валидация на границе, идемпотентность, TOCTOU. См. [производительность и API](perf-api-skills.md) |
| `doubt-driven-development` | Адверсариальная проверка неочевидных выводов перед передачей дальше. См. [сомнение и миграции](doubt-migration-skills.md) |
| `deprecation-and-migration` | Expand/contract миграции, устаревшие API и мёртвый код. См. [сомнение и миграции](doubt-migration-skills.md) |
| `frontend-ui-engineering` | Композиция, токены, адаптивность и WCAG 2.1 AA. См. [дизайн и UI/UX](ui-design-skills.md) |
| `accessibility-engineering` | Аудит WCAG 2.2 AA и исправление нарушений. См. [дизайн и UI/UX](ui-design-skills.md) |
| `web-design-guidelines` | 100+ правил Vercel по интерфейсам. См. [дизайн и UI/UX](ui-design-skills.md) |
| `vercel-composition-patterns` | Композиция React и особенности React 19. См. [дизайн и UI/UX](ui-design-skills.md) |
| `ai-agent-evaluation` | Регрессионные наборы и метрики качества LLM/агентов. См. [новую волну](nextwave-skills.md) |
| `flaky-test-management` | Карантин и искоренение флейковых тестов. См. [новую волну](nextwave-skills.md) |
| `property-based-testing` | Свойства и инварианты вместо отдельных примеров. См. [новую волну](nextwave-skills.md) |
| `shipping-and-launch` | Релиз, canary, откат и feature flags. См. [новую волну](nextwave-skills.md) |
| `incident-response` | SEV1-4, коммуникации и postmortem. См. [новую волну](nextwave-skills.md) |
| `codebase-onboarding-check` | Проверка понимания кода и doc→code drift. См. [новую волну](nextwave-skills.md) |
| `tech-writing` | Читательская документация и сообщения об ошибках. См. [новую волну](nextwave-skills.md) |

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
| `/reaudit <папка>` | Повторный read-only аудит 24 проверок с diff против базовой линии. См. [повторный аудит](reaudit.md) |

## От плагинов

Помимо локальных файлов, навыки и команды регистрируют плагины. Сейчас через API видно **62 навыка** и **37 команд** (включая встроенные).

- `opencode-v2-ponytail-scoped` добавляет 6 навыков и 6 команд: `/ponytail`, `/ponytail-review`, `/ponytail-audit`, `/ponytail-debt`, `/ponytail-gain`, `/ponytail-help`. По умолчанию выключен: `~/.config/opencode/ponytail-scoped.json` содержит `{"default":"off","agents":{}}`. См. [плагины](plugins.md).
- `@slkiser/opencode-quota` добавляет 4 команды: `/quota`, `/quota_usage [range]`, `/quota_status`, `/quota_settings`, плюс инструменты `quota_status`, `quota_settings_get/set`, `quota_provider_add/remove/test`.
- `envsitter-guard` добавляет 15 инструментов `envsitter_*` для безопасной работы с `.env` без вывода секретов.
- `cc-safety-net` добавляет команду `/cc-safety-net` и защитные хуки; `opencode-auto-resume` — `/auto-resume off|on|status`.
- `hffmnnj.deep-research` регистрирует навык `deep-research`, 12 инструментов `tools.research.*` (только Code Mode) и трёх read-only субагентов: `deep-research/researcher`, `deep-research/verifier`, `deep-research/librarian`. Библиотека исследований хранится в `~/.local/share/opencode-deep-research/library/`. См. [глубокое исследование](deep-research.md).

Итого собственных файлов: 52 навыка в `~/Desktop/opencode-boost/skills/` и 14 команд в `~/.config/opencode/commands/`. См. [мета-навыки](meta-skills.md), [стартовый набор](starter6.md), [навыки процесса](next3.md), [укрепление кода](hardening-skills.md), [производительность и API](perf-api-skills.md), [дизайн и UI/UX](ui-design-skills.md) и [новую волну](nextwave-skills.md).

## Глобальные агенты

- `brain-keeper` — subagent; edit запрещён везде, кроме `~/Desktop/opencode-boost/brain/**`; shell запрещён.
- `oc-admin` — subagent; read-only диагностика.
- `deep-research/researcher`, `deep-research/verifier`, `deep-research/librarian` — read-only субагенты плагина `hffmnnj.deep-research`. См. [глубокое исследование](deep-research.md).

## Инструкции

`INSTRUCTIONS.md` из `opencode-boost` подключён через поле `instructions` глобального конфига.
Он загружается в каждую сессию и содержит правила памяти, OpenCode, автопилота и стиля ответов.
