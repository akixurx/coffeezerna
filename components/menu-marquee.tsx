'use client'

import { useId, useState } from 'react'
import { motion } from 'framer-motion'
// Импортируем menuCards (8 карточек с фото) и тип MenuCardItem
import { menuCards, type MenuCardItem } from '@/lib/menu-items'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { ease, revealVariants, revealViewport } from '@/lib/motion-presets'

function MenuCard({
  item,
  index,
}: {
  item: MenuCardItem
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const descriptionId = useId()
  const reduceMotion = useReducedMotion()
  const open = hovered || expanded

  return (
    <motion.li
      custom={index % 4}
      variants={revealVariants(reduceMotion, { y: 36, scale: 0.98 })}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      className="relative min-w-0"
    >
      <article
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') {
            setHovered(true)
          }
        }}
        onPointerLeave={() => setHovered(false)}
        className="
          relative h-[300px] overflow-hidden
          rounded-2xl bg-[#0b0908]
          min-[400px]:h-[330px]
          sm:h-[360px]
          md:rounded-[24px]
          lg:h-[320px]
        "
      >
        <motion.img
          src={item.image || '/placeholder.svg'}
          alt={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
          initial={false}
          animate={{
            scale: open && !reduceMotion ? 1.045 : 1,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            ease,
          }}
          className="
            pointer-events-none absolute inset-0
            size-full select-none object-cover
          "
        />

        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: open ? 0.15 : 0.05 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          className="pointer-events-none absolute inset-0 bg-black"
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t
            from-black via-black/35 to-black/10
          "
        />

        {/* Привязка к низу сохраняет одинаковое положение цен */}
        <div
          className="
            absolute inset-x-0 bottom-0 z-10
            p-3 min-[400px]:p-4
            lg:p-4 xl:p-5
          "
        >
          <span
            className="
              mb-2.5 inline-flex rounded-md
              border border-[#C87941]/35
              bg-black/25 px-2 py-1
              text-[8px] font-bold uppercase
              leading-none tracking-[0.1em] text-[#C87941]
              sm:mb-3 sm:px-2.5 sm:py-1.5 sm:text-[9px]
              lg:rounded-lg xl:text-[10px]
            "
          >
            {item.category}
          </span>

          {/* Одинаковое место под название — до двух строк */}
          <h3
            className="
              min-h-[2.24em] break-words
              text-[14px] font-black uppercase
              leading-[1.12] tracking-[-0.025em] text-white
              min-[400px]:text-base
              sm:text-[17px]
              lg:text-base
              xl:text-lg
            "
          >
            {item.title}
          </h3>

          <motion.div
            id={descriptionId}
            aria-hidden={!open}
            initial={false}
            animate={{
              height: open ? 'auto' : 0,
              opacity: open ? 1 : 0,
            }}
            transition={{
              height: {
                duration: reduceMotion ? 0 : 0.45,
                ease,
              },
              opacity: {
                duration: reduceMotion ? 0 : 0.3,
                delay: open && !reduceMotion ? 0.1 : 0,
              },
            }}
            className="overflow-hidden"
          >
            <p
              className="
                max-h-28 overflow-y-auto overscroll-contain
                pt-2 text-[11px] leading-relaxed text-white/55
                min-[400px]:text-xs
                lg:pt-3 lg:text-sm
              "
            >
              {item.description}
            </p>
          </motion.div>

          <div
            className="
              mt-3 flex items-center justify-between gap-1.5
              border-t border-white/10 pt-3
              sm:mt-4
              lg:mt-4 lg:gap-3
            "
          >
            <p
              className="
                whitespace-nowrap text-sm font-black
                leading-none tabular-nums text-white
                min-[400px]:text-base
                lg:text-lg
              "
            >
              {item.price.toLocaleString('ru-RU')}&nbsp;₽
            </p>

            <motion.button
              type="button"
              aria-label={`${
                open ? 'Скрыть' : 'Показать'
              } описание: ${item.title}`}
              aria-controls={descriptionId}
              aria-expanded={open}
              disabled={!item.description}
              onClick={() => {
                if (open) {
                  setExpanded(false)
                  setHovered(false)
                } else {
                  setExpanded(true)
                }
              }}
              onFocus={(event) => {
                if (event.currentTarget.matches(':focus-visible')) {
                  setExpanded(true)
                }
              }}
              onBlur={() => setExpanded(false)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setExpanded(false)
                  setHovered(false)
                }
              }}
              initial={false}
              animate={{
                backgroundColor: open ? '#C87941' : '#00000000',
                borderColor: open ? '#C87941' : '#ffffff1a',
                color: open ? '#1a0a05' : '#ffffff80',
              }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              className="
                flex size-11 shrink-0
                items-center justify-center
                rounded-[10px] border outline-none
                focus-visible:ring-2
                focus-visible:ring-[#C87941]
                focus-visible:ring-offset-4
                focus-visible:ring-offset-black
                disabled:cursor-default
              "
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </motion.button>
          </div>
        </div>
      </article>
    </motion.li>
  )
}

export function MenuMarquee() {
  return (
    <section
      aria-label="Наше меню"
      className="
        relative isolate z-30 -mt-16
        bg-gradient-to-b from-transparent via-[#1a0a05] via-[64px] to-[#1a0a05]
        px-2 pb-8 pt-24
        min-[400px]:px-3
        sm:px-5 sm:pb-12
        md:-mt-24 md:via-[96px] md:px-10 md:pt-36
        lg:pb-20
      "
    >
      <ul
        className="
          mx-auto grid w-full max-w-6xl
          list-none grid-cols-2 gap-1 p-0
          sm:grid-cols-3 sm:gap-1.5
          lg:grid-cols-4 lg:gap-4
        "
      >
        {/* Теперь перебираем ровно 8 карточек */}
        {menuCards.map((item, index) => (
          <MenuCard
            key={item.title}
            item={item}
            index={index}
          />
        ))}
      </ul>
    </section>
  )
}
