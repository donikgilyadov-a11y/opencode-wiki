# Упорядочивание навыков

Локальный каталог OpenCode вырос до 57 навыков. Чтобы они не конфликтовали и не терялись, заведены индекс, триггеры, линтер и админ-карта. Решение зафиксировано в [ADR 0005](../decisions/0005-skill-curation.md).

## Состав

| Файл | Назначение |
| --- | --- |
| `skills/INDEX.md` | Группировка всех навыков по назначению и приоритетам |
| `skills/TRIGGERS.md` | Когда выбирать навык и какому уступать при пересечении |
| `scripts/skill-lint.js` | Проверка frontmatter, kebab-case, H1, `$ARGUMENTS`, посторонних символов, дублей описаний и атрибуции |
| `npm run skill:lint` | Быстрая проверка каталога; в boost и DevKit результат `skills=57 errors=0 warnings=0` |
| `/api/skills` | Возвращает счётчики линтера и наличие INDEX/TRIGGERS |
| Карточка «Навыки (линтер)» | Отображает счётчики во второй админке на 8787 |

## Проверки

Smoke админки проверяет `/api/skills` в обычном режиме (57 навыков) и в CI с фикстурой (1 демо-навык). Smoke: `9/9` локально и `7 OK + 2 SKIP` в CI.

## Правила

1. Новый навык сначала проходит SkillEvaluator (`harness-check --harness opencode`, `validate --tiers 1 --checks schema,quality --min-score 70`).
2. Затем добавляется в `INDEX.md` и `TRIGGERS.md`.
3. Перед пушем выполняются `npm run skill:lint`, `npm test`, `npm run smoke`, `npm run smoke:ci` и `oc-check`.
4. Внешние навыки сохраняют атрибуцию в `skills/`; локальные — записку о происхождении.

Связанные страницы: [навыки и команды](skills-commands.md), [SkillEvaluator](skillevaluator.md), [админка](admin-panel.md), [тесты и CI](testing-ci.md).
