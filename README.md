# Портфолио Ярослава

Сайт-витрина: анимированный ASCII-фон на первом экране и 3D-папка, из которой
разлетаются скриншоты работ со ссылками на живые сайты.

**Стек:** React 19, TypeScript, Vite, Tailwind CSS 4, framer-motion, lucide-react.
Структура в стиле shadcn: компоненты в `src/components/ui`, утилиты в `src/lib`, настройки в `components.json`.

## Запуск
```bash
npm install
npm run dev
```
Сайт откроется на `http://localhost:5173/`.

## Компоненты
- `src/components/ui/ascii-field.tsx` — живой ASCII-фон на canvas (реагирует на курсор, ~30 кадров/с,
  ставится на паузу вне экрана, уважает «уменьшение движения»).
- `src/components/ui/hero-ascii-one.tsx` — первый экран: рамки, моно-шрифт, технические подписи.
- `src/components/ui/interactive-folder-gallery.tsx` — папка с фото: веер при наведении, сетка 3×2
  (на телефоне 2×3) при открытии, закрытие перетаскиванием вниз, кнопкой или Esc.

## Как добавить работу
1. Положите скриншот (лучше вертикальный, примерно 780×1000) в `public/works/`.
2. Добавьте объект в `src/data/works.ts`.

## Публикация
При push в `main` GitHub Actions собирает сайт и выкладывает его на GitHub Pages
(`.github/workflows/deploy.yml`): https://iaroslaviskendirov-alt.github.io
