import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import HeroAscii from '@/components/ui/hero-ascii-one'
import { InteractiveFolderGallery } from '@/components/ui/interactive-folder-gallery'
import { WORKS } from '@/data/works'

const SKILLS = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind', 'Node.js', 'Express', 'SQLite', 'Анимации', 'Mobile first', 'Telegram-боты']

const YEAR = new Date().getFullYear()

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

export default function App() {
  return (
    <div className="grain min-h-svh bg-black font-mono text-white">
      <HeroAscii />

      {/* Бегущая строка навыков */}
      <div className="overflow-hidden border-y border-white/10 py-4" aria-label="Технологии">
        <div className="flex w-max animate-marquee gap-10 pr-10 text-sm text-white/50">
          {[...SKILLS, ...SKILLS].map((s, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">{s}<span className="text-white/20">✦</span></span>
          ))}
        </div>
      </div>

      {/* Папка с работами */}
      <section id="works" className="relative scroll-mt-4 overflow-x-clip px-4 pt-24 pb-16">
        <motion.div {...reveal} className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-3 text-[11px] tracking-[0.3em] text-white/40">01 / РАБОТЫ</div>
          <h2 className="text-3xl font-bold tracking-wide sm:text-4xl">Загляните в папку</h2>
          <p className="mt-3 text-sm text-white/60">Наведите курсор, чтобы фото выглянули, и нажмите, чтобы разложить их. У каждой работы есть живая ссылка.</p>
        </motion.div>
        <InteractiveFolderGallery
          photos={WORKS.filter((w) => w.url).map((w) => ({ id: w.id, image: w.image, title: w.title, caption: w.kind, href: w.url }))}
        />
      </section>

      {/* Список работ */}
      <section id="all" className="mx-auto max-w-6xl scroll-mt-4 px-4 pt-16 pb-24">
        <motion.div {...reveal} className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-3 text-[11px] tracking-[0.3em] text-white/40">02 / ПОДРОБНЕЕ</div>
            <h2 className="text-3xl font-bold tracking-wide sm:text-4xl">Что внутри</h2>
          </div>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WORKS.map((w, i) => (
            <motion.article
              key={w.id}
              {...reveal}
              transition={{ ...reveal.transition, delay: (i % 3) * 0.08 }}
              className="group overflow-hidden border border-white/10 bg-white/[0.03] transition-colors hover:border-white/30"
            >
              <a href={w.url ?? w.code} target="_blank" rel="noopener" className="block aspect-[16/10] overflow-hidden" aria-label={`Открыть ${w.title}`}>
                <img src={w.image} alt={`Скриншот: ${w.title}`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </a>
              <div className="p-5">
                <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase">{w.kind}</div>
                <h3 className="mt-1 text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{w.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {w.tags.map((t) => <span key={t} className="border border-white/10 px-2 py-0.5 text-[10px] text-white/50">{t}</span>)}
                </div>
                <div className="mt-4 flex gap-2">
                  {w.url && (
                    <a href={w.url} target="_blank" rel="noopener" className="inline-flex min-h-10 items-center gap-1.5 bg-white px-3.5 text-xs font-bold text-black transition-opacity hover:opacity-85">
                      Открыть сайт <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {w.code && (
                    <a href={w.code} target="_blank" rel="noopener" className="inline-flex min-h-10 items-center border border-white/20 px-3.5 text-xs text-white/80 transition-colors hover:border-white hover:text-white">
                      Код
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 text-center text-xs text-white/40">
        <div className="mb-3 flex justify-center gap-6">
          <a href="https://github.com/iaroslaviskendirov-alt" target="_blank" rel="noopener" className="hover:text-white">GitHub ↗</a>
        </div>
        © {YEAR} Ярослав
      </footer>
    </div>
  )
}
