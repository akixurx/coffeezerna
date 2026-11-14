'use client'

import { useId, useRef } from 'react'
import Image from 'next/image'
import Carousel3D from './Carousel3D' // <--- ДОБАВИЛИ ИМПОРТ КАРУСЕЛИ
import { Playfair_Display } from 'next/font/google'
import {
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight, Bean, Coffee, PawPrint, PlugZap } from 'lucide-react'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { revealVariants, revealViewport, staggerVariants } from '@/lib/motion-presets'

const serif = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const photo =
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=85'

const features = [
  {
    title: 'С собой',
    description: 'Любимый кофе — в ритме твоего дня.',
    icon: Coffee,
  },
  {
    title: 'Собаки',
    description: 'Заходи с теми, кто виляет хвостом.',
    icon: PawPrint,
  },
  {
    title: 'Своя обжарка',
    description: 'Раскрываем характер каждого зерна.',
    icon: Bean,
  },
  {
    title: 'Зарядка',
    description: 'Телефону — заряд. Тебе — пауза.',
    icon: PlugZap,
  },
] as const

export function About() {
  const titleId = useId()
  const photoRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  })
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.12]), {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  })

  const textReveal = revealVariants(reduceMotion, { x: -16, y: 24 })
  const photoReveal = revealVariants(reduceMotion, { x: 24, y: 32, scale: 0.98 })
  const featureReveal = revealVariants(reduceMotion)
  const textSequence = staggerVariants(reduceMotion)

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="about"
        aria-labelledby={titleId}
        className="relative isolate z-20 mt-0 min-h-screen scroll-mt-8 overflow-hidden bg-[#1a0a05] px-6 pb-24 pt-56 font-sans text-white md:px-10 md:pb-32 md:pt-64"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 top-32 -z-10 bg-[radial-gradient(ellipse_at_85%_35%,rgba(154,96,53,0.14),transparent_60%)] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_60%,transparent)]"
        />

        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <motion.div
              variants={textSequence}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
            >
              <motion.div variants={textReveal} className="mb-8 flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-10 bg-[#d5b38a]/60" />
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#d5b38a]">
                  Zerna · о нас
                </p>
              </motion.div>

              <motion.h2
                variants={textReveal}
                id={titleId}
                className={`${serif.className} max-w-xl text-5xl font-normal leading-[1.08] tracking-[-0.04em] sm:text-7xl lg:text-[clamp(3.75rem,5.5vw,5rem)]`}
              >
                Больше, чем{' '}
                <span className="italic text-[#e5c9a5]">просто кофе</span>
                <span aria-hidden="true" className="text-[#d5b38a]">.</span>
              </motion.h2>

              <motion.p variants={textReveal} className="mt-8 max-w-md text-base leading-8 text-white/70 md:mt-10 md:text-lg md:leading-9">
                Zerna — спешелти-кофейня, где за каждой чашкой стоит любовь к
                своему делу. Сами обжариваем зерно, раскрываем его вкус и
                оставляем время для самого приятного — твоей паузы.
              </motion.p>
              <motion.p variants={textReveal} className="mt-5 max-w-md text-sm leading-7 text-white/60">
                Забегай за кофе с собой или оставайся подольше. Мы pet-friendly:
                рады тебе и твоей собаке. А пока ты заряжаешься настроением,
                телефон можно поставить на зарядку.
              </motion.p>

              <motion.div variants={textReveal} className="mt-9 border-l border-[#d5b38a]/40 pl-5 md:mt-10">
                <p className={`${serif.className} text-xl italic leading-relaxed text-[#e5c9a5] sm:text-2xl`}>
                  Хороший кофе. И можно никуда не спешить.
                </p>
              </motion.div>

              <motion.a
                variants={textReveal}
                href="#menu"
                className="group mt-9 inline-flex min-h-11 items-center gap-5 rounded-sm text-sm text-[#e5c9a5] underline decoration-[#d5b38a]/40 underline-offset-8 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#d5b38a] motion-reduce:transition-none"
              >
                Найти свой кофе
                <ArrowUpRight
                  aria-hidden="true"
                  size={18}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                />
              </motion.a>
            </motion.div>

            <motion.figure
              variants={photoReveal}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              className="relative m-0 min-w-0 lg:pt-8"
            >
              <div
                ref={photoRef}
                className="relative isolate aspect-[4/5] overflow-hidden rounded-2xl bg-[#302017] sm:aspect-[5/4] md:rounded-[24px] lg:aspect-[4/5]"
              >
                <motion.div
                  style={{ scale: reduceMotion ? 1 : scale }}
                  className="absolute inset-0"
                >
                  <Image
                    src={photo}
                    alt="Уютный интерьер кофейни с деревянной мебелью и мягким естественным светом"
                    fill
                    unoptimized
                    loading="lazy"
                    sizes="(max-width: 1023px) 100vw, 560px"
                    className="object-cover object-center brightness-90 saturate-[0.75]"
                  />
                </motion.div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0a05]/70 via-transparent to-[#1a0a05]/10"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3 rounded-xl border border-white/15 md:inset-4 md:rounded-2xl"
                />
                <p className={`${serif.className} absolute bottom-8 left-8 right-8 max-w-64 text-3xl italic leading-tight text-[#fff6eb] md:bottom-10 md:left-10 md:text-4xl`}>
                  У каждого дня есть тёплая сторона.
                </p>
              </div>

              <figcaption className="mt-5 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.18em] text-white/50 sm:text-[11px]">
                <span>Место для маленькой паузы</span>
                <span aria-hidden="true" className="flex items-center gap-2 text-[#d5b38a]">
                  <span className="h-px w-6 bg-[#d5b38a]/50" />
                  Zerna
                </span>
              </figcaption>
            </motion.figure>
          </div>

          {/* ВСТАВЛЕННЫЙ БЛОК КАРУСЕЛИ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-24 w-full overflow-hidden"
          >
            <Carousel3D />
          </motion.div>

          <ul
            aria-label="Почему у нас хорошо"
            className="mt-16 grid list-none grid-cols-2 p-0 md:mt-24 lg:grid-cols-4"
          >
            {features.map(({ title, description, icon: Icon }, index) => (
              <motion.li
                key={title}
                custom={index}
                variants={featureReveal}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                className={`group relative border-[#d5b38a]/20 px-4 py-7 odd:border-r sm:px-6 sm:py-9 lg:border-r lg:px-7 lg:last:border-r-0 ${index < 2 ? 'border-b lg:border-b-0' : ''}`}
              >
                <div className="mb-7">
                  <Icon
                    aria-hidden="true"
                    size={26}
                    strokeWidth={1.25}
                    className="text-[#d5b38a] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </div>
                <h3 className={`${serif.className} text-xl font-normal text-[#f5ece2] sm:text-2xl`}>
                  {title}
                </h3>
                <p className="mt-3 max-w-48 text-xs leading-6 text-white/60 sm:text-sm">
                  {description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </MotionConfig>
  )
}

export default About
