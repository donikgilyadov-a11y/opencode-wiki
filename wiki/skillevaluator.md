# SkillEvaluator

[NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator) — публичный Apache-2.0 фреймворк для проверки навыков и плагинов агентов. Документация: <https://docs.nvidia.com/skills/skillevaluator/>. Версия на момент проверки — **1.0.1** (PyPI, 18 ноября 2026).

## Зачем нам это

У [DevKit](devkit.md) девять навыков. Раньше их работоспособность в OpenCode проверялась вручную: `oc-check` считал файлы, но не знал, загрузит ли OpenCode конкретный `SKILL.md`. SkillEvaluator отвечает на три вопроса: правильно ли устроен навык, загрузит ли его харнесс и помогает ли он агенту на практике.

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

- harness-check по всем девяти навыкам: **9 из 9 загружаются** в OpenCode (профиль 1.19.5 от 2026-11-01). Единственное замечание `OC-RELOAD` — список навыков кэшируется при старте.
- `validate ./skills --tiers 1 --checks schema,quality --min-score 70`: **все 9 прошли**, оценки в диапазоне B (83–86 баллов), выходной код 0. Publication status остаётся `incomplete`, потому что scanners и LLM не запускались.
- Исправлено до проверки: пять навыков имели `name` с пробелами вместо kebab-case (`admin-panel`, `graph`, `md-examples`, `opencode-tuner`, `second-brain`), а в `md-examples` буквальное `$ARGUMENTS` в примере понижало вердикт до `degraded`. Исправления внесены и в DevKit, и в рабочую копию `opencode-boost/skills`.
- Оставшиеся advisories — стилистические (`## Purpose`, `## Examples`, `metadata.author`, `metadata.tags`, windows-пути); на гейт не влияют.

## CI

В DevKit добавлен workflow `.github/workflows/skills.yml`: при изменении `skills/**` он ставит SkillEvaluator через `setup-uv`, запускает advisory `harness-check` и блокирующий `validate`, сохраняет JSON/Markdown-отчёты и `harness.json` как артефакт. Действия закреплены по SHA по образцу официальных шаблонов NVIDIA.

## Ограничения

- Tier 1 без полного набора сканеров (SkillSpector, Gitleaks, Semgrep, pip-audit) остаётся `incomplete` — это не ошибка, а отсутствие доказательств.
- Tier 2 и Tier 3 требуют ключа провайдера; ключ передаётся через окружение, а не через файлы репозитория.
- SkillEvaluator — experimental, community-supported, без SLA.
