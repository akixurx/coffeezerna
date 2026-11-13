'use client'

import { useId } from 'react'
import { Playfair_Display } from 'next/font/google'
import { MotionConfig, motion } from 'framer-motion'
import { Clock, MapPin, Phone } from 'lucide-react'
import { revealVariants, revealViewport, staggerVariants } from '@/lib/motion-presets'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const serif = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const mapUrl =
  'https://yandex.ru/map-widget/v1/?um=constructor%3Aab7736f8ba6f9c2d6759272dbcd57543098094b40d04e602f75aac12b850e9f3&source=constructor'

const socialLinks = [
  { label: 'Telegram', href: '#' },
  { label: 'ВКонтакте', href: '#' },
  { label: 'Отзывы', href: 'https://yandex.ru/maps/org/zerna/209347374114/reviews/' },
] as const

export function Contacts() {
  const titleId = useId()
  const reduceMotion = useReducedMotion()
  const textReveal = revealVariants(reduceMotion, { x: -16, y: 24 })
  const mapReveal = revealVariants(reduceMotion, { x: 24, y: 24, scale: 0.985 })

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="contacts"
        aria-labelledby={titleId}
        className="relative isolate z-40 scroll-mt-8 overflow-hidden bg-[#1a0a05] px-6 pb-24 pt-16 font-sans text-white md:px-10 md:pb-32 md:pt-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_60%,rgba(154,96,53,0.12),transparent_65%)] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_70%,transparent)]"
        />

        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <motion.div
            variants={staggerVariants(reduceMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="min-w-0"
          >
            <motion.div variants={textReveal} className="mb-8 flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-[#d5b38a]/60" />
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#d5b38a]">
                Zerna · на связи
              </p>
            </motion.div>

            <motion.h2
              id={titleId}
              variants={textReveal}
              className={`${serif.className} text-5xl font-normal leading-[1.1] tracking-[-0.04em] sm:text-7xl lg:text-8xl`}
            >
              Контакты
              <span aria-hidden="true" className="text-[#d5b38a]">.</span>
            </motion.h2>

            <motion.ul variants={textReveal} className="mt-10 list-none p-0 md:mt-12">
              <li className="mb-4 flex gap-4 border-b border-white/10 pb-4">
                <MapPin aria-hidden="true" size={22} strokeWidth={1.4} className="mt-1 shrink-0 text-[#d5b38a]" />
                <div className="min-w-0">
                  <p className="mb-2 text-xs text-white/50">Адрес</p>
                  <address className="text-base not-italic leading-7 text-white/85 md:text-lg">
                    Великий Новгород, Большая Московская ул., 130
                  </address>
                </div>
              </li>
              <li className="mb-4 flex gap-4 border-b border-white/10 pb-4">
                <Phone aria-hidden="true" size={22} strokeWidth={1.4} className="mt-1 shrink-0 text-[#d5b38a]" />
                <div className="min-w-0">
                  <p className="mb-2 text-xs text-white/50">Телефон</p>
                  <a
                    href="tel:+79082265595"
                    className="inline-flex min-h-11 items-center rounded-sm text-base leading-7 text-white/85 transition-colors duration-300 hover:text-[#d5b38a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5b38a] motion-reduce:transition-none md:text-lg"
                  >
                    +7 (908) 226-55-95
                  </a>
                </div>
              </li>
              <li className="mb-4 flex gap-4 border-b border-white/10 pb-4">
                <Clock aria-hidden="true" size={22} strokeWidth={1.4} className="mt-1 shrink-0 text-[#d5b38a]" />
                <div className="min-w-0">
                  <p className="mb-2 text-xs text-white/50">Режим работы</p>
                  <p className="text-base leading-7 text-white/85 md:text-lg">
                    Пн-Вс: 08:00 – 21:00
                  </p>
                </div>
              </li>
            </motion.ul>

            <motion.div variants={textReveal} className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href === '#' ? undefined : '_blank'}
                  rel={href === '#' ? undefined : 'noopener noreferrer'}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-6 py-2 text-sm text-white/80 transition-colors duration-300 hover:bg-[#d5b38a] hover:text-[#1a0a05] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5b38a] motion-reduce:transition-none"
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={mapReveal}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="min-h-[400px] min-w-0 overflow-hidden rounded-3xl bg-[#23120c] shadow-[0_16px_48px_-24px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
          >
            <iframe
              src={mapUrl}
              title="Кофейня Zerna на карте — Великий Новгород, Большая Московская ул., 130"
              className="w-full h-[400px] md:h-full min-h-[400px] rounded-3xl border-0"
              style={{ filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
              loading="lazy"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default Contacts
