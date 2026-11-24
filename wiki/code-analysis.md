# Анализ кода и чужих репозиториев

Четыре навыка дополняют [аудит репозиториев](repo-audit.md): они читают код и объясняют его, но не изменяют проверяемую папку. Установлены в `~/Desktop/opencode-boost/skills/` и в [DevKit](devkit.md).

| Навык | Когда использовать | Что возвращает |
| --- | --- | --- |
| `repository-analysis` | Быстрый первый взгляд на незнакомый репозиторий | Обзор, архитектура, структура, ключевые компоненты и зависимости, потоки, тесты, документация, риски, вывод. Неизвестное помечается как `UNKNOWN`. |
| `exploring-code` | Нужно глубоко понять проект перед задачей | Субагент `explore` идёт по порядку: документация → структура → тесты → исходники → интеграции → синтез. Адаптирован под наш харнесс: `subagent`/`agent: explore`; отчёт возвращается финальным сообщением и сохраняется в `brain/reports/` только по просьбе. |
| `analyzing-projects` | Полный онбординг в большой проект | Пять слоёв: поверхностный скан, карта зависимостей, распознавание архитектуры, трассировка потоков, оценка качества. Поддерживает параллельных субагентов. |
| `code-explorer` | Вопрос «как здесь работает X?» | Пути выполнения от точек входа до хранилища, слои архитектуры, паттерны и абстракции, границы недоверенных данных, цитаты `file:line`, список essential files. |

## Границы

- Навыки не запускают `install`, `build`, `format`, `commit` и не меняют файлы проверяемого репозитория.
- Для формального read-only аудита со структурой и отчётом используйте [repo-audit](repo-audit.md).
- Для графов зависимостей и связей — [графы](second-brain.md) и `tools.graph.*`.
- Секреты из чужого кода в ответ и отчёт не копируются.

## Проверка и происхождение

До установки прогнан [SkillEvaluator](skillevaluator.md): `harness-check --harness opencode` — 4/4 загружаются, `validate --tiers 1 --checks schema,quality --min-score 70` — 4/4 прошли. Оценки: `analyzing-projects` A 90.2, `exploring-code` A 90.8, `repository-analysis` B 89.8, `code-explorer` B 88.5. Остались только стилистические замечания.

Источники зафиксированы по коммитам:

- `repository-analysis` — `ZanzyTHEbar/dragonarchy` (`dbc382d03da6c32684454ad9dc741df8e54c1aef`), MIT.
- `exploring-code` — `tedivm/opencode-config` (`f9e659e5b90a7109a5f5c6d6ffb83c0993cd764c`), MIT.
- `analyzing-projects` — `CloudAI-X/opencode-workflow` (`0128ca6e4014bc14c35791ce33968e92b94e8a1d`), MIT.
- `code-explorer` — `waybarrios/opencode-power-pack` (`c3328ad1633c1561026532f29b718a2380bc52ee`), Apache-2.0; портирован из `anthropics/claude-plugins-official` (`bdca23e8e46f8832d0030c05804ae207786ae37f`).

Полная таблица атрибуций и адаптаций: `skills/REPO-ANALYSIS-ATTRIBUTION.md` в boost и DevKit. Навык `exploring-code` был единственным, потребовавшим правок под наш харнесс (заголовок, вызов субагента и правило сохранения отчёта).

## Связи

[Навыки и команды](skills-commands.md) · [SkillEvaluator](skillevaluator.md) · [Аудит репозиториев](repo-audit.md) · [DevKit](devkit.md) · [Журнал](../journal/2026-11-24.md)
