# Стартовый набор навыков

Шесть навыков для повседневного цикла разработки. Установлены только после проверки SkillEvaluator; исходники зафиксированы по коммитам.

| Навык | Назначение | Оценка |
| --- | --- | --- |
| `systematic-debugging` | Сначала найти причину, потом править; не гадать | A 92.8 |
| `test-driven-development` | Тест перед реализацией, затем минимальный код | A 92.8 |
| `git-commits-prs` | Коммиты, PR и проверки готовности | B 88.8 |
| `code-reviewer` | Структурное ревью с приоритетом по риску | B 86.2 |
| `brainstorming` | Превратить идею в проверенный дизайн | A 92.2 |
| `caveman` | Короткий ответ без потери технических фактов | A 90.2 |

## Проверка

`C:\Users\deda donik\.local\bin\skillevaluator.exe` v1.0.1:

- `harness-check ./skills-starter6-staging --harness opencode -v` — 6/6 загружаются, только advisory `OC-RELOAD`.
- `validate ./skills-starter6-staging --profile default --tiers 1 --checks schema,quality -c -r json,markdown -o reports/starter6-final --min-score 70` — 6/6 прошли, `VALIDATE_EXIT=0`.

Две адаптации перед установкой:

- `code-reviewer`: добавлен заголовок верхнего уровня `# Code Reviewer` (иначе SCHEMA-HIGH).
- `git-commits-prs`: литерал `$ARGUMENTS` заменён на описание «the branch named by the user».

Отчёты: `reports/starter6-final/<skill>/`. Publication eligibility неполная: сканеры и LLM-проверки не запускались.

## Источники и лицензии

- `EdEngineering/opencode-awesome-skills`, коммит `13c8a69fb89d5296a9ee5f0ea7e422b08d9c9fe0`, MIT: пять навыков. Файл `git-pr-workflows-git-workflow/SKILL.md` локально переименован в `git-commits-prs`, frontmatter `name:` приведён к тому же ID.
- `JuliusBrussee/caveman`, коммит `47c61be2d10a354f0c5cbe2b90959d24c06b16c6`, Apache-2.0: только `skills/caveman/SKILL.md`; прокси и MCP-часть не копировались.

Полная атрибуция: `skills/STARTER6-ATTRIBUTION.md` в `opencode-boost` и `opencode-devkit`.

## Правила

- Навыки дополняют, а не заменяют `systematic-debugging` → `test-driven-development` → `code-reviewer` → `git-commits-prs`.
- `caveman` — стиль ответа, включается по запросу; не меняет файлы и не отключает другие навыки.
- Ни один из навыков не запускает сборки, тесты или коммиты без отдельного запроса пользователя.

См. также [навыки и команды](skills-commands.md), [мета-навыки](meta-skills.md), [SkillEvaluator](skillevaluator.md).
