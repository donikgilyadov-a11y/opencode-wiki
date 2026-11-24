# Мета-навыки для работы с навыками

Три внешних навыка помогают создавать, документировать и поддерживать сами `SKILL.md`.
Они установлены в `~/Desktop/opencode-boost/skills/` и в DevKit после обязательной проверки
через [SkillEvaluator](skillevaluator.md).

## Состав

| Навык | Зачем |
| --- | --- |
| `opencode-skill-creation` | Создать новый навык по конвенциям OpenCode V2: kebab-case имя, корректный frontmatter, секции Goal/Use When/Do Not Use When/Inputs/Steps/Output/References |
| `skill-doc-authoring` | Превратить повторяющийся процесс или SOP в короткий `SKILL.md` с описанием-триггером и понятной структурой |
| `skill-creator` | Установить, перечислить, обновить, удалить и диагностировать навыки; проверить зависимости и адаптацию Claude-навыков под OpenCode |

`skill-creator` пришёл с пятью вспомогательными файлами в `references/` (руководство по установке,
адаптация Claude, устранение неполадок и два шаблона `SKILL.md`). Остальные два навыка — по одному файлу.

## Проверка перед установкой

- `harness-check ./skills-meta-staging --harness opencode -v` — **3/3 загружаются**, только advisory `OC-RELOAD`.
- `validate ./skills-meta-staging --profile default --tiers 1 --checks schema,quality -c -r json,markdown -o reports/meta --min-score 70` — **3/3 прошли**, оценки B 89.0.

После адаптации путей в `opencode-skill-creation` проверка повторена: снова 3/3, `$LASTEXITCODE=0`.
Advisories носят стилистический характер и на загрузку не влияют. Полная проверка всех навыков
DevKit теперь включает и эти три — см. [тесты и CI](testing-ci.md).

## Источники и лицензии

Источники зафиксированы по коммитам; лицензии MIT. Подробности — `skills/META-ATTRIBUTION.md`
в boost и DevKit.

| Навык | Репозиторий | Коммит |
| --- | --- | --- |
| `opencode-skill-creation` | `open-hax/opencode-skills` | `d91bad1eda762044c6416d31f93bc7566b530043` |
| `skill-doc-authoring` | `composio-community/opencode-skills` | `5076f6673e5bf8b1f46dc5e934d1e3dd37250e10` |
| `skill-creator` | `JValdivia23/opencode-skill-creator` | `9108f71fff49dd353f76f13044ed28687ea6841a` |

В `opencode-skill-creation` пути `.opencode/skill/` и `~/.agents/skills/` заменены на наши
`.opencode/skills/` и `~/.config/opencode/skills/`; вместо UNIX `ln -s` указан Windows-эквивалент
через `New-Item -ItemType SymbolicLink`. Другие файлы не изменялись.

## Внешний CLI

Команды `npx skills find|add|list|update|remove` относятся к отдельной экосистеме CLI для навыков.
Они не ставились и не нужны для работы этих трёх навыков; при использовании в PowerShell
нужно вызывать `npx.cmd`. Смотрите также [навыки и команды](skills-commands.md) и
[DevKit](devkit.md).
