# Второй мозг

Локальная память агента: `C:\Users\deda donik\Desktop\opencode-boost\brain\`.
Публичная «витрина» этой памяти — [этот репозиторий](../README.md).

## Структура

| Путь | Содержание |
| --- | --- |
| `MEMORY.md` | Индекс, правила записи, ссылки на заметки и теги |
| `memory/LONG_TERM.md` | Факты, которые нужно помнить всегда |
| `memory/YYYY-MM-DD.md` | Дневные логи |
| `knowledge/` | Тематические заметки, например `opencode-v2.md` |
| `decisions/` | ADR с контекстом, причинами, альтернативами |
| `projects/` | Карточки проектов |
| `graphs/` | Сгенерированные `.mmd`, `.json`, `.md` |
| `autonomy/` | Цель, прогресс и чекпоинты автопилота |

## Инструменты

- Плагин `brain-tools`: `brain.save({topic,text,long})`, `brain.search({query})`, `brain.index()`.
- CLI: `node scripts/brain.js save ...`, `find ...`, `index`.
- Графы: `graph.memory()`, `graph.project({directory})`, `graph.tree({directory})`, `graph.save({name,mermaid})`.
- Просмотр: `http://127.0.0.1:8787/graph.html`.

## Правила

- Одна идея — одна строка: `- [HH:MM] тема — суть`.
- Факт → `LONG_TERM.md`, событие → дневник, решение → `decisions/`.
- Связи — через `[[wiki-ссылки]]` и теги `#тег`; они попадают в граф памяти.
- Никаких секретов: ключи, пароли, токены не сохраняются.
- Текущий граф памяти: **15 узлов, 41 связь**.
