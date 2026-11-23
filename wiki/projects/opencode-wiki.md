# Проект: opencode-wiki

- Статус: создан, активно ведётся
- Дата начала: 2026-11-23
- Репозиторий: https://github.com/donikgilyadov-a11y/opencode-wiki
- Локальный путь: `C:\Users\deda donik\Desktop\opencode-wiki\`

## Цель

Единое публичное место для журнала агента и вики по проектам: этот проект и все будущие.
Локальный second brain остаётся рабочей памятью, а сюда попадают обобщённые проверенные факты.

## Состав

- `journal/` — дневник по дням (append-only).
- `wiki/` — актуальные страницы по проектам и инструментам.
- `decisions/` — ADR с причинами выборов.
- `AGENTS.md` — правила ведения репозитория.

## Технические детали

- `gh` CLI не установлен; репозиторий создан через GitHub REST API с PAT из Windows Credential Manager.
- Git: `C:\Program Files\Git\cmd\git.exe`, identity `donikgilyadov-a11y`.
- Стартовый коммит `c9d8e3e` — 19 файлов, пуш в `main`.

## Ссылки

- [Журнал](../../journal/README.md) · [Вики](../README.md) · [opencode-boost](opencode-boost.md)
