import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Галерея-папка: наведи — фото выглядывают веером, нажми — разлетаются.
// Доработки к исходному компоненту: подписи и ссылки на сайты, адаптив под телефон
// (сетка 2×N вместо ряда шириной 800+ px), кнопка «Закрыть» и Esc помимо перетаскивания вниз.

export interface GalleryPhoto {
  id: string | number
  image: string
  title?: string
  caption?: string
  href?: string
}

export interface InteractiveFolderGalleryProps {
  photos: GalleryPhoto[]
  folderName?: string
  dragHintText?: string
  className?: string
}

function useIsMobile(breakpoint = 768) {
  const query = `(max-width: ${breakpoint - 1}px)`
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMobile(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return mobile
}

export function InteractiveFolderGallery({
  photos,
  folderName = 'works.portfolio',
  dragHintText = 'Перетащите фото вниз, чтобы закрыть',
  className,
}: InteractiveFolderGalleryProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false)
  const [hoverFolder, setHoverFolder] = useState(false)
  // До 820 px — компактные карточки в 2 колонки, шире — полноразмерные в 3 колонки (~720 px)
  const mobile = useIsMobile(820)
  const n = photos.length

  // В раскрытом виде фото раскладываются сеткой: 3 колонки на компьютере, 2 — на телефоне.
  const card = mobile ? { w: 150, h: 196 } : { w: 224, h: 288 }
  const gap = mobile ? 16 : 24
  const cols = mobile ? 2 : 3
  const rows = Math.ceil(n / cols)
  const stageHeight = isFolderOpen ? 60 + rows * (card.h + gap) : (mobile ? 400 : 500)

  useEffect(() => {
    if (!isFolderOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isFolderOpen])

  function close() {
    setIsFolderOpen(false)
    setHoverFolder(false)
  }

  return (
    <div className={cn('relative w-full', className)}>
      <motion.div
        className="relative flex w-full flex-col items-center justify-end"
        animate={{ height: stageHeight }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        <div className="pointer-events-none relative z-0 flex h-full w-full max-w-[400px] justify-center">
          {/* задняя стенка папки */}
          <motion.div
            className={cn('absolute bottom-6 drop-shadow-2xl', mobile ? 'h-44 w-64' : 'h-56 w-80')}
            animate={{ opacity: isFolderOpen ? 0 : 1, scale: isFolderOpen ? 0.9 : 1 }}
          >
            <div className="absolute top-0 left-0 h-10 w-32 rounded-t-xl border-t border-r border-l border-white/10 bg-linear-to-t from-[#1e1e1e] to-[#2a2a2a]" />
            <div className="absolute top-8 right-0 bottom-0 left-0 rounded-tr-xl rounded-b-xl border border-white/10 bg-linear-to-b from-[#1e1e1e] to-[#0a0a0a] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
            <div className="pointer-events-none absolute top-10 right-2 bottom-2 left-2 rounded-lg bg-black shadow-inner" />
          </motion.div>

          {/* фотографии */}
          <div className="absolute bottom-10 z-10 flex justify-center">
            {photos.map((photo, i) => {
              const offset = i - (n - 1) / 2
              const stack = {
                y: hoverFolder ? offset * -10 - 40 : offset * -5,
                x: hoverFolder ? offset * 30 : offset * 3,
                rotate: hoverFolder ? offset * 8 : offset * 3,
                scale: 1 - Math.abs(offset) * 0.03,
                zIndex: i + 10,
              }
              // первая работа — слева вверху; строки отсчитываются снизу, потому что фото привязаны к низу сцены
              const col = i % cols, rowFromBottom = rows - 1 - Math.floor(i / cols)
              const open = {
                x: (col - (cols - 1) / 2) * (card.w + gap),
                y: -rowFromBottom * (card.h + gap) + 24,
                rotate: 0, scale: 1, zIndex: 50,
              }

              return (
                <motion.div
                  key={photo.id}
                  drag={isFolderOpen && !mobile}
                  dragSnapToOrigin
                  onDragEnd={(_, info) => { if (info.offset.y > 100 && isFolderOpen) close() }}
                  className={cn(
                    'group absolute bottom-0 origin-bottom overflow-hidden rounded-xl border border-white/20 bg-[#111] shadow-[0_20px_40px_rgba(0,0,0,0.5)]',
                    isFolderOpen ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none',
                  )}
                  style={{ width: card.w, height: card.h }}
                  animate={isFolderOpen ? open : stack}
                  whileHover={isFolderOpen && !mobile ? { scale: 1.04, zIndex: 100 } : {}}
                  whileDrag={isFolderOpen ? { scale: 1.15, rotate: 5, zIndex: 150 } : {}}
                  transition={{ type: 'spring', stiffness: 350, damping: 30, delay: isFolderOpen ? i * 0.03 : 0 }}
                >
                  <img src={photo.image} alt={photo.title ?? ''} className="pointer-events-none h-full w-full object-cover object-top" draggable={false} />
                  {(photo.title || photo.href) && (
                    <div className={cn(
                      'absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-black via-black/70 to-transparent p-3 pt-10 transition-opacity',
                      isFolderOpen ? 'opacity-100' : 'opacity-0',
                    )}>
                      <div className="min-w-0">
                        <div className="truncate font-mono text-xs font-bold text-white sm:text-sm">{photo.title}</div>
                        {photo.caption && <div className="truncate font-mono text-[10px] text-white/60">{photo.caption}</div>}
                      </div>
                      {photo.href && (
                        <a
                          href={photo.href}
                          target="_blank"
                          rel="noopener"
                          onPointerDown={(e) => e.stopPropagation()}
                          className="pointer-events-auto flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110"
                          aria-label={`Открыть сайт ${photo.title ?? ''}`}
                          tabIndex={isFolderOpen ? 0 : -1}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* передняя стенка папки — кнопка открытия */}
          <motion.button
            type="button"
            aria-label={`Открыть папку ${folderName}`}
            className={cn('absolute bottom-0 z-20 cursor-pointer drop-shadow-[0_-20px_40px_rgba(0,0,0,0.8)]', mobile ? 'h-36 w-[280px]' : 'h-44 w-[340px]')}
            style={{ transformOrigin: 'bottom', pointerEvents: isFolderOpen ? 'none' : 'auto' }}
            animate={{ opacity: isFolderOpen ? 0 : 1, rotateX: hoverFolder ? -25 : 0, y: hoverFolder ? 10 : 0 }}
            onMouseEnter={() => setHoverFolder(true)}
            onMouseLeave={() => setHoverFolder(false)}
            onFocus={() => setHoverFolder(true)}
            onBlur={() => setHoverFolder(false)}
            onClick={() => setIsFolderOpen(true)}
          >
            <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-2xl border border-white/20 bg-linear-to-b from-[#2a2a2a] to-[#111] pb-7 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)]">
              <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
              <div className="flex items-center gap-3 rounded-lg border border-black/80 bg-black px-5 py-2.5 shadow-inner">
                <span className="font-mono text-sm tracking-wide text-white/90">{folderName}</span>
                <span className="font-mono text-[10px] text-white/40">{n} шт</span>
              </div>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* подсказка и кнопка закрытия */}
      <motion.div
        className="mt-6 flex flex-col items-center gap-3"
        animate={{ opacity: isFolderOpen ? 1 : 0, y: isFolderOpen ? 0 : 20 }}
        style={{ pointerEvents: isFolderOpen ? 'auto' : 'none' }}
      >
        <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-center font-mono text-[11px] tracking-widest text-white/50 uppercase backdrop-blur-md">
          {mobile ? 'Нажмите ↗, чтобы открыть сайт' : dragHintText}
        </div>
        <button type="button" onClick={close} tabIndex={isFolderOpen ? 0 : -1}
          className="inline-flex min-h-10 items-center gap-2 border border-white/30 px-4 font-mono text-xs text-white/80 transition-colors hover:border-white hover:text-white">
          <X className="h-3.5 w-3.5" /> Закрыть папку
        </button>
      </motion.div>
    </div>
  )
}

export { InteractiveFolderGallery as Component }
