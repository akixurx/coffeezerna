'use client'

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

export type Photo = {
  src: string
  title: string
  caption: string
}

// Я заменил ссылки на картинки на твои локальные фото из папки public/menu
export const PHOTOS: Photo[] = [
  { src: '/menu/latte.jpg', title: 'The Front Room', caption: 'Morning light, worn wood' },
  { src: '/menu/kapuch.jpg', title: 'First Pour', caption: 'A cup worth slowing down for' },
  { src: '/menu/cruas.jpg', title: 'Behind the Bar', caption: 'Our barista at the grinder' },
  { src: '/menu/kakao.jpg', title: 'Latte Art', caption: 'Steamed, poured, by hand' },
  { src: '/menu/bubtea.jpg', title: 'The Counter', caption: 'Where the regulars gather' },
  { src: '/menu/americano.jpg', title: 'Slow Sunday', caption: 'Nothing to do but sip' },
]

const AUTO_SPEED = 9 // degrees per second
const DRAG_SENSITIVITY = 0.35

type CardSize = {
  cardWidth: number
  cardHeight: number
  radius: number
}

function useCardSize(count: number): CardSize {
  const [width, setWidth] = useState(1024)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const cardWidth = Math.round(Math.min(240, Math.max(140, width * 0.22)))
  const cardHeight = Math.round(cardWidth * 1.45)
  const gap = cardWidth * 0.28
  const radius = Math.round((cardWidth + gap) / 2 / Math.tan(Math.PI / count))
  return { cardWidth, cardHeight, radius }
}

type CarouselCardProps = {
  photo: Photo
  baseAngle: number
  rotation: MotionValue<number>
  size: CardSize
}

function CarouselCard({ photo, baseAngle, rotation, size }: CarouselCardProps) {
  const facing = useTransform(rotation, (r) => (Math.cos(((baseAngle + r) * Math.PI) / 180) + 1) / 2)
  const scale = useTransform(facing, [0, 1], [0.72, 1])
  const opacity = useTransform(facing, [0, 1], [0.3, 1])
  const shade = useTransform(facing, [0, 1], [0.65, 0])
  const captionOpacity = useTransform(facing, [0.85, 1], [0, 1])

  return (
    <div
      className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
      style={{
        width: size.cardWidth,
        height: size.cardHeight,
        marginLeft: -size.cardWidth / 2,
        marginTop: -size.cardHeight / 2,
        transform: `rotateY(${baseAngle}deg) translateZ(${size.radius}px)`,
      }}
    >
      <motion.figure
        className="relative h-full w-full overflow-hidden rounded-3xl bg-black/40 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
        style={{ scale, opacity }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src || '/placeholder.svg'}
          alt={`${photo.title} — ${photo.caption}`}
          draggable={false}
          className="h-full w-full select-none object-cover"
        />
        {/* Заменили цвета на твои (espresso и crema) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0a05]/90 via-[#1a0a05]/10 to-transparent" />
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
        <motion.figcaption className="absolute inset-x-0 bottom-0 p-4" style={{ opacity: captionOpacity }}>
          <p className="text-lg font-medium leading-tight text-white">{photo.title}</p>
          <p className="mt-0.5 text-xs text-white/70">{photo.caption}</p>
        </motion.figcaption>
      </motion.figure>
    </div>
  )
}

export default function Carousel3D({ photos = PHOTOS }: { photos?: Photo[] }) {
  const step = 360 / photos.length
  const size = useCardSize(photos.length)
  const target = useMotionValue(0)
  const rotation = useSpring(target, { stiffness: 90, damping: 22, mass: 0.6 })

  const activePointerId = useRef<number | null>(null)
  const lastX = useRef(0)
  const reducedMotion = useReducedMotion()

  useAnimationFrame((_, delta) => {
    if (activePointerId.current !== null || reducedMotion) return
    target.set(target.get() - (AUTO_SPEED * delta) / 1000)
  })

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerId !== activePointerId.current) return
    target.set(target.get() + (event.clientX - lastX.current) * DRAG_SENSITIVITY)
    lastX.current = event.clientX
  }

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (!event.isPrimary || event.button !== 0 || activePointerId.current !== null) return
    activePointerId.current = event.pointerId
    lastX.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const endDrag = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerId !== activePointerId.current) return
    activePointerId.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const snapTo = (direction: 1 | -1) => {
    const snapped = Math.round(target.get() / step) * step
    target.set(snapped + direction * step)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      snapTo(1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      snapTo(-1)
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Coffee shop photo gallery"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onLostPointerCapture={endDrag}
      className="relative w-full cursor-grab touch-pan-y select-none rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-[#d5b38a]/60 active:cursor-grabbing"
      style={{ height: size.cardHeight + 90, perspective: '1200px', perspectiveOrigin: '50% 45%' }}
    >
      <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ rotateY: rotation }}>
        {photos.map((photo, i) => (
          <CarouselCard key={photo.src} photo={photo} baseAngle={i * step} rotation={rotation} size={size} />
        ))}
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-1/2 h-10 -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(213,179,138,0.22),transparent_70%)]"
        style={{ width: size.radius * 2 }}
      />
    </section>
  )
}
