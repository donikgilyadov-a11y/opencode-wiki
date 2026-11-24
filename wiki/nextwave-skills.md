# Новая волна навыков

Семь навыков добавлены после глубокого исследования `rr_mwv9k41`. Три исследователя и три верификатора проверили источники, лицензии, зафиксированные коммиты и отсутствие бинарников, MCP, облачных ключей и записи в проверяемый проект. Главный критерий отбора — непересечение с уже установленными 45 навыками и польза для читаемого аудита ai-os-new.

## Состав

| Навык | Назначение | Источник | Лицензия |
| --- | --- | --- | --- |
| `ai-agent-evaluation` | Регрессионные наборы для LLM/агентов, pass@k, ручные метки, LLM-as-judge, promptfoo/DeepEval | `mejbaurbahar/software-tester-skills` `e3ee5dba8ca7cc1aef7bd4ed38e60b374b831002` | MIT |
| `flaky-test-management` | Обнаружение и карантин флейковых тестов, частота падений, SLA 7 дней, 50 последовательных проходов | тот же репозиторий | MIT |
| `property-based-testing` | Свойства и инварианты вместо отдельных примеров, Hypothesis/fast-check, shrinking | тот же репозиторий | MIT |
| `shipping-and-launch` | Чек-лист релиза, canary, откат, feature flags, error-budget gate | `addyosmani/agent-skills` `e997ac5b9a74eab332d5e9793bb38a38c8cfdd74` | MIT |
| `incident-response` | SEV1-4, роли, коммуникации и blameless postmortem | `anthropics/knowledge-work-plugins` `5e504ae11498f2b8daa30d86b7dab97b2ecd8092` | Apache-2.0 |
| `codebase-onboarding-check` | Онбординг: проверка понимания архитектуры, doc→code drift, вопросы с ответами, возобновляемое состояние | `Agent-Hellboy/codebase-onboarding-check` `0eb510880dc39324c4bc575a289a45ed9b9b3c46` | MIT |
| `tech-writing` | Читательский стандарт для README, ADR, документации и сообщений об ошибках | `peizh/tech-writing` `130108dfc9f640727a3b70e0d6ee730fa5a32ff6` | MIT + NOTICE |

## Почему именно они

- ai-os-new имеет большой LLM/debate-стек и ~694 теста — eval, флейковые тесты и property-based testing закрывают разные уровни качества.
- В роадмапе есть релизный цикл; `shipping-and-launch` дополняет [git-навыки](starter6.md) и [DevKit](devkit.md) выкатом и откатом.
- Аудиты передаются кодинг-агенту на втором ПК; `codebase-onboarding-check` и `tech-writing` помогают передать контекст и зафиксировать понимание.

## Проверка

`harness-check ./skills-nextwave-staging --harness opencode -v` — 7 из 7 загружаются, только advisory `OC-RELOAD`.

`validate ./skills-nextwave-staging --profile default --tiers 1 --checks schema,quality -c -r json,markdown -o reports/nextwave --min-score 70` — 7 из 7 прошли: ai-agent-evaluation A 92.0, flaky-test-management A 92.0, property-based-testing A 92.0, shipping-and-launch A 90.2, incident-response B 84.8, codebase-onboarding-check B 89.0, tech-writing B 87.2. Оба вызова завершились с кодом 0.

Адаптации: у `incident-response` удалены `argument-hint`, ссылка на внешний `CONNECTORS.md` и литерал `$ARGUMENTS`, заголовок приведён к `# Incident Response`; у `tech-writing` не скопирован справочник по китайской прозе и вычищены все упоминания о нём. `codebase-onboarding-check` пишет состояние в `%USERPROFILE%\.local\state\codebase-onboarding-check\state.jsonl` (fallback — `memory/state.jsonl` рядом с навыком) — это не проект ai-os-new.

## Не выбрано

`prompt-eval-and-regression` — неясная лицензия GitHub API и bundle-attribution; `deploy-checklist` — подмножество `shipping-and-launch`; `postmortem-writing` и `sre-runbook-author` — пересекаются с `incident-response`; `mutation-testing`, `contract-testing`, `integration-testing`, `performance-testing`, `test-data-engineering`, `llm-testing` — пересекаются с уже установленными навыками или с отобранной тройкой. Кандидаты с облачными CLI, скриптами и записью в проект отклонены.

См. также [SkillEvaluator](skillevaluator.md), [навыки и команды](skills-commands.md), [укрепление кода](hardening-skills.md), [дизайн и UI/UX](ui-design-skills.md), [повторный аудит](reaudit.md).
