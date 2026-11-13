'use client'

import { Playfair_Display } from 'next/font/google'
import { MotionConfig, motion } from 'framer-motion'
import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react'
import { revealVariants, revealViewport, staggerVariants } from '@/lib/motion-presets'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const serif = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const navigation = [
  { label: 'О нас', href: '#about' },
  { label: 'Меню', href: '#menu' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
] as const

const mapsUrl = 'https://yandex.ru/maps/org/zerna/209347374114/'

export function Footer() {
  const reduceMotion = useReducedMotion()
  const columnReveal = revealVariants(reduceMotion, { y: 16 })

  return (
    <MotionConfig reducedMotion="user">
      <footer className="relative border-t border-white/10 bg-[#1a0a05] px-6 font-sans text-white md:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={staggerVariants(reduceMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="grid gap-12 py-16 md:grid-cols-3 lg:grid-cols-[1.1fr_0.7fr_1.2fr] lg:gap-20"
          >
            <motion.div variants={columnReveal} className="min-w-0">
              <a
                href="#"
                aria-label="Zerna — на начало страницы"
                className={`${serif.className} inline-block rounded-sm text-6xl font-normal leading-none tracking-[-0.05em] transition-colors duration-300 hover:text-[#d5b38a] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#d5b38a] motion-reduce:transition-none sm:text-7xl`}
              >
                Zerna<span aria-hidden="true" className="text-[#d5b38a]">.</span>
              </a>
              <p className="mt-6 max-w-xs text-sm leading-7 text-white/55">
                Спешелти-кофейня в центре Великого Новгорода. Своя обжарка,
                бабл-ти и лучшие круассаны.
              </p>
            </motion.div>

            <motion.nav
              variants={columnReveal}
              aria-label="Навигация в подвале"
              className="min-w-0 md:pt-2"
            >
              <h2 className={`${serif.className} mb-5 text-xs font-medium uppercase tracking-[0.22em] text-[#d5b38a]`}>
                Навигация
              </h2>
              <ul className="m-0 list-none p-0">
                {navigation.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="inline-flex min-h-11 items-center rounded-sm text-sm text-white/55 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5b38a] motion-reduce:transition-none"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>

            <motion.div variants={columnReveal} className="min-w-0 md:pt-2">
              <h2 className={`${serif.className} mb-7 text-xs font-medium uppercase tracking-[0.22em] text-[#d5b38a]`}>
                Контакты
              </h2>
              <ul className="m-0 list-none space-y-4 p-0 text-sm leading-7 text-white/60">
                <li className="flex items-start gap-3">
                  <MapPin aria-hidden="true" size={19} strokeWidth={1.25} className="mt-1 shrink-0 text-[#d5b38a]/80" />
                  <address className="min-w-0 not-italic">
                    Великий Новгород, Большая Московская ул., 130
                  </address>
                </li>
                <li className="flex items-center gap-3">
                  <Phone aria-hidden="true" size={19} strokeWidth={1.25} className="shrink-0 text-[#d5b38a]/80" />
                  <a
                    href="tel:+79082265595"
                    className="inline-flex min-h-11 items-center rounded-sm transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5b38a] motion-reduce:transition-none"
                  >
                    +7 (908) 226-55-95
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock aria-hidden="true" size={19} strokeWidth={1.25} className="mt-1 shrink-0 text-[#d5b38a]/80" />
                  <p>Пн-Вс: 08:00 – 21:00</p>
                </li>
              </ul>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-8 mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-[#d5b38a] decoration-[#d5b38a]/50 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5b38a]"
              >
                Яндекс Карты
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.25} className="shrink-0" />
              </a>
            </motion.div>
          </motion.div>

          <div className="border-t border-white/10 py-7 text-center">
            <p className="text-xs leading-6 text-white/40">
              © 2026 Кофейня Zerna. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </MotionConfig>
  )
}

export default Footer
