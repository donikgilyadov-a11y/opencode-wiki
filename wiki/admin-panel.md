# Вторая админка

Локальный дашборд OpenCode: `http://127.0.0.1:8787`.
Код: `~/Desktop/opencode-boost/admin/`.

## Запуск

```powershell
C:\Users\deda donik\Desktop\opencode-boost\admin\start.cmd
# или
node "C:\Users\deda donik\Desktop\opencode-boost\admin\server.js"
```

На Рабочем столе есть ярлык **«Вторая админка OpenCode.lnk»** — он запускает тот же `start.cmd`
и открывает дашборд в браузере. `start.cmd` сначала проверяет порт 8787: если сервер уже слушает,
он только открывает страницу и не поднимает второй процесс.

Сервер написан на чистом Node.js без зависимостей, слушает только `127.0.0.1`.
Чтобы не хранить пароль сервиса, он вызывает `opencode api ...` через `execFile`.

## Страницы и endpoints

| Путь | Что даёт |
| --- | --- |
| `/`, `/index.html` | Дашборд: info, location, model, agents, plugins, MCP, sessions, projects, providers, graphs, paths; кнопка Reload |
| `/graph.html` | Просмотр графов Mermaid (CDN `mermaid@11`), сырой текст как fallback, автообновление |
| `/api/data` | Сводка данных сервиса |
| `/api/graphs` | Список графов из `brain/graphs/` |
| `/api/call` | Ограниченный прокси: GET + POST `/api/location/reload` |
| `/api/logs?lines=80` | Последние строки `opencode.log` с маскировкой секретов |
| `/api/brain` | Индекс `MEMORY.md` и количество MD-файлов мозга |
| `/api/quota` | Наличие файла настроек квот (содержимое не показывается) |
| `/api/skills` | Счётчики `skill-lint`, наличие `skills/INDEX.md` и `TRIGGERS.md` |
| `/api/obsidian` | Состояние моста: порты 27125/27123, PID watchdog, ярлык автозапуска и последние строки лога (без ключа) |
| `/api/oc-check` | Полный отчёт самопроверки |

## Вкладки «Админка 2.0»

В шапке появились якоря **Обзор / Плагины / Безопасность / Логи / Проверки**, кнопка
«Автообновление: вкл/выкл» и кнопка «Проверка». На вкладках показываются детали плагинов
(версия и статус), наличие `cc-safety-net`/`envsitter-guard`/`auto-resume`/`ponytail`,
настройки квот, состояние Obsidian-моста, индекс мозга, хвост лога и полный список проверок. Лог маскирует
`authorization`, `api_key`, `token`, `password`, `secret`, а также ключи вида `gh_` и `sk-`.

## Проверено

- `/api/data` и `/api/graphs` — HTTP 200.
- `/graph.html` отрисовывает Mermaid в SVG; в браузере подтверждено: items=3, svg=1.
- Графы: `memory` (23/47), `project-opencode-boost`, `tree-vertikalnoesad`.
- После обновления 2.0 во встроенном браузере: ошибок консоли нет, вкладки и log-панель загружаются,
  кнопка «Проверка» показывает `20/20 OK`.
- Дымовая проверка `scripts/smoke-admin.js`: 9/9 OK (включая `/api/skills` и `/api/obsidian`). Playwright повторно подтвердил 0 ошибок консоли
  после того, как в обе HTML-страницы добавили data-URI SVG-иконку (убрали `404 /favicon.ico`).
  Подробнее — [тесты и CI](testing-ci.md).

## Безопасность

- Только localhost, никаких внешних интерфейсов.
- `/api/call` не позволяет произвольные POST — только перезагрузку location.
- Не хранить service password и токены в файлах админки.
