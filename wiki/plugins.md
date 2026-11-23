# Плагины

## Установленные и активные

Проверка: `opencode api get /api/plugin` — все пять в статусе `active`.

| Плагин | Тип | Что даёт |
| --- | --- | --- |
| `@tarquinen/opencode-dcp@latest` (3.2.1) | package | Динамическая очистка контекста: `compress`, дедупликация, purge ошибок. Конфиг `~/.config/opencode/dcp.jsonc` |
| `@mohak34/opencode-notifier@latest` (1.1.3) | package | Звуки и всплывающие уведомления о разрешениях, вопросах, завершении и ошибках. Конфиг `~/.config/opencode/opencode-notifier.json` |
| `autopilot-tools` | local | Цель, шаги, чекпоинты, стоп-условия; хуки `context` и `compaction`. См. [автопилот](autonomy.md) |
| `brain-tools` | local | `brain.save / search / index` — работа со вторым мозгом |
| `graph-tools` | local | `graph.project / tree / memory / save` — графы через `graph-core.mjs` |

Локальные плагины лежат в `~/.config/opencode/plugins/<имя>/` и подхватываются автоматически.
Готовый SDK — `@opencode/plugin@2.4.0` в `~/.config/opencode/node_modules`.

### Уведомления

`~/.config/opencode/cli.json` отключает встроенные alerts (`attention.notifications`, `attention.sound`,
`plugins: ["*", "-opencode.notifications"]`), чтобы не дублировать нотификатор. Настройки самого
плагина — `~/.config/opencode/opencode-notifier.json`: звук и поп-апы включены, колокольчик выключен,
`suppressWhenFocused: true`, `minDuration: 10`, события `permission/question/complete/error` включены,
остальные выключены, сообщения на русском.

Звуки и поп-апы приходят в **интерактивном терминальном клиенте**. Desktop, Web и `opencode run`
команды плагина выполняют, но сами уведомления не показывают. На Windows свои звуки — только `.wav`
по полному пути; Focus Assist может скрыть тосты; `OPENCODE_NOTIFIER_DEBUG=1` пишет лог в stderr.
Чтобы проверить: вызвать разрешение или вопрос, переключить фокус на другое окно.

## С конфликтными зависимостями — не ставили

- `oh-my-opencode` — мощный, но тяжёлый харнесс; риск конфликтов с текущим конфигом.
- `@cortexkit/opencode-magic-context`, `@openviking/opencode-plugin`, `@remembrance-ai/opencode-plugin` — внешние сервисы и тяжёлые зависимости.
- `@joe-broadhead/opencode-messaging` — требует `@opencode/plugin >=2.2.5 <2.4.0`, а установлен 2.4.0.

## Как ставить

```powershell
$cli = "$env:LOCALAPPDATA\Programs\@opencode-aidesktop\resources\opencode-cli.exe"
& $cli plugin add @example/opencode-plugin
& $cli plugin list
& $cli api get /api/plugin
```

`plugin add` добавляет запись в глобальный `opencode.jsonc`, сохраняя остальные настройки.
Перед установкой стоит сделать бэкап конфига.
