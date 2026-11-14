'use client'

import { motion } from 'framer-motion'
import { Playfair_Display } from 'next/font/google'
import { ArrowDown } from 'lucide-react'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const serif = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate h-svh min-h-[640px] w-full overflow-hidden bg-[#1a0a05]"
    >
      {/* Видео для мобилок (размытие убрано, прозрачность 60%) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover -z-30 opacity-60 md:hidden"
      >
        <source src="/mobilecoffee.mp4" type="video/mp4" />
      </video>

      {/* Видео для ПК (размытие убрано, прозрачность 60%) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full object-cover -z-30 opacity-60 md:block"
      >
        <source src="/pccoffee.mp4" type="video/mp4" />
      </video>

      {/* Затемнение (40% для читаемости текста) */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[#1a0a05]/40" />

      <div className="relative flex h-full flex-col justify-between gap-6 px-4 pb-6 pt-32 text-white sm:px-6 sm:pt-24 md:px-10 md:pb-8">
        <div className="relative z-40 flex items-start justify-between gap-5 text-[9px] uppercase leading-relaxed tracking-widest text-white/60 sm:text-[10px] md:text-xs">
          <p className="max-w-[55%]">EST. 2023 — VELIKY NOVGOROD</p>
          <p className="text-right">СПЕШЕЛТИ КОФЕЙНЯ</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <h1
            id="hero-title"
            className="relative z-40 text-[14vw] font-black uppercase leading-[0.85] tracking-tighter mix-blend-difference md:text-[min(11vw,20svh)]"
          >
            <motion.span
              initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 1.4,
                ease,
                delay: reduceMotion ? 0 : 2.2,
              }}
              className="block"
            >
              Вдохни
            </motion.span>{' '}

            <motion.span
              initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 1.4,
                ease,
                delay: reduceMotion ? 0 : 2.6,
              }}
              className="block"
            >
              Свежесть
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease, delay: reduceMotion ? 0 : 2.9 }}
            className={`${serif.className} relative z-40 mt-5 text-lg leading-relaxed text-white/80 max-[360px]:text-base md:mt-6 md:text-xl`}
          >
            <span className="block whitespace-nowrap">Спешелти-кофе, свежая выпечка</span>{' '}
            <span className="block whitespace-nowrap">и место, где хочется остаться</span>
          </motion.p>

          <motion.a
            href="#menu"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease, delay: reduceMotion ? 0 : 3.1 }}
            className="relative z-40 mt-5 inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-3 text-sm text-white transition-colors duration-300 hover:border-[#d5b38a] hover:bg-[#d5b38a] hover:text-[#1a0a05] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5b38a] motion-reduce:transition-none md:mt-6 md:text-base"
          >
            Посмотреть меню
          </motion.a>
        </div>

        <div className="relative z-40 grid grid-cols-2 items-end gap-x-4 gap-y-3 text-xs leading-relaxed text-white/50 md:grid-cols-[1fr_auto_1fr] md:text-sm">
          <p>Ежедневно с 8:00 до 21:00</p>
          <p className="order-last col-span-2 flex flex-col items-center gap-2 text-center text-[10px] uppercase tracking-widest md:order-none md:col-span-1">
            ЛИСТАЙТЕ ВНИЗ
            <ArrowDown aria-hidden="true" size={16} strokeWidth={1.25} />
          </p>
          <p className="text-right">ул. Большая Московская, 130</p>
        </div>
      </div>
    </section>
  )
}
