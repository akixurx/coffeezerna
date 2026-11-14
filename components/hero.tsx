'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative isolate h-svh min-h-[560px] w-full overflow-hidden bg-[#1a0a05]">
      {/* Плавный зум с задержкой, чтобы начать после прелоадера */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[url('/stakan123.jpg')] bg-cover bg-center bg-no-repeat will-change-transform md:bg-[url('/stakan-pc.jpg')]"
        initial={{ scale: reduceMotion ? 1 : 1.15, y: 0 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 3.5,
          ease,
          delay: 2, // <--- ДОБАВИЛИ ЗАДЕРЖКУ (2 секунды)
        }}
      />

      <h1 className="sr-only">Вдохни свежесть</h1>

      {/* Диагональная композиция: первое слово слева, второе справа. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 flex flex-col justify-between px-5 pb-[26svh] pt-[max(9rem,24svh)] text-white mix-blend-difference md:px-10 md:pb-36 md:pt-8"
      >
        <div className="flex flex-1 flex-col items-stretch justify-between gap-10 md:mt-12 md:gap-0 md:py-8">
          <motion.span
            initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 1.4,
              ease,
              delay: reduceMotion ? 0 : 2.2, // <--- Задержка для текста (2 сек + 0.2)
            }}
            className="block self-start text-left text-[14vw] leading-[0.85] font-black tracking-tighter uppercase md:text-[11vw]"
          >
            Вдохни
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 1.4,
              ease,
              delay: reduceMotion ? 0 : 2.6, // <--- Задержка для текста (2 сек + 0.6)
            }}
            className="ml-auto block self-end text-right text-[14vw] leading-[0.85] font-black tracking-tighter uppercase md:text-[11vw]"
          >
            Свежесть
          </motion.span>
        </div>
      </div>
    </section>
  )
}