# Аудит сессий OpenCode

Инструмент только для чтения: разбирает лог сессий, находит повторяющиеся ошибки, циклы и перезапуски
CLI, сохраняет отчёт во втором мозге и предлагает конкретные тесты, навыки и исправления.
Сам он ничего не чинит — фиксы применяются отдельно через [авто-врача](self-check.md) по запросу.

## Где лежит

- Скрипт: `~/Desktop/opencode-boost/scripts/session-audit.js` (CommonJS, без зависимостей).
- Локальный плагин: `~/.config/opencode/plugins/session-audit-tools/`, пространство имён `sessionaudit`.
- Навык: `session-audit`, команда `/session-audit`.
- Отчёты: `~/Desktop/opencode-boost/brain/reports/session-audit-YYYY-MM-DD.md`.

## Инструменты

| Инструмент | Что делает |
| --- | --- |
| `sessionaudit.scan({hours, all, limit})` | Сводка по логу без сохранения файла |
| `sessionaudit.patterns({hours, all})` | Повторяющиеся ошибки с рекомендациями |
| `sessionaudit.report({hours, all, name})` | Полный отчёт с сохранением в `brain/reports/` |

Из командной строки:

```powershell
node "C:\Users\deda donik\Desktop\opencode-boost\scripts\session-audit.js" --hours=168 --save
node "C:\Users\deda donik\Desktop\opencode-boost\scripts\session-audit.js" --json --limit=10
```

Флаги: `--hours=N` (по умолчанию 168), `--all`, `--save`, `--json`, `--log=`, `--brain=`, `--limit=`.

## Как устроен разбор

Лог `~/.local/share/opencode/log/opencode.log` — не JSON, а строки вида `key=value` с кавычками.
Парсер выбирает `level`, `run`, `session.id`, `message`, а также поля `error`, `cause`, `error.error`.
Нормализация склеивает похожие сообщения, заменяя идентификаторы, хеши, числа, пути и URL на плейсхолдеры.
Циклом считается 5 и более одинаковых событий в течение 120 секунд.
Отдельно считаются запуски CLI по дням и часам.

Секреты не попадают в ответ: пути заменяются на `%USERPROFILE%`, токены `ghp_`, `sk_` и `Bearer …` —
на плейсхолдеры, длинные значения обрезаются.

## Правила рекомендаций

| Сигнал | Рекомендация |
| --- | --- |
| `worktree discovery failed` | Проверить, что папка сессии существует; применить `oc-doctor` |
| `cli starting` | Группировать вызовы через Code Mode, меньше коротких CLI-процессов |
| Устаревший Desktop-клиент | Обновить приложение OpenCode Desktop |
| Ошибки квоты / `Failed to drain Session` | Проверить `/quota` и не продолжать сессию после лимита |
| `models.dev`, сеть | Проверить соединение и доступность реестра моделей |
| MCP недоступен | Проверить сервис, прокси Obsidian и `opencode mcp list` |
| MCP авторизация | Проверить ключ и заголовки MCP-сервера |
| Разрешения | Уточнить `permissions` в конфиге |

## Первый прогон

За неделю разобрано 17 477 записей: INFO 17 372, WARN 90, ERROR 15.
Главные находки: 12 804 запуска CLI (пик 4 824 в час), 71 `worktree discovery failed`,
11 `Failed to fetch models.dev`, 9 `mcp connect failed`, по 4 ошибки HTTP/авторизации MCP и квоты,
2 `mcp transport error`. Найдены два всплеска одинаковых событий — по 10 и 6 за две минуты.

Итог: узкое место — слишком много коротких CLI-процессов и нестабильный доступ к MCP/сети.
Рекомендации записаны в отчёт; автоматических изменений конфигурации не делалось.

## Связи

См. также [репозиторий аудит](repo-audit.md), [самопроверку](self-check.md),
[тесты и CI](testing-ci.md) и [журнал за 24 ноября](../journal/2026-11-24.md).
