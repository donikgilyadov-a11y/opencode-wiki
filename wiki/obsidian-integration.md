# Интеграция Obsidian и OpenCode

План по связыванию Obsidian с локальной средой OpenCode на этом ПК. Obsidian ещё не установлен — страница фиксирует изученные варианты и безопасный порядок включения.

## Состояние

- Obsidian: ещё не установлен (проверено по `%LOCALAPPDATA%\Obsidian`, `%APPDATA%\Obsidian`, ярлыкам).
- Второй мозг уже в формате Obsidian: `~/Desktop/opencode-boost/brain/`, вики-ссылки `[[...]]`, теги `#тег`, дневники.
- Решение: [ADR 0004](../decisions/0004-obsidian-integration.md) в мозге.

## Фаза 1 — vault без плагинов

Открыть как Obsidian vault: `C:\Users\deda donik\Desktop\opencode-boost\brain`.

- `MEMORY.md` — индекс и карта связей.
- `memory/YYYY-MM-DD.md` — daily notes.
- `decisions/`, `knowledge/`, `projects/` — отдельные заметки.
- OpenCode продолжает писать сюда же через `brain.save`, `brain.js` и плагин `brain-tools`.

Плюс: ноль настроек, никаких новых ключей и процессов. Obsidian создаст только `.obsidian/` со служебными файлами.

## Фаза 2 — Local REST API + MCP

Плагин Obsidian **Local REST API** (проверенная версия 5.5.2) даёт REST API и встроенный MCP-сервер:

- чтение/запись/патч заметок: `vault_list`, `vault_read`, `vault_write`, `vault_append`, `vault_patch`;
- поиск: `search_simple`, `search_query`;
- теги и команды: `tag_list`, `command_list`, `command_execute`;
- навигация: `open_file`, `active_file_get_path`, `vault_move/copy/delete`;
- события vault через SSE и ресурсы `obsidian://local-rest-api/*`.

В OpenCode это подключается как удалённый MCP-сервер:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "obsidian": {
        "type": "remote",
        "url": "http://127.0.0.1:27123/mcp/",
        "oauth": false,
        "headers": { "Authorization": "Bearer {env:OBSIDIAN_API_KEY}" },
        "protocol": "auto"
      }
    }
  }
}
```

- Порт `27123` — простой HTTP, включается в настройках плагина; порт `27124` — HTTPS с локально сгенерированным CA.
- Ключ берётся из **Settings → Local REST API** и хранится только в `OBSIDIAN_API_KEY`, не в конфиге.
- Не включать «Allow access to the configuration directory»: `.obsidian/` содержит код плагинов и ключ.

## Фаза 3 — OpenCode внутри Obsidian

Рекомендуемый плагин: `jensenojs/another-opencode-for-obsidian` **v0.6.0**.

- Только V2 API (`/api/info`, `/api/session`, `/api/event`), требует OpenCode ≥ 2.1.3 (сейчас 2.3.2).
- Не запускает и не останавливает сервис: подключается к уже существующему `service*.json`.
- Умеет боковую панель и глубокий режим, тему из Obsidian, передачу выбранного текста и открытых заметок как вложений в запрос, навигацию по путям и вики-ссылкам из OpenCode в Obsidian.
- Ставится через BRAT (`jensenojs/another-opencode-for-obsidian`) или ручной копией файлов релиза.

Не выбраны: `mtymek/opencode-obsidian` (Bun + `--cors app://obsidian.md` + кастомная команда), `windyboy/opencode-obsidian` (нет явного подтверждения V2).

## Фаза 4 — экспорт сессий (пока не ставить)

`opencode-obsidian-export` в npm имеет последнюю версию **1.1.0** с peer `@opencode-ai/plugin` (V1), хотя README описывает 2.x для V2. Пока не ставить. Если понадобится — написать локальный плагин, который пишет сессии в `<vault>/OpenCode-Logs/` через существующие brain-инструменты.

## Безопасность

- Никаких API-ключей и паролей в заметках и конфиге.
- Локальные порты слушают только `127.0.0.1`.
- Не трогать `egilyad/ai-os-new` и его репозиторий без явного запроса.
