# Сомнение и миграции

Два следующих навыка из уже проверенного MIT-источника `addyosmani/agent-skills` (коммит `e997ac5b9a74eab332d5e9793bb38a38c8cfdd74`). Они закрывают два разных долга аудита ai-os-new: расхождения между выводами и миграции схемы v5→v45.

## Состав

| Навык | Зачем |
| --- | --- |
| `doubt-driven-development` | Адверсариальная проверка неочевидных выводов в свежем контексте до передачи их следующему агенту. Полезно перед отправкой отчёта аудита кодинг-агенту. |
| `deprecation-and-migration` | Expand/contract миграции, снятие устаревших API и мёртвого кода. Соответствует долгам по схеме Dexie и дорожной карте. |

## Проверка

SkillEvaluator 1.0.1:

- `harness-check ./skills-doubt-migration-staging --harness opencode -v` — 2 из 2 загружаются, только информативное OC-RELOAD, выход 0.
- `validate --tiers 1 --checks schema,quality --min-score 70` — 2 из 2 прошли, оценки A 90.2 / A 90.2, выход 0.
- Оба навыка — чистый Markdown, без MCP, бинарников и ключей облачных сервисов.

## Источник и атрибуция

- Репозиторий: `addyosmani/agent-skills`, зафиксированный коммит `e997ac5b9a74eab332d5e9793bb38a38c8cfdd74`, лицензия MIT.
- В `doubt-driven-development` скопирован также файл `references/shared/orchestration-patterns.md`, потому что основной `SKILL.md` ссылается на этот точный путь.
- Атрибуция в DevKit: `skills/DOUBT-MIGRATION-ATTRIBUTION.md`.

## Что не ставилось

`source-driven-development` пересекается с мета-навыками и глубоким исследованием. Другие кандидаты либо дублируют уже установленные навыки, либо требуют дополнительных зависимостей и поэтому в этот набор не вошли.

## Связи

- [Каталог навыков и команд](skills-commands.md)
- [Навыки процесса](next3.md)
- [Укрепление кода](hardening-skills.md)
- [Производительность и API](perf-api-skills.md)
- [Тесты и CI](testing-ci.md)
