# Плагины

## Установленные и активные

Проверка: `opencode api get /api/plugin` — все четыре в статусе `active`.

| Плагин | Тип | Что даёт |
| --- | --- | --- |
| `@tarquinen/opencode-dcp@latest` (3.2.1) | package | Динамическая очистка контекста: `compress`, дедупликация, purge ошибок. Конфиг `~/.config/opencode/dcp.jsonc` |
| `autopilot-tools` | local | Цель, шаги, чекпоинты, стоп-условия; хуки `context` и `compaction`. См. [автопилот](autonomy.md) |
| `brain-tools` | local | `brain.save / search / index` — работа со вторым мозгом |
| `graph-tools` | local | `graph.project / tree / memory / save` — графы через `graph-core.mjs` |

Локальные плагины лежат в `~/.config/opencode/plugins/<имя>/` и подхватываются автоматически.
Готовый SDK — `@opencode/plugin@2.4.0` в `~/.config/opencode/node_modules`.

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
