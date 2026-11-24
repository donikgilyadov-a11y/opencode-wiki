# Навыки дизайна, вёрстки и UI/UX

Четыре навыка для проектирования и проверки интерфейсов. Они дополняют уже установленные `react-expert`, `react-best-practices`, `typescript-pro`, `frontend-ui-engineering` и `reviewing-security`, но не дублируют их: здесь акцент на визуальном качестве, доступности и композиции компонентов.

| Навык | Что даёт | Источник |
| --- | --- | --- |
| `frontend-ui-engineering` | Композиция интерфейсов, дизайн-система и токены, адаптивность 320/768/1024/1440, скелетоны и optimistic updates, состояния ошибки/пустоты, WCAG 2.1 AA | `addyosmani/agent-skills` |
| `accessibility-engineering` | Аудит WCAG 2.2 AA: клавиатура, скринридер, контраст, триаж находок по важности и исправление первопричин | `addyosmani/agent-skills` |
| `web-design-guidelines` | 100+ правил Vercel: фокус, формы, типографика, изображения, анимация, тёмная тема, touch и i18n | `vercel-labs/agent-skills` |
| `vercel-composition-patterns` | Композиция React без булевых пропсов, compound components, явные варианты, state-context interface, React 19 `no-forwardref` | `vercel-labs/agent-skills` |

## Проверка

SkillEvaluator v1.0.1, зафиксированный коммит источника и отсутствие тяжёлых зависимостей — обязательные условия установки.

- `harness-check ./skills-ui-design-staging --harness opencode -v` — **4/4 загружаются**, только информальное замечание `OC-RELOAD`.
- `validate --tiers 1 --checks schema,quality --min-score 70` — **4/4 прошли**, `VALIDATE_FINAL_EXIT=0`.
- Оценки: `frontend-ui-engineering` A 90.2, `vercel-composition-patterns` B 89.5, `accessibility-engineering` B 83.2, `web-design-guidelines` B 83.0.
- Исправления перед финальным прогоном: в `web-design-guidelines` заменён литерал `$ARGUMENTS` и XML-подобное значение `metadata.argument-hint`; в атрибуции убраны случайные иноязычные вкрапления.

Остальные предупреждения SkillEvaluator носят стилистический характер; публикационная пригодность неполная, потому что сканеры и LLM-оценка не запускались.

## Источники и атрибуция

- `addyosmani/agent-skills` — зафиксированный коммит `e997ac5b9a74eab332d5e9793bb38a38c8cfdd74`, MIT (ранее проверен верификатором).
- `vercel-labs/agent-skills` — зафиксированный коммит `5a37a6329fbad3666c3207392a6a7c0110e92efb`, MIT.

Скопированы только Markdown и справочные файлы (`references/`, `rules/`, `scripts/audit-a11y.sh`). Скрипт аудита доступен как материал для чтения: внешние `npx --yes @axe-core/cli@4.13.0` и `pa11y@9.1.1` не запускались и не устанавливались. Полный перечень — `skills/UI-DESIGN-ATTRIBUTION.md` в DevKit.

## Не установлено

- `pbakaus/impeccable` (коммит `b49177d32788f2dc585c42831d845dacf1ebed2c`, Apache-2.0) — бинарный движок, хуки, телеметрия и запись `PRODUCT.md` / `DESIGN.md` в проект.
- `nextlevelbuilder/ui-ux-pro-max-skill` (коммит `a4fc248f6136552cb881e298847abc7ddce84e6b`) — требует Python 3 и большие CSV-каталоги; Python на этой машине отсутствует.
- `writing-guidelines`, `react-view-transitions`, `react-native` — не являются ядром запроса или пересекаются с установленными навыками.

См. также [навыки и команды](skills-commands.md), [SkillEvaluator](skillevaluator.md), [изначальный стартовый набор](starter6.md), [навыки процесса](next3.md) и [укрепление кода](hardening-skills.md).
