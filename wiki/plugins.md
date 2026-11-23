# Плагины

## Установленные и активные

Проверка: `opencode api get /api/plugin` — все тринадцать в статусе `active`.

| Плагин | Тип | Что даёт |
| --- | --- | --- |
| `@tarquinen/opencode-dcp@latest` (3.2.1) | package | Динамическая очистка контекста: `compress`, дедупликация, purge ошибок. Конфиг `~/.config/opencode/dcp.jsonc` |
| `@mohak34/opencode-notifier@latest` (1.1.3) | package | Звуки и всплывающие уведомления о разрешениях, вопросах, завершении и ошибках. Конфиг `~/.config/opencode/opencode-notifier.json` |
| `opencode-auto-resume@latest` (1.2.9) | package | Автовосстановление зависших сессий, tool-call-as-text, циклов, сабагентов и стриминговых ошибок. id `auto-resume.v2`, команды `/auto-resume off|on|status` |
| `cc-safety-net@latest` (2.8.2) | package | Блокирует опасные shell-команды (`git reset --hard`, `rm -rf`, `curl … \| bash`) и доступ к `.env`/SSH-ключам до запуска инструмента |
| `envsitter-guard@latest` (0.1.1) | package | Запрещает обычным инструментам читать/менять `.env`; даёт 15 безопасных `envsitter_*` без вывода значений |
| `@slkiser/opencode-quota@latest` (6.3.0) | package | Лимиты, расход и цены в TUI/Desktop: `/quota`, `/quota_usage`, `/quota_status`, `/quota_settings` |
| `opencode-v2-ponytail-scoped@latest` (0.1.0) | package | Правила «минимум кода» для выбранных агентов; 6 навыков и 6 команд `ponytail-*`. По умолчанию выключен |
| `autopilot-tools` | local | Цель, шаги, чекпоинты, стоп-условия; хуки `context` и `compaction`. См. [автопилот](autonomy.md) |
| `brain-tools` | local | `brain.save / search / index / tags / links` — работа со вторым мозгом, поиск по тегам и вики-ссылкам |
| `graph-tools` | local | `graph.project / tree / memory / save` — графы через `graph-core.mjs` |
| `computer-tools` | local | `computer.info / windows / activate / screenshot / move / click / type / key / hotkey / scroll`. См. [computer use](computer-use.md) |
| `audit-tools` | local | `audit.quick / audit.repo` — аудит чужих репозиториев только для чтения. См. [репозиторий аудит](repo-audit.md) |
| `session-audit-tools` | local | `sessionaudit.scan / patterns / report` — аудит логов сессий, отчёты в `brain/reports/`. См. [аудит сессий](session-audit.md) |

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

### Авто-восстановление сессий

`opencode-auto-resume` работает тихо: на V2 нет баннера запуска, действия видны только в выводе
серверного процесса. Он не прерывает выполнение инструментов, уважает ESC и не трогает сессию,
ждащую ответа пользователя. Основные пути восстановления: тихий стрим, «инструмент как текст»,
цикл галлюцинаций, мёртвый/застрявший сабагент, обрыв стриминга провайдера.

По умолчанию: таймаут тишины 180 с, `maxRetries: 3`, лимит продолжающих подсказок 9 для онлайн-
и 20 для локальных моделей. Команды `/auto-resume off`, `/auto-resume on`, `/auto-resume status`
временно ставят восстановление на паузу (маркер `~/.config/opencode/auto-resume.paused`).
Если нужны нестандартные параметры, строковую запись в `plugins` надо заменить объектной:

```jsonc
{
  "plugins": [
    { "package": "opencode-auto-resume", "options": { "chunkTimeoutMs": 180000, "maxRetries": 3 } }
  ]
}
```

### Безопасность: cc-safety-net и envsitter-guard

`cc-safety-net` проверяет каждый tool call до выполнения: семантически разбирает команду, поэтому перестановка флагов
или обёртка `bash -c` не помогают. На Windows для PowerShell используется диалект `powershell` по умолчанию.
Важно: плагин проверяет и саму сессию. Если рабочая папка сессии удалена или недоступна, он блокирует **все**
инструменты с ошибкой `cwd.session-unusable` — лечится перезапуском сессии из существующей папки.

`envsitter-guard` закрывает вторую сторону: `.env`, `.env.*`, `*.env` обычные `read/edit/shell/grep` не читают,
а вместо этого доступны `envsitter_keys`, `envsitter_fingerprint`, `envsitter_match`, `envsitter_scan`,
`envsitter_add/set/unset/delete`, `envsitter_validate/copy/format/annotate` и `envsitter_help`. Значения
секретов в выводе других инструментов подменяются на `[envsitter: KEY redacted]`.

### Квоты: @slkiser/opencode-quota

Команды `/quota`, `/quota_usage [range]`, `/quota_status`, `/quota_settings`. В TUI — окно, сайдбар, статусная
строка и тосты; в Desktop — боковая вкладка и виджеты. Отчёт в чате видят только люди, модель его не получает.
Текущая модель `opencode/…` не в прайс-листе, поэтому провайдеры показывают `unavailable` — это не поломка.
Настройки сохраняются в `~/.config/opencode/opencode-quota/settings.jsonc`.

### Минимализм кода: opencode-v2-ponytail-scoped

Порт Ponytail на V2 API с уровнем на **агента**, а не на всю сессию. Файл настроек
`~/.config/opencode/ponytail-scoped.json`: сейчас `{"default":"off","agents":{}}`, то есть правила никуда не
внедряются, пока агент явно не назначен. Команды `/ponytail lite|full|ultra|off`,
`/ponytail-review`, `/ponytail-audit`, `/ponytail-debt`, `/ponytail-gain`, `/ponytail-help`.
Плагин стоит последним в списке `plugins`, чтобы его правила в системном промпте применялись после остальных.

## С конфликтными зависимостями — не ставили

- `oh-my-opencode` — мощный, но тяжёлый харнесс; риск конфликтов с текущим конфигом.
- `@cortexkit/opencode-magic-context`, `@openviking/opencode-plugin`, `@remembrance-ai/opencode-plugin` — внешние сервисы и тяжёлые зависимости.
- `@joe-broadhead/opencode-messaging` — требует `@opencode/plugin >=2.2.5 <2.4.0`, а установлен 2.4.0.
- `@plannotator/opencode` — требует `bun >=1.4.4`, а окружение Node.
- `superpowers-opencode-fork-dev-test`, `superpowers-manager` — первый работает на V1 API (`@opencode-ai/plugin ^1.1.0`), второй требует Node >=24 и является установщиком, а не самим плагином.
- `opencode-rules` — peer только `@opencode-ai/plugin` V1 beta; для V2 есть другие варианты, если понадобится.
- `opencode-mem`, `opencode-rag-plugin` — локальный векторный поиск, но тяжёлые зависимости (onnxruntime, transformers, libsql / sharp, three, pdfjs) и пересечение со вторым мозгом.
- `@npv12/opencode-quota`, `@filecrop/opencode-ponytail-v2`, `opencode-v2-ponytail-scoped` — дубли уже выбранных квот/ponytail; ставим только один вариант.

## Как ставить

```powershell
$cli = "$env:LOCALAPPDATA\Programs\@opencode-aidesktop\resources\opencode-cli.exe"
& $cli plugin add @example/opencode-plugin
& $cli plugin list
& $cli api get /api/plugin
```

`plugin add` добавляет запись в глобальный `opencode.jsonc`, сохраняя остальные настройки.
Перед установкой стоит сделать бэкап конфига.
