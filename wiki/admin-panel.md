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

## Проверено

- `/api/data` и `/api/graphs` — HTTP 200.
- `/graph.html` отрисовывает Mermaid в SVG; в браузере подтверждено: items=3, svg=1.
- Графы: `memory` (16/42), `project-opencode-boost`, `tree-vertikalnoesad`.

## Безопасность

- Только localhost, никаких внешних интерфейсов.
- `/api/call` не позволяет произвольные POST — только перезагрузку location.
- Не хранить service password и токены в файлах админки.
