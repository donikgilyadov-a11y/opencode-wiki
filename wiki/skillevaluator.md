# SkillEvaluator

[NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator) — публичный Apache-2.0 фреймворк для проверки навыков и плагинов агентов. Документация: <https://docs.nvidia.com/skills/skillevaluator/>. Версия на момент проверки — **1.0.1** (PyPI, 18 ноября 2026).

## Зачем нам это

У [DevKit](devkit.md) сейчас 39 навыков. Раньше их работоспособность в OpenCode проверялась вручную: `oc-check` считал файлы, но не знал, загрузит ли OpenCode конкретный `SKILL.md`. SkillEvaluator отвечает на три вопроса: правильно ли устроен навык, загрузит ли его харнесс и помогает ли он агенту на практике.

## Уровни проверки

| Уровень | Команда | Что даёт | Нужны ключи |
| --- | --- | --- | --- |
| Качество | `skillevaluator quality-check ./skill` | Оценка 0–100 и оценка A–F без модели | Нет |
| Tier 1 Validation | `skillevaluator tier1 ./skill --no-llm` | Схема, безопасность, PII, лицензии, Unicode, качество; ~500 статических правил | Нет |
| Harness Check | `skillevaluator harness-check ./skills --harness opencode -v` | Verdict `loads` / `degraded` / `not_loaded` для OpenCode и ещё пяти харнессов | Нет |
| Tier 2 | `skillevaluator tier2 ./skill` | Пересечения внутри навыка и с каталогом | Провайдер |
| Tier 3 | `skillevaluator tier3 ./skill` | A/B-прогон агента с навыком и без, метрика Skill Lift | Провайдер + Docker |

Harness Check — самый полезный для нас пункт. Профиль OpenCode проверяет discovery paths, frontmatter, дубли ключей, длину description, лимит доставки (51 200 байт / 2000 строк), подстановку `$ARGUMENTS` и игнорируемые поля вроде `disable-model-invocation`. Находки по умолчанию информационные: команда всегда возвращает 0.

## Установка на этом ПК

Python не был установлен (только заглушка WindowsApps), поэтому использован standalone `uv`:

```powershell
Invoke-WebRequest -Uri 'https://github.com/astral-sh/uv/releases/latest/download/uv-x86_64-pc-windows-msvc.zip' -OutFile uv.zip
Expand-Archive uv.zip -DestinationPath uv
& '.\uv\uv.exe' tool install --python 3.13 skillevaluator
& "$env:USERPROFILE\.local\bin\skillevaluator.exe" --version
```

`uv tool install` ставит исполнимый файл в `%USERPROFILE%\.local\bin`, который не добавляется в PATH автоматически. Можно вызывать полным путём или выполнить `uv tool update-shell`.

## Результат проверки DevKit

- harness-check по всем тринадцати навыкам: **13 из 13 загружаются** в OpenCode (профиль 1.19.5 от 2026-11-01). Единственное замечание `OC-RELOAD` — список навыков кэшируется при старте.
- `validate ./skills --tiers 1 --checks schema,quality --min-score 70`: **все 13 прошли**, оценки B и A (81.8–92.0 баллов), выходной код 0. Publication status остаётся `incomplete`, потому что scanners и LLM не запускались.
- Исправлено до проверки: пять навыков имели `name` с пробелами вместо kebab-case (`admin-panel`, `graph`, `md-examples`, `opencode-tuner`, `second-brain`), а в `md-examples` буквальное `$ARGUMENTS` в примере понижало вердикт до `degraded`. Исправления внесены и в DevKit, и в рабочую копию `opencode-boost/skills`.
- Оставшиеся advisories — стилистические (`## Purpose`, `## Examples`, `metadata.author`, `metadata.tags`, windows-пути); на гейт не влияют.

## CI

В DevKit добавлен workflow `.github/workflows/skills.yml`: при изменении `skills/**` он ставит SkillEvaluator через `setup-uv`, запускает advisory `harness-check` и блокирующий `validate`, сохраняет JSON/Markdown-отчёты и `harness.json` как артефакт. Действия закреплены по SHA по образцу официальных шаблонов NVIDIA.

## Фронтенд-навыки

Добавлены три внешних навыка для связки TypeScript + React: `react-expert`, `typescript-pro`, `react-best-practices`. Их прогоняли отдельно до установки: `harness-check` — 3 из 3 загружаются, `validate --tiers 1 --checks schema,quality --min-score 70` — 3 из 3 прошли с оценками A (90.8–92.0). После копирования в DevKit повторная проверка всего каталога показала 13 из 13.

Источники зафиксированы по коммитам:

- `react-expert` — [farmage/opencode-skills](https://github.com/farmage/opencode-skills/tree/main/skills/react-expert), `2ec14733c1aaa6f98c4b12ecd078ff7c0454710b`, MIT.
- `typescript-pro` — [tektite-io/opencode-skills](https://github.com/tektite-io/opencode-skills/tree/main/skills/typescript-pro), `2ec14733c1aaa6f98c4b12ecd078ff7c0454710b`, MIT.
- `react-best-practices` — [bobum/opencode-skills](https://github.com/bobum/opencode-skills/tree/master/.opencode/skills/react-best-practices), `4bd8ab3bb9ba80af2c7f3c5db50615a1240b0aaf`, MIT; адаптация `vercel-labs/agent-skills`.

Полный список атрибуций лежит в `skills/FRONTEND-ATTRIBUTION.md` репозитория DevKit. Репозиторий `FrancoStino/opencode-skills-collection` не использовался: все обещанные навыки там ведут к одному файлу.

## Навыки укрепления кода

Ещё шесть внешних навыков отобраны под долги аудита ai-os-new: `reviewing-security`, `memory-leaks`, `backpressure`, `race-conditions`, `error-handling`, `observability-instrumentation`. До установки `harness-check` показал 6 из 6 загружаются, `validate --tiers 1 --checks schema,quality --min-score 70` — 6 из 6 прошли (85.2–90.2). В `error-handling` добавлен верхний заголовок. Источники и лицензии зафиксированы в `skills/HARDENING-ATTRIBUTION.md`; подробности — [укрепление кода](hardening-skills.md).

## Производительность и API

Ещё два навыка из того же MIT-источника `addyosmani/agent-skills` (коммит `e997ac5b9a74eab332d5e9793bb38a38c8cfdd74`): `performance-optimization` и `api-and-interface-design`. До установки `harness-check` показал 2 из 2 загружаются, `validate --tiers 1 --checks schema,quality --min-score 70` — 2 из 2 прошли с оценками A 90.2 / A 90.2. В `api-and-interface-design` price-like токен `$50` заменён на `USD 50`, чтобы харнесс не принимал пример за подстановку аргумента. Источник и атрибуция — `skills/PERF-API-ATTRIBUTION.md`; подробности — [производительность и API](perf-api-skills.md).

## Ограничения

- Tier 1 без полного набора сканеров (SkillSpector, Gitleaks, Semgrep, pip-audit) остаётся `incomplete` — это не ошибка, а отсутствие доказательств.
- Tier 2 и Tier 3 требуют ключа провайдера; ключ передаётся через окружение, а не через файлы репозитория.
- SkillEvaluator — experimental, community-supported, без SLA.
