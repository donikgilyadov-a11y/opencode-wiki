# Производительность и проектирование API

Два навыка добавлены после [укрепления кода](hardening-skills.md), когда стало ясно, что часть долгов ai-os-new из отчётов аудита лежит в производительности и в контрактах внешних интерфейсов. Как и раньше, кандидаты сначала прошли валидацию, и только потом были скопированы в boost и DevKit.

## Состав

| Навык | Зачем |
| --- | --- |
| `performance-optimization` | Измерения до оптимизации, поиск N+1 и неограниченной выборки, пакетные запросы, правильные ключи кэша, контроль O(n²) и Core Web Vitals. |
| `api-and-interface-design` | Стабильные контракты, валидация на границе, идемпотентность, защита от TOCTOU, единообразные ошибки и версионирование интерфейсов. |

## Почему именно они

- В отчётах аудита повторяются O(n²)-пути, отсутствие пакетной эмбеддинг-обработки, пересборка BM25 на каждый запрос и полное перечитывание состояния.
- В `server/sync-server.mjs` найдены TOCTOU в `/api/runs/:id/execute` и непокрытые арендаторы REST-маршруты; API-навык даёт практику контрактов, идемпотентных ключей и валидации на границе.
- Оба навыка не пересекаются с уже установленными: `ponytail-review` отвечает за удаление лишнего кода, `reviewing-security` — за путь атакующего к последствию, а эти два — за измеряемую скорость и форму интерфейса.

## Проверка

SkillEvaluator 1.0.1, тот же гейт, что и для остальных внешних навыков:

- `harness-check ./skills-perf-api-staging --harness opencode -v` → 2 из 2 загружаются, только advisory `OC-RELOAD`.
- `validate ./skills-perf-api-staging --profile default --tiers 1 --checks schema,quality -c -r json,markdown -o reports/perf-api --min-score 70` → 2 из 2 прошли, `VALIDATE_EXIT=0`.
- Оценки: `performance-optimization` A 90.2, `api-and-interface-design` A 90.2.

В `api-and-interface-design` был заменён price-like токен: `$50` → `USD 50`. Иначе харнесс V1 принимал пример за аргумент команды и помечал навык как degraded. Остальные замечания стилистические; publication eligibility остаётся неполной, потому что сканеры и LLM-оценка не запускались.

## Источник и атрибуция

Оба навыка взяты из одного зафиксированного коммита `addyosmani/agent-skills` `e997ac5b9a74eab332d5e9793bb38a38c8cfdd74`, лицензия MIT, Copyright 2025 Addy Osmani. Полная таблица путей, лицензий и исключений лежит в `skills/PERF-API-ATTRIBUTION.md` репозитория DevKit.

Не ставились: `accessibility-engineering` (нужны axe/pa11y и дополнительные файлы), `constraint-driven-development` (интерактивное интервью и установка инструментов в проект), `code-simplification` (пересекается с [ponytail](plugins.md)), `documentation-and-adrs` (пересекается со вторым мозгом и `brain/decisions/`).

## Связи

- [Навыки и команды](skills-commands.md) — полный каталог.
- [SkillEvaluator](skillevaluator.md) — результаты проверки всех навыков.
- [Укрепление кода](hardening-skills.md) — предыдущая партия.
- [Навыки процесса](next3.md) и [стартовый набор](starter6.md) — рабочий цикл.
- [Тесты и CI](testing-ci.md) — как гейт skills.yml прогоняется в CI.
