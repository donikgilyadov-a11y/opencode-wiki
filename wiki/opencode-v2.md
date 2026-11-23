# OpenCode V2: рабочие факты

Источник истины — `https://opencode.ai/docs/` и `https://opencode.ai/docs/llms.txt`.
Только V2; V1-документацию используем лишь при миграции.

## Версия и сервис

- OpenCode Desktop **v2.3.2**, фоновый сервис `http://127.0.0.1:28894`.
- CLI: `C:\Users\deda donik\AppData\Local\Programs\@opencode-aidesktop\resources\opencode-cli.exe`.
- Прямой HTTP к сервису даёт 401: используй `opencode api <method> <path>` — CLI сам авторизуется.
- Полезно: `service status`, `api get /api/info`, `/api/plugin`, `/api/command`, `/api/skill`, `/api/agent`, `plugin add`.
- Изменения конфига подхватываются без перезапуска; `/reload` — принудительная перезагрузка.

## Пути

| Что | Где |
| --- | --- |
| Глобальный конфиг | `~/.config/opencode/opencode.jsonc` |
| Глобальные команды | `~/.config/opencode/commands/` |
| Глобальные агенты | `~/.config/opencode/agents/` |
| Локальные плагины | `~/.config/opencode/plugins/` (autodiscovery) |
| Лог и данные | `~/.local/share/opencode/` |
| DCP-конфиг | `~/.config/opencode/dcp.jsonc` |

## Окружение Windows

- Git не в PATH: `C:\Program Files\Git\cmd\git.exe`.
- `npm.ps1` заблокирован политикой: используй `C:\Program Files\nodejs\npm.cmd`.
- PowerShell искажает UTF-8 в выводе: файлы читай инструментом `read`.
- GitHub-учётка `donikgilyadov-a11y`, PAT хранится в Windows Credential Manager (`git:https://github.com`).

## Хуки плагинов (проверено на практике)

- `ctx.session.hook("context", ...)` — правит system/messages/tools перед каждым запросом модели;
  именно так автопилот добавляет цель в каждый шаг.
- `ctx.session.hook("compaction", ...)` — вызывается при сжатии истории; используется для чекпоинта.
- `ctx.tool.transform(editor => editor.namespace(...); editor.add(...))` — регистрация инструментов.
- Инструменты namespaces видны в Code Mode как `tools.<namespace>.<name>`.

## Встроенные механизмы для долгой работы

- `/goal <цель>` — «keep working until an objective is met», подкоманды `pause|resume|clear`.
- `/compress` от DCP — сжатие завершённых частей контекста.
- `experimental.todo` включён в глобальном конфиге.
