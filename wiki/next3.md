# Три навыка процесса

Небольшое дополнение к [стартовому набору](starter6.md): три навыка из `obra/superpowers`, которые закрывают этапы, не покрытые уже установленными навыками.

| Навык | Назначение | Оценка SkillEvaluator |
| --- | --- | --- |
| `verification-before-completion` | Никаких «готово/исправлено/проходит» без свежего вывода команды | A 90.2 |
| `dispatching-parallel-agents` | Раздать независимые задачи субагентам с изолированным контекстом | A 91.5 |
| `receiving-code-review` | Оценить ревью технически, а не соглашаться автоматически | B 87.8 |

## Почему именно они

- Проверки перед завершением уже есть (`oc-check`, smoke, SkillEvaluator), но сам навык фиксирует правило: сначала команда и вывод, потом утверждение.
- Параллельные субагенты уже используются в долгих задачах; навык задаёт правило «один агент на независимую область» и требует не передавать лишний контекст.
- `code-reviewer` умеет проверять код, но не учит правильно получать и фильтровать отзывы — это отдельный навык.

Остальные навыки того же репозитория не ставились: `writing-plans` зависит от соседних superpowers-навыков, а `executing-plans`, `subagent-driven-development`, `writing-skills`, `finishing-a-development-branch` и `diagnosing-superpowers` пересекаются с уже установленными `autopilot`, мета-навыками, `git-commits-prs` и агентами.

## Проверка и источники

`C:\Users\deda donik\.local\bin\skillevaluator.exe` v1.0.1:

- `harness-check ./skills-next3-staging --harness opencode -v` — 3/3 загружаются.
- `validate ... --tiers 1 --checks schema,quality --min-score 70` — 3/3 прошли, `VALIDATE_EXIT=0`.
- Отчёты: `reports/next3/<skill>/`.

Источник: `obra/superpowers`, коммит `22f0b463e7a5e579904dd6211a520321035526f7`, MIT (Copyright 2025 Jesse Vincent). Скопированы только три `SKILL.md`. Атрибуция: `skills/NEXT3-ATTRIBUTION.md` в boost и DevKit.

См. также [навыки и команды](skills-commands.md), [стартовый набор](starter6.md), [SkillEvaluator](skillevaluator.md).
