'use client'

import { useEffect, useId, useRef, useState } from 'react'
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from 'framer-motion'
import { Playfair_Display } from 'next/font/google'
import { menuItems, bestSellers, type MenuItem } from '@/lib/menu-items'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { ease, revealVariants, revealViewport, staggerVariants } from '@/lib/motion-presets'

const serif = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const categories = ['Лучшее', 'Кофе', 'Не кофе', 'Сезонное', 'Бабл-ти', 'Выпечка', 'Дополнительно'] as const

type Category = (typeof categories)[number]

const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

function MenuColumn({
  items,
  variants,
}: {
  items: MenuItem[]
  variants: Variants
}) {
  return (
    <motion.ul className="m-0 list-none space-y-9 p-0 md:space-y-10">
      {items.map((item, index) => (
        <motion.li
          key={`${item.category}-${item.title}`}
          custom={index % 4}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="group"
        >
          <div className="flex items-baseline gap-3">
            <h3
              className={`${serif.className} min-w-0 text-xl font-medium leading-snug text-white transition-colors duration-300 [overflow-wrap:anywhere] group-hover:text-[#e5c9a5] sm:text-2xl`}
            >
              {item.title}
            </h3>

            <span
              aria-hidden="true"
              className="min-w-4 flex-1 border-b border-dotted border-white/25 transition-colors duration-300 group-hover:border-[#d5b38a]/50"
            />

            <p className="shrink-0 whitespace-nowrap text-lg font-medium tabular-nums text-white sm:text-xl">
              {priceFormatter.format(item.price)}
            </p>
          </div>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">
            {item.description}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  )
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('Лучшее')
  const instanceId = useId()
  const reduceMotion = useReducedMotion()
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number | null>(null)
  const listId = `${instanceId}-menu-items`

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      // Ignore the empty frame between exiting and entering categories.
      if (entry.contentRect.height > 0) {
        setContentHeight(entry.contentRect.height)
      }
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const filteredItems =
    activeCategory === 'Лучшее'
      ? bestSellers
      : menuItems.filter((item) => item.category === activeCategory)

  const middle = Math.ceil(filteredItems.length / 2)
  const columns = [
    filteredItems.slice(0, middle),
    filteredItems.slice(middle),
  ]

  const rowVariants = revealVariants(reduceMotion, { y: 22 })
  const headerVariants = staggerVariants(reduceMotion)
  const sectionReveal = revealVariants(reduceMotion)

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="menu"
        aria-labelledby={`${instanceId}-title`}
        className="relative isolate z-30 mt-0 scroll-mt-8 overflow-hidden bg-[#1a0a05] px-6 pb-16 pt-32 font-sans text-white md:px-10 md:pb-24 md:pt-44"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -inset-x-16 -z-10 bg-[radial-gradient(ellipse_at_50%_25%,rgba(154,96,53,0.12),transparent_65%)] [mask-image:linear-gradient(to_bottom,transparent,black_192px,black_60%,transparent)] md:[mask-image:linear-gradient(to_bottom,transparent,black_256px,black_60%,transparent)]"
        />

        <div className="mx-auto max-w-6xl">
          <motion.header
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="mb-12 md:mb-16"
          >
            <motion.div variants={sectionReveal} className="mb-8 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[#d5b38a]/60"
              />

              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#d5b38a]">
                Zerna · кофейня
              </p>
            </motion.div>

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-12">
              <motion.h2
                variants={sectionReveal}
                id={`${instanceId}-title`}
                className={`${serif.className} text-5xl font-normal leading-[1.1] tracking-[-0.04em] sm:text-7xl lg:text-8xl`}
              >
                Наше <span className="font-normal italic">меню</span>
                <span aria-hidden="true" className="text-[#d5b38a]">
                  .
                </span>
              </motion.h2>

              <motion.p variants={sectionReveal} className="max-w-xs text-sm leading-7 text-white/60 md:pb-2">
                Любимый кофе, свежая выпечка
                <br />
                и маленький повод замедлиться.
              </motion.p>
            </div>
          </motion.header>

          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            role="group"
            aria-label="Категории меню"
            className="mb-12 flex gap-7 overflow-x-auto border-b border-[#d5b38a]/20 [scrollbar-width:none] sm:gap-10 md:mb-16 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category

              const count =
                category === 'Лучшее'
                  ? bestSellers.length
                  : menuItems.filter(
                      (item) => item.category === category,
                    ).length

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls={listId}
                  onClick={() => setActiveCategory(category)}
                  className={`relative shrink-0 cursor-pointer rounded-sm px-1 pb-5 pt-3 text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#d5b38a] motion-reduce:transition-none sm:text-base ${
                    isActive
                      ? 'text-white'
                      : 'text-white/55 hover:text-white'
                  }`}
                >
                  {category}

                  <span
                    aria-hidden="true"
                    className="ml-2 align-super text-[10px] text-[#d5b38a]/80"
                  >
                    {String(count).padStart(2, '0')}
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId={`${instanceId}-active-category`}
                      aria-hidden="true"
                      transition={{
                        duration: reduceMotion ? 0 : 0.35,
                        ease,
                      }}
                      className="absolute inset-x-0 bottom-0 h-px bg-[#d5b38a]"
                    />
                  )}
                </button>
              )
            })}
          </motion.div>

          <p role="status" className="sr-only">
            {activeCategory}. Позиций в меню: {filteredItems.length}.
          </p>

          <motion.div
            id={listId}
            initial={false}
            animate={{ height: contentHeight ?? 'auto' }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease }}
            className="relative min-h-[14rem] overflow-hidden md:min-h-[27rem]"
          >
            <div ref={contentRef}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.22, ease }}
                  className="grid gap-y-9 md:grid-cols-2 md:gap-x-20 lg:gap-x-28"
                >
                  {filteredItems.length > 0 ? (
                    columns.map(
                      (items, index) =>
                        items.length > 0 && (
                          <MenuColumn
                            key={index}
                            items={items}
                            variants={rowVariants}
                          />
                        ),
                    )
                  ) : (
                    <motion.p
                      variants={rowVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={revealViewport}
                      className="text-sm text-white/60 md:col-span-2"
                    >
                      В этой категории пока нет позиций.
                    </motion.p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="mt-14 flex flex-col justify-between gap-4 border-t border-[#d5b38a]/20 pt-6 text-[11px] leading-relaxed text-white/50 sm:flex-row sm:items-center md:mt-16"
          >
            <p>Хороший кофе. Неспешные разговоры.</p>

            <p className="flex items-center gap-3 text-[#d5b38a]">
              <span aria-hidden="true">✦</span>
              Готовим с любовью
            </p>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}
