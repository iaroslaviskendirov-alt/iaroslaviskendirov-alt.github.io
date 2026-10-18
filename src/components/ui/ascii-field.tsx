import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

// Живой ASCII-фон на canvas: символы складываются в бегущие волны и «пульс»,
// который тянется за курсором. Своя замена встраиваемой сцене Unicorn Studio —
// без внешних скриптов и водяных знаков, работает и на телефоне.

const CHARS = ' .·:-=+*#%@'

interface AsciiFieldProps {
  className?: string
  cell?: number // размер ячейки в px
}

export function AsciiField({ className, cell = 14 }: AsciiFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, cols = 0, rows = 0, raf = 0, last = 0, visible = true
    const pointer = { x: 0.7, y: 0.45, tx: 0.7, ty: 0.45 }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = canvas!.clientWidth
      h = canvas!.clientHeight
      canvas!.width = Math.round(w * dpr)
      canvas!.height = Math.round(h * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.font = `${Math.round(cell * 0.92)}px "JetBrains Mono", monospace`
      ctx!.textAlign = 'center'
      ctx!.textBaseline = 'middle'
      cols = Math.ceil(w / (cell * 0.62))
      rows = Math.ceil(h / cell)
    }

    function draw(t: number) {
      // курсор притягивает «пульс» плавно, а без курсора он медленно гуляет сам
      pointer.x += (pointer.tx - pointer.x) * 0.05
      pointer.y += (pointer.ty - pointer.y) * 0.05
      const time = t / 1000
      ctx!.clearRect(0, 0, w, h)
      const cw = w / cols
      const px = pointer.x * cols, py = pointer.y * rows
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / cols, ny = y / rows
          const dx = (x - px) / cols, dy = (y - py) / rows * 0.6
          const dist = Math.sqrt(dx * dx + dy * dy)
          let v =
            Math.sin(nx * 9 + time * 0.9) * 0.35 +
            Math.sin(ny * 7 - time * 0.7 + nx * 3) * 0.3 +
            Math.sin((nx + ny) * 14 + time * 1.3) * 0.15 +
            Math.cos(dist * 26 - time * 2.4) * Math.max(0, 0.55 - dist * 1.6)
          v = (v + 0.6) / 1.6 // примерно 0..1
          // к краям гасим, чтобы текст справа и рамки читались
          v *= 0.35 + 0.65 * Math.max(0, 1 - Math.abs(nx - 0.32) * 1.5)
          if (v < 0.18) continue
          const idx = Math.min(CHARS.length - 1, Math.floor(v * CHARS.length))
          ctx!.fillStyle = `rgba(255,255,255,${Math.min(0.9, v * 0.85).toFixed(3)})`
          ctx!.fillText(CHARS[idx], x * cw + cw / 2, y * cell + cell / 2)
        }
      }
    }

    function loop(t: number) {
      raf = requestAnimationFrame(loop)
      if (!visible || t - last < 33) return // ~30 кадров в секунду хватает и бережёт батарею
      last = t
      if (!pointerActive) {
        pointer.tx = 0.32 + Math.sin(t / 4200) * 0.18
        pointer.ty = 0.5 + Math.cos(t / 5300) * 0.22
      }
      draw(t)
    }

    let pointerActive = false
    let idleTimer = 0
    function onMove(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect()
      pointer.tx = (e.clientX - r.left) / r.width
      pointer.ty = (e.clientY - r.top) / r.height
      pointerActive = true
      clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => { pointerActive = false }, 2500)
    }

    resize()
    draw(0)
    const ro = new ResizeObserver(() => { resize(); draw(performance.now()) })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)
    if (!reduce) {
      raf = requestAnimationFrame(loop)
      window.addEventListener('pointermove', onMove, { passive: true })
    }
    // шрифт может догрузиться позже — перерисуем
    document.fonts?.ready.then(() => { resize(); draw(performance.now()) })

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(idleTimer)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [cell])

  return <canvas ref={ref} aria-hidden="true" className={cn('block h-full w-full', className)} />
}
