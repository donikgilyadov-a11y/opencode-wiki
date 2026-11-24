# Агентные паттерны

Пять навыков написаны локально после разбора советов из папки `C:\Users\deda donik\Desktop\projects\Новая папка\`. Это не копии внешних репозиториев: автором является этот комплект, внешних лицензий и атрибуции нет. Заметки автора — `skills/AGENTOPS-NOTES.md` в DevKit и boost.

## Состав

| Навык | Назначение |
| :--- | :--- |
| `agent-loop-contracts` | Договор агентного цикла: цель, состояние, хендофф для субагентов, условия останова и проверка перед «готово». |
| `tool-and-mcp-authoring` | Проектирование инструментов и MCP: узкие глаголы, типизованные входы, идемпотентность, редукция секретов и ограничение вывода. |
| `agent-eval-harness` | Локальный воспроизводимый прогон eval: наборы кейсов, ассерты, базовая линия, отчёт и CI-гейт. Дополняет уже установленный навык оценки агентов `ai-agent-evaluation` операционной обвязкой. |
| `context-window-budgeting` | Бюджет контекста: что держать в окне, что выносить в артефакты, как безопасно сжимать и передавать состояние субагенту. |
| `durable-agent-workflows` | Долгая работа через файлы: GOAL/PROGRESS/CHECKPOINTS, идемпотентные шаги, восстановление после сбоя и явные стоп-условия. |

## Почему именно они

Большинство советов из одиннадцати файлов дублировало уже установленное: ADR через `brain/decisions/`, инциденты и релизы через `incident-response` и `shipping-and-launch`, разбор репозиториев через четыре навыка [анализа кода](code-analysis.md), безопасность через `reviewing-security`, автономию через [автопилот](autonomy.md), context pruning через DCP, задачи тестирования через [новую волну](nextwave-skills.md). Остались реальные пробелы: формальный контракт цикла и хендоффа, авторство схем инструментов, operational-обвязка eval, явный бюджет контекста и выживаемость рабочего процесса между сессиями.

## Валидация

SkillEvaluator 1.0.1:

- `harness-check ./skills-agentops-staging --harness opencode -v` — 5/5 загружаются, код возврата 0, только информативное предупреждение OC-RELOAD.
- `validate ./skills-agentops-staging --profile default --tiers 1 --checks schema,quality -c -r json,markdown -o reports/agentops --min-score 70` — 5/5 прошли, код возврата 0.
- Оценки: `agent-eval-harness` A 93.2, `agent-loop-contracts` A 93.2, `context-window-budgeting` A 92.8, `durable-agent-workflows` A 94.5, `tool-and-mcp-authoring` A 93.2.
- Сканер по staging: `SUSPECT_LINES=0`.

Правки до повторного прогона не потребовались. Полная проверка каталога DevKit после копирования — 57/57 навыков проходят гейт.

## Что не ставилось

Не ставились тяжёлые и рискованные предложения из советов: `mechanicus`, `oh-my-opencode-slim`, `agent-teams`, Context7, supermemory/OpenViking, `opencode-pty`, общие подборки с десятками навыков и библиотечно-специфичные наборы Zod, Dexie, Vitest или React Flow. Также не добавлялись плагины и записи в конфиг OpenCode: задача была только в локальных Markdown-навыках.

## Ссылки

- [Навыки и команды](skills-commands.md)
- [SkillEvaluator](skillevaluator.md)
- [Новая волна навыков](nextwave-skills.md)
- [Автопилот](autonomy.md)
- [Глубокое исследование](deep-research.md)
- [Проект opencode-boost](projects/opencode-boost.md)
