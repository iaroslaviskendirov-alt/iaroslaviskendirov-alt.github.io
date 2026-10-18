// Работы для галереи. Скриншоты лежат в public/works/.
export interface Work {
  id: string
  title: string
  kind: string
  desc: string
  image: string
  url?: string // живая версия; без неё работа показывается только в списке, с кнопкой «Код»
  code?: string
  tags: string[]
}

const img = (name: string, ext = 'png') => `${import.meta.env.BASE_URL}works/${name}.${ext}`

export const WORKS: Work[] = [
  {
    id: 'zerno',
    title: 'ZERNO',
    kind: 'Концепт кофейни',
    desc: 'Веер из фото блюд на GSAP, меню с фото и ценами по разделам, галерея интерьеров и бронь стола с выбором времени и зоны.',
    image: img('zerno', 'jpg'),
    url: 'https://iaroslaviskendirov-alt.github.io/zerno/',
    code: 'https://github.com/iaroslaviskendirov-alt/zerno',
    tags: ['GSAP', 'React', 'Mobile first'],
  },
  {
    id: 'horizon',
    title: 'HORIZON',
    kind: 'Концепт иммерсивного планетария',
    desc: 'Живая чёрная дыра на WebGL-шейдере с 5 цветами диска, док в стиле macOS, программа шоу и покупка билетов с расчётом суммы.',
    image: img('horizon', 'jpg'),
    url: 'https://iaroslaviskendirov-alt.github.io/horizon/',
    code: 'https://github.com/iaroslaviskendirov-alt/horizon',
    tags: ['WebGL', 'React', 'framer-motion'],
  },
  {
    id: 'volt',
    title: 'VOLT Arena',
    kind: 'Концепт компьютерного клуба',
    desc: 'Выгода пакетов с калькулятором, FPS в играх для каждой зоны, турнир с отсчётом и бронь в WhatsApp.',
    image: img('volt'),
    url: 'https://iaroslaviskendirov-alt.github.io/volt-arena/',
    code: 'https://github.com/iaroslaviskendirov-alt/volt-arena',
    tags: ['Анимации', 'Калькулятор', 'Mobile first'],
  },
  {
    id: 'plastinka',
    title: 'Пластинка',
    kind: 'Интернет-магазин',
    desc: 'Магазин винила: каталог с фильтрами, корзина, заказы и админ-панель с графиком выручки.',
    image: img('plastinka'),
    url: 'https://plastinka-shop-iaroslav.onrender.com',
    code: 'https://github.com/iaroslaviskendirov-alt/plastinka-shop',
    tags: ['Node.js', 'SQLite', 'REST API'],
  },
  {
    id: 'apex',
    title: 'APEX Racing',
    kind: 'Лендинг',
    desc: 'Промо-сайт тюнинг-студии гиперкаров с эффектным первым экраном.',
    image: img('apex'),
    url: 'https://iaroslaviskendirov-alt.github.io/apex/',
    code: 'https://github.com/iaroslaviskendirov-alt/apex',
    tags: ['Анимации', 'Лендинг'],
  },
  {
    id: 'gdz',
    title: 'Жауап',
    kind: 'Образовательный сайт',
    desc: 'Задания ЕНТ по девяти предметам с проверкой ответа, разбором и пробным тестом.',
    image: img('gdz'),
    url: 'https://iaroslaviskendirov-alt.github.io/gdz/',
    code: 'https://github.com/iaroslaviskendirov-alt/gdz',
    tags: ['KaTeX', 'Тёмная тема'],
  },
  {
    id: 'gamehub',
    title: 'GameHub',
    kind: 'Концепт компьютерного клуба',
    desc: 'Залы, характеристики ПК, цены и онлайн-бронь с заявкой в WhatsApp.',
    image: img('gamehub'),
    url: 'https://iaroslaviskendirov-alt.github.io/gamehub-demo/',
    code: 'https://github.com/iaroslaviskendirov-alt/gamehub-demo',
    tags: ['Бронь', 'Mobile first'],
  },
  {
    id: 'damday',
    title: 'DamDay',
    kind: 'Концепт для кафе',
    desc: 'Онлайн-меню с корзиной: заказ приходит в WhatsApp без комиссии агрегаторов.',
    image: img('damday'),
    url: 'https://iaroslaviskendirov-alt.github.io/damday-demo/',
    code: 'https://github.com/iaroslaviskendirov-alt/damday-demo',
    tags: ['Корзина', 'Mobile first'],
  },
  {
    id: 'trailhead',
    title: 'Trailhead',
    kind: 'Веб-приложение',
    desc: 'Каталог пеших маршрутов: поиск и фильтры, отзывы с рейтингом, добавление маршрутов. REST API с тестами.',
    image: img('trailhead'),
    code: 'https://github.com/iaroslaviskendirov-alt/trailhead',
    tags: ['Node.js', 'Express', 'SQLite', 'Тесты'],
  },
]
