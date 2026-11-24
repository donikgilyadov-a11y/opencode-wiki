# Интеграция Obsidian и OpenCode

План по связыванию Obsidian с локальной средой OpenCode на этом ПК. Obsidian установлен, страница фиксирует изученные варианты и безопасный порядок включения.

## Состояние

- Obsidian: установлен (`C:\Program Files\Obsidian`), конфиг в `%APPDATA%\Obsidian`.
- Экспериментальный vault пользователя: `C:\Users\deda donik\Desktop\projects\opencodeObsidian\opencode` (зарегистрирован в `obsidian.json`).
- Второй мозг уже в формате Obsidian: `~/Desktop/opencode-boost/brain/`, вики-ссылки `[[...]]`, теги `#тег`, дневники; добавлен как второй vault в Obsidian.
- Community-плагин **Local REST API 5.5.2** установлен и включён во vault `brain`; Restricted mode снят в GUI пользователем.
- OpenCode подключён к его MCP через локальный прокси на `127.0.0.1:27125`, инструменты `obsidian.*` работают.
- Community-плагин **Another OpenCode for Obsidian 0.6.0** установлен и включён во vault `brain`; OpenCode открывается прямо в Obsidian.
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

В OpenCode это подключается как удалённый MCP-сервер. Плагин установлен и включён во vault `brain`,
HTTP-сервер слушает `127.0.0.1:27123`.

Фактическая схема (проверена): OpenCode → локальный прокси `127.0.0.1:27125` → REST/MCP плагина
`127.0.0.1:27123`. Прокси `~/Desktop/opencode-boost/scripts/obsidian-mcp-proxy.js` (Node, без зависимостей)
читает ключ из `brain/.obsidian/plugins/obsidian-local-rest-api/data.json` и подставляет заголовок
`Authorization`. Так секрет не лежит ни в конфиге OpenCode, ни в переменных окружения.

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "obsidian": {
        "type": "remote",
        "url": "http://127.0.0.1:27125/mcp/",
        "oauth": false,
        "protocol": "auto",
        "codemode": true
      }
    }
  }
}
```

- Порт `27123` — простой HTTP, включается в настройках плагина; порт `27124` — HTTPS с локально сгенерированным CA.
- Порт `27125` — прокси. Его держит watchdog `scripts/obsidian-proxy-watchdog.js`: раз в 15 секунд проверяет порт и перезапускает прокси, если он упал. Ярлык `OpenCode Obsidian Proxy.lnk` в `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup` запускает watchdog при входе в Windows. Текущее состояние видно в админке (`/api/obsidian`) и в самопроверке `oc-check` (проверка «Obsidian MCP мост»). Ручное управление: `node scripts/obsidian-proxy-watchdog.js status|stop`.
- Прямой вариант с `headers: { "Authorization": "Bearer {env:OBSIDIAN_API_KEY}" }` не сработал: сервис OpenCode
  не увидел переменную, заданную через `setx` (401). Прокси решает это без перезапуска Desktop-приложения.
- Не включать «Allow access to the configuration directory»: `.obsidian/` содержит код плагинов и ключ.
- В Code Mode доступны 20 инструментов `obsidian.*` (`vault_list`, `search_simple`, `tag_list`, ...);
  проверено чтением списка файлов и тегов vault.

## Фаза 3 — OpenCode внутри Obsidian (выполнено)

Установлен `jensenojs/another-opencode-for-obsidian` **v0.6.0** ручной копией файлов релиза в
`<vault>/.obsidian/plugins/another-opencode-for-obsidian/` (`main.js`, `manifest.json`, `styles.css`);
плагин добавлен в `community-plugins.json`, Obsidian перезагружен командой `app:reload` через Local REST API.

- Только V2 API (`/api/info`, `/api/session`, `/api/event`), требует OpenCode ≥ 2.1.3 (сейчас 2.4.1).
- Не запускает и не останавливает сервис: подключается к уже существующему
  `%USERPROFILE%\.local\state\opencode\service.json`. Плагин оболочки OpenCode не трогает, с ним работают
  и MCP-мост, и админка.
- Подтверждено через `~/.local/state/another-opencode-for-obsidian/status.json`:
  `serviceState: attached`, `service.url: http://127.0.0.1:28894`, `version: 2.4.1`,
  `projectDirectory: <vault brain>`, событийный поток `/api/event` подключён.
- В палитре команд появились 6 команд плагина: открыть/переключить панель, глубокий режим, копировать
  диагностику, добавить выделение или текущую заметку в контекст запроса.
- Открыть панель можно из палитры команд или горячими клавишами; тема Web UI берётся из Obsidian,
  пути и вики-ссылки из OpenCode открывают существующие заметки.
- Диагностика и логи: `~/.local/state/another-opencode-for-obsidian/status.json` и
  `another-opencode-for-obsidian.log`; копирование диагностики не передаёт текст заметок и пароль сервиса.

Не выбраны: `mtymek/opencode-obsidian` (Bun + `--cors app://obsidian.md` + кастомная команда), `windyboy/opencode-obsidian` (нет явного подтверждения V2).

## Фаза 4 — экспорт сессий (пока не ставить)

`opencode-obsidian-export` в npm имеет последнюю версию **1.1.0** с peer `@opencode-ai/plugin` (V1), хотя README описывает 2.x для V2. Пока не ставить. Если понадобится — написать локальный плагин, который пишет сессии в `<vault>/OpenCode-Logs/` через существующие brain-инструменты.

## Безопасность

- Никаких API-ключей и паролей в заметках и конфиге.
- Локальные порты слушают только `127.0.0.1`.
- Не трогать `egilyad/ai-os-new` и его репозиторий без явного запроса.
