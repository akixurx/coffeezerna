'use client'

import { useId } from 'react'
import { Playfair_Display } from 'next/font/google'
import { MotionConfig, motion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import { revealVariants, revealViewport, staggerVariants } from '@/lib/motion-presets'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const serif = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const reviewsUrl =
  'https://yandex.ru/maps/org/zerna/209347374114/reviews/?ll=31.311669%2C58.551980&tab=reviews&z=16.91'

const reviews = [
  {
    name: 'Анастасия',
    date: '28 сентября',
    text: 'Сегодня побывала с мужем в этом замечательном месте! Глаза разбежались от количества вкусностей... Попробовали всё, что попробовали, особенно отметила бургер с беконом: идеальное количество начинки и мягчайшая булочка. Само помещение в чистоте и порядке. Отдельно отмечу персонал: он очаровательный. Вежливый, знающий своё дело, доброжелательный.',
  },
  {
    name: 'Елена',
    date: '25 сентября',
    text: 'Прекрасное кафе для гурманов кофе и разных вкусностей. Как здорово что в нашем микрорайоне есть такое замечательное место! Очень было бы здорово если открыли еще одно по-ближе к выезду, и вкус! Там очень не хватает утром зайти и выпить кружку кофе. Процветание вам ребята, вы молодцы 😊😊',
  },
  {
    name: 'Полина',
    date: '17 сентября',
    text: 'Чудесное место. Потрясающие сотрудники. Очень вкусный кофе и матча. Я не любила голубую матчу пока мне её не приготовили именно в этом месте, полный восторг.',
  },
]

type Review = {
  name: string
  date: string
  text: string
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full min-h-[320px] flex-col bg-transparent">
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#d5b38a] text-lg font-medium text-[#1a0a05]"
        >
          {review.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-medium tracking-tight text-[#f5ece2]">
            {review.name}
          </h3>
          <p className="mt-1 text-xs text-white/45">{review.date}</p>
        </div>
      </header>

      <div className="mb-6 mt-8">
        <div role="img" aria-label="5 из 5 звёзд" className="flex gap-1.5 text-[#d5b38a]/80">
          {Array.from({ length: 5 }, (_, starIndex) => (
            <Star key={starIndex} aria-hidden="true" size={12} fill="currentColor" strokeWidth={1.25} />
          ))}
        </div>
      </div>

      <blockquote className="m-0 flex-1">
        <p className={`${serif.className} line-clamp-4 min-h-32 text-xl font-normal leading-8 tracking-[-0.01em] text-[#f5ece2]`}>
          {review.text}
        </p>
      </blockquote>

      <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
        Яндекс Карты
      </p>
    </article>
  )
}

export function Reviews() {
  const titleId = useId()
  const reduceMotion = useReducedMotion()
  const textReveal = revealVariants(reduceMotion)
  const cardReveal = revealVariants(reduceMotion, { y: 32, scale: 0.985 })

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="reviews"
        aria-labelledby={titleId}
        className="relative isolate z-40 overflow-hidden bg-[#1a0a05] px-6 pb-24 pt-16 font-sans text-white md:px-10 md:pb-32 md:pt-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_50%,rgba(154,96,53,0.12),transparent_70%)] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_65%,transparent)]"
        />

        <div className="mx-auto max-w-6xl">
          <motion.header
            variants={staggerVariants(reduceMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              variants={textReveal}
              className="mb-8 flex items-center justify-center gap-4"
            >
              <span aria-hidden="true" className="h-px w-8 bg-[#d5b38a]/40" />
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#d5b38a]">
                Zerna · тёплые слова
              </p>
              <span aria-hidden="true" className="h-px w-8 bg-[#d5b38a]/40" />
            </motion.div>

            <motion.h2
              id={titleId}
              variants={textReveal}
              className={`${serif.className} text-5xl font-normal leading-[1.1] tracking-[-0.04em] sm:text-7xl lg:text-8xl`}
            >
              Отзывы{' '}
              <span className="italic text-[#e5c9a5]">клиентов</span>
              <span aria-hidden="true" className="text-[#d5b38a]">.</span>
            </motion.h2>

            <motion.p
              variants={textReveal}
              className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/60"
            >
              Самое приятное — знать, что тебе хочется вернуться.
            </motion.p>
          </motion.header>

          <ul className="mt-12 grid list-none p-0 md:mt-16 md:grid-cols-3">
            {reviews.map((review, index) => (
              <motion.li
                key={review.name}
                custom={index}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                className="min-w-0 border-b border-white/10 py-10 first:pt-0 last:border-b-0 last:pb-0 md:border-b-0 md:border-r md:px-7 md:py-2 md:first:pl-0 md:first:pt-2 md:last:border-r-0 md:last:pr-0 md:last:pb-2 lg:px-10"
              >
                <ReviewCard review={review} />
              </motion.li>
            ))}
          </ul>

          <motion.div
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="mt-10 text-center md:mt-14"
          >
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-16 w-full items-center justify-center gap-4 rounded-xl border border-white/70 bg-transparent px-6 py-5 text-sm font-medium leading-6 text-white transition-colors duration-300 hover:border-[#d5b38a] hover:bg-[#d5b38a] hover:text-[#1a0a05] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5b38a] motion-reduce:transition-none sm:w-auto sm:px-8"
            >
              Читать все отзывы на Яндекс Картах
              <ArrowUpRight
                aria-hidden="true"
                size={18}
                strokeWidth={1.5}
                className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              />
            </a>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default Reviews
