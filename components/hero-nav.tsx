'use client'

import { Playfair_Display } from 'next/font/google'
import { motion } from 'framer-motion'
import { ease } from '@/lib/motion-presets'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const serif = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const links = [
  { label: 'О нас', href: '#about' },
  { label: 'Меню', href: '#menu' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
]

export function HeroNav() {
  const reduceMotion = useReducedMotion()

  return (
    <nav
      aria-label="Основная навигация"
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#1a0a05]/60 px-6 py-3 text-white backdrop-blur-md md:px-10"
    >
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0.3 : 1,
          ease,
          delay: reduceMotion ? 0 : 0.1,
        }}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-x-8 gap-y-1 sm:flex-row"
      >
        <a
          href="#"
          aria-label="Zerna — на начало страницы"
          className={`${serif.className} inline-flex min-h-11 shrink-0 items-center rounded-sm text-3xl font-normal leading-none tracking-[-0.045em] transition-colors duration-300 hover:text-[#d5b38a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5b38a] motion-reduce:transition-none sm:text-4xl`}
        >
          Zerna<span aria-hidden="true" className="text-[#d5b38a]">.</span>
        </a>
        <ul className={`${serif.className} flex items-center gap-4 text-base font-normal sm:gap-7 sm:text-lg md:gap-10`}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative inline-flex min-h-11 items-center rounded-sm text-white/75 transition-colors duration-300 after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#d5b38a] after:transition-transform after:duration-300 hover:text-[#e5c9a5] hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5b38a] focus-visible:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  )
}
