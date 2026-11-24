# Навыки укрепления кода

Шесть внешних навыков для проверки безопасных и надёжных мест в коде. Они подобраны под долги из отчётов по [ai-os-new](projects/opencode-boost.md): SSRF и авторизация, утечки памяти и слушателей, backpressure, гонки, тихие ошибки и наблюдаемость.

## Состав

| Навык | Что даёт |
| --- | --- |
| `reviewing-security` | Проверка безопасности с правилом «нет находки без пути от атакующего к последствию»: авторизация объектов и арендаторов, SSRF, секреты в клиентском бандле. |
| `memory-leaks` | Поиск бесконечно растущих `Map`/`Set`, слушателей, таймеров и замыканий без очистки. |
| `backpressure` | Ограничение очередей, fan-out и fire-and-forget в циклах, когда producer быстрее consumer. |
| `race-conditions` | Проверка read-modify-write, check-then-act, уникальных записей и переходов состояний. |
| `error-handling` | Продуманные пути ошибок, осмысленные сообщения и аккуратная деградация вместо тихих `catch {}`. |
| `observability-instrumentation` | Логи, метрики, трейсы и алерты, чтобы поведение в проде было видно и диагностируемо. |

## Проверка перед установкой

SkillEvaluator 1.0.1: `harness-check ./skills-hardening-staging --harness opencode -v` — 6/6 загружаются; `validate --tiers 1 --checks schema,quality --min-score 70` — **6/6 прошли**, `VALIDATE_FINAL_EXIT=0`. Оценки: backpressure A 90.2, race-conditions A 90.2, reviewing-security A 90.2, error-handling B 89.0, memory-leaks B 89.0, observability-instrumentation B 85.2. Остальные замечания стилистические; полная публикационная проверка не запускалась.

В `error-handling` добавлен верхний заголовок `# Error Handling`, имена папок приведены к kebab-case. Исходники скачаны по зафиксированным коммитам, атрибуция — `skills/HARDENING-ATTRIBUTION.md` в [DevKit](devkit.md).

## Источники и исключения

- `reviewing-security` — osmontero/opencode-skills, MIT, коммит `3478280631435fcb9e2d85c5f053f8e8e64364b8`.
- `memory-leaks`, `backpressure`, `race-conditions` — triggerdotdev/staff-engineering-skills, Apache-2.0, коммит `597da099e4b7d07f53946cc393ca24ad9274d925`.
- `error-handling` — DevelopersGlobal/ai-agent-skills, MIT, коммит `b430fd194facf6d3a35cbc49c98410f6e0956d93`.
- `observability-instrumentation` — addyosmani/agent-skills, MIT, коммит `e997ac5b9a74eab332d5e9793bb38a38c8cfdd74`.

Не ставились: `security-review` и `security-threat-model` (пересечение с уже установленными), `secret-hygiene` (пересечение с envsitter-guard), `zod-schema` (неясная лицензия), а также каталоги с npx/Python/pnpm/бинарниками и облачными ключами. Верификатор глубокого исследования подтвердил 4/4 ключевых утверждения и 11/11 заметок — `rn_mwuq30k9owjo`.

См. также: [навыки и команды](skills-commands.md), [стартовый набор](starter6.md), [навыки процесса](next3.md), [тесты и CI](testing-ci.md).
