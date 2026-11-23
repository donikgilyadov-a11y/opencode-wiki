# 0004 — Интеграция Obsidian с OpenCode

## Контекст

Пользователь (Евгений) планирует поставить Obsidian на этом ПК и развивать среду вокруг OpenCode.
Второй мозг уже хранится в Markdown с вики-ссылками и тегами — это родной формат Obsidian.
Нужно выбрать безопасный путь, не затрагивая основной репозиторий `egilyad/ai-os-new`.

## Решение

1. **Vault без плагинов:** открыть `C:\Users\deda donik\Desktop\opencode-boost\brain` как хранилище Obsidian.
2. **Живой мост:** поставить `obsidian-local-rest-api` 5.5.2 и подключить его встроенный MCP к OpenCode как remote-сервер `obsidian` (`oauth: false`, ключ только в `OBSIDIAN_API_KEY`), не открывая доступ к `.obsidian/`.
3. **OpenCode внутри Obsidian (выполнено):** `jensenojs/another-opencode-for-obsidian` v0.6.0 — только V2 API, подключается к уже запущенному сервису. Установлен во vault `brain`, `serviceState=attached`, OpenCode 2.3.2, 6 команд в палитре Obsidian.
4. **Экспорт сессий:** не ставить `opencode-obsidian-export` из npm (последняя опубликованная версия 1.1.0 с peer V1); при необходимости написать локальный плагин.

Подробности: [интеграция Obsidian](../wiki/obsidian-integration.md).

## Причины

- Файлы мозга уже совместимы с Obsidian: вики-ссылки, теги, дневники.
- Local REST API — поддерживаемый плагин со встроенным MCP и полным набором инструментов для vault.
- V2 MCP поддерживает remote Streamable HTTP и подстановку `{env:...}`, поэтому ключ не лежит в конфиге.
- `another-opencode-for-obsidian` v0.6.0 явно работает с V2 и не управляет жизненным циклом сервиса.

## Альтернативы

- `mtymek/opencode-obsidian` — Bun, `--cors app://obsidian.md`, кастомная команда и путь к CLI на Windows.
- `windyboy/opencode-obsidian` — нет явного подтверждения совместимости с V2.
- Внешние Obsidian MCP-серверы — уступают встроенному MCP в Local REST API.

## Последствия

- Obsidian создаст `.obsidian/` внутри `brain/`; генераторы графов пропускают скрытые папки.
- Локальные порты 27123/27124 открываются только на `127.0.0.1`; ключ не должен попадать в заметки.
- Реальная установка зависит от пользователя: нужен vault и API-ключ из настроек плагина.
