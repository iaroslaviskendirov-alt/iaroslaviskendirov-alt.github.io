import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { AsciiField } from '@/components/ui/ascii-field'

// Первый экран по мотивам hero-ascii-one: рамки по углам, моно-шрифт, технические подписи.
// Вместо встраиваемой сцены Unicorn Studio (и кода, который прятал их водяной знак) —
// собственный ASCII-фон AsciiField.

interface HeroAsciiProps {
  name?: string
  title?: string
  text?: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  listHref?: string // ссылка «Все работы» в шапке — на список работ ниже
}

const bars = [8, 13, 6, 15, 10, 4, 12, 7] // «эквалайзер» в подвале — фиксированный, без случайности при каждом рендере

export default function HeroAscii({
  name = 'ЯРОСЛАВ',
  title = 'ВИЗУАЛ, КОТОРЫЙ ЦЕПЛЯЕТ',
  text = 'Делаю сайты, которые запоминаются: анимации, интерактив и аккуратная вёрстка под телефон. Ниже — папка с моими работами.',
  primary = { label: 'ОТКРЫТЬ РАБОТЫ', href: '#works' },
  secondary = { label: 'GITHUB', href: 'https://github.com/iaroslaviskendirov-alt' },
  listHref = '#all',
}: HeroAsciiProps) {
  return (
    <header className="relative min-h-svh overflow-hidden bg-black">
      {/* Живой ASCII-фон */}
      <div className="absolute inset-0">
        <AsciiField />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/60 to-transparent lg:via-black/30" />
      </div>

      {/* Верхняя панель */}
      <div className="absolute inset-x-0 top-0 z-20 border-b border-white/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8 lg:py-4">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="-skew-x-12 font-mono text-xl font-bold tracking-widest text-white italic lg:text-2xl">{name}</div>
            <div className="h-3 w-px bg-white/40 lg:h-4" />
            <span className="font-mono text-[9px] text-white/60 lg:text-[10px]">WEB · DESIGN · CODE</span>
          </div>
          <a href={listHref} className="flex items-center gap-1 font-mono text-[10px] text-white/60 transition-colors hover:text-white lg:text-xs">
            ВСЕ РАБОТЫ <ArrowDown className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Рамки по углам */}
      <div className="absolute top-0 left-0 z-20 h-8 w-8 border-t-2 border-l-2 border-white/30 lg:h-12 lg:w-12" />
      <div className="absolute top-0 right-0 z-20 h-8 w-8 border-t-2 border-r-2 border-white/30 lg:h-12 lg:w-12" />
      <div className="absolute bottom-[5vh] left-0 z-20 h-8 w-8 border-b-2 border-l-2 border-white/30 lg:h-12 lg:w-12" />
      <div className="absolute right-0 bottom-[5vh] z-20 h-8 w-8 border-r-2 border-b-2 border-white/30 lg:h-12 lg:w-12" />

      {/* Текст и кнопки */}
      <div className="relative z-10 flex min-h-svh items-end justify-end pb-[18vh] lg:items-center lg:pb-0">
        <div className="w-full px-6 lg:w-1/2 lg:px-16 lg:pr-[8%]">
          <div className="relative max-w-lg lg:ml-auto">
            <div className="mb-3 flex items-center gap-2 opacity-60">
              <div className="h-px w-8 bg-white" />
              <span className="font-mono text-[10px] tracking-wider text-white">∞</span>
              <div className="h-px flex-1 bg-white" />
            </div>

            <div className="relative">
              <div className="dither-pattern absolute top-0 -right-3 bottom-0 hidden w-1 opacity-40 lg:block" />
              <h1 className="mb-4 font-mono text-3xl leading-tight font-bold tracking-[0.08em] text-white lg:text-5xl">{title}</h1>
            </div>

            <div className="mb-4 hidden gap-1 opacity-40 lg:flex">
              {Array.from({ length: 40 }).map((_, i) => <div key={i} className="h-0.5 w-0.5 rounded-full bg-white" />)}
            </div>

            <p className="mb-6 font-mono text-sm leading-relaxed text-gray-300 opacity-90 lg:text-base">{text}</p>

            <div className="flex flex-col gap-3 sm:flex-row lg:gap-4">
              <a href={primary.href} className="group relative inline-flex min-h-11 items-center justify-center gap-2 border border-white bg-white px-6 py-2.5 font-mono text-xs text-black transition-all duration-200 hover:bg-transparent hover:text-white lg:text-sm">
                <span className="absolute -top-1 -left-1 hidden h-2 w-2 border-t border-l border-white opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
                <span className="absolute -right-1 -bottom-1 hidden h-2 w-2 border-r border-b border-white opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
                {primary.label} <ArrowDown className="h-3.5 w-3.5" />
              </a>
              <a href={secondary.href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center justify-center gap-2 border border-white px-6 py-2.5 font-mono text-xs text-white transition-all duration-200 hover:bg-white hover:text-black lg:text-sm">
                {secondary.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-6 hidden items-center gap-2 opacity-40 lg:flex">
              <span className="font-mono text-[9px] text-white">∞</span>
              <div className="h-px flex-1 bg-white" />
              <span className="font-mono text-[9px] text-white">VISUAL.PROTOCOL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя панель */}
      <div className="absolute inset-x-0 bottom-[5vh] z-20 border-t border-white/20 bg-black/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-8 lg:py-3">
          <div className="flex items-center gap-3 font-mono text-[9px] text-white/50 lg:gap-6">
            <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
            <span className="lg:hidden">SYS.ACT</span>
            <div className="hidden items-end gap-1 lg:flex">
              {bars.map((b, i) => <div key={i} className="w-1 bg-white/30" style={{ height: `${b}px` }} />)}
            </div>
            <span>V1.0.0</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[9px] text-white/50 lg:gap-4">
            <span className="hidden lg:inline">◐ RENDERING</span>
            <div className="flex gap-1">
              <div className="h-1 w-1 animate-pulse rounded-full bg-white/60" />
              <div className="h-1 w-1 animate-pulse rounded-full bg-white/40 [animation-delay:.2s]" />
              <div className="h-1 w-1 animate-pulse rounded-full bg-white/20 [animation-delay:.4s]" />
            </div>
            <span className="hidden lg:inline">FRAME: ∞</span>
          </div>
        </div>
      </div>
    </header>
  )
}
