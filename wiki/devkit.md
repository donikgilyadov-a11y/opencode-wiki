# OpenCode DevKit

Публичный репозиторий: https://github.com/donikgilyadov-a11y/opencode-devkit
Локальная копия: `~/Desktop/opencode-devkit`. Первый коммит `e4ab6e4` (73 файла).

## Зачем

Все наработки по развитию OpenCode на этом ПК собраны в одном месте и упакованы так, чтобы их можно было перенести на другую машину: навыки, команды, агенты, локальные плагины, админка, скрипты и примеры конфигов. Здесь нет личной памяти, ключей и файлов `service*.json`.

## Состав

| Папка | Содержимое |
| --- | --- |
| `plugins/` | `brain-tools`, `graph-tools`, `autopilot-tools`, `computer-tools`, `audit-tools` |
| `skills/` | 9 навыков: second-brain, opencode-tuner, md-examples, admin-panel, graph, autopilot, computer-use, repo-audit, obsidian |
| `commands/` | 11 глобальных команд |
| `agents/` | `brain-keeper`, `oc-admin` |
| `admin/` | Вторая админка на `127.0.0.1:8787` |
| `scripts/` | Мозг, графы, аудит, oc-check, smoke, Obsidian-прокси и watchdog, 13 тестов |
| `config-examples/` | Примеры `opencode.jsonc`, `cli.json`, уведомлений, DCP, ponytail, INSTRUCTIONS |
| `brain-template/` | Пустая структура второго мозга |

## Установка

```powershell
git clone https://github.com/donikgilyadov-a11y/opencode-devkit.git
cd opencode-devkit
.\install.ps1
```

`install.js` копирует расширения в `~/.config/opencode/` и `~/Desktop/opencode-boost/`, делает резервные копии `.bak-<дата>` и точечно объединяет текущий `opencode.jsonc` с примером: массивы объединяются без дублей, `references`, `mcp.servers`, `permissions` — deep-merge. Пути-плейсхолдеры `%USERPROFILE%` и `<HOME>` заменяются на реальную домашнюю папку. Флаг `-NoConfig` отключает правку конфига; `-Boost` и `-Config` задают другие каталоги.

Подробности — [INSTALL.md в репозитории](https://github.com/donikgilyadov-a11y/opencode-devkit/blob/main/INSTALL.md).

## Пакетные плагины

Ставятся отдельно через `opencode plugin add`: DCP, notifier, auto-resume, cc-safety-net, envsitter-guard, quota, ponytail-scoped. Список — в [плагинах](plugins.md).

## Проверки

- `npm test` — 13 юнит-тестов (в PowerShell: `& 'C:\Program Files\nodejs\npm.cmd' test`).
- `node scripts\smoke-admin.js` — 8 проверок админки.
- `node scripts\oc-check.js --json` — 20 проверок сборки.
- Установщик проверен на временных каталогах: 60 скопированных файлов и корректное слияние конфига.

## Связи

- [Плагины](plugins.md) · [Навыки и команды](skills-commands.md) · [Админка](admin-panel.md) · [Тесты и CI](testing-ci.md) · [Obsidian](obsidian-integration.md)
