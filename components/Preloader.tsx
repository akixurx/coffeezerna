'use client'

import { useEffect, useState } from 'react'
import { Playfair_Display } from 'next/font/google'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'

const serif = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const ease = [0.22, 1, 0.36, 1] as const

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2000)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            role="status"
            aria-label="Загрузка Zerna Cafe"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.85, ease }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#1a0a05] px-6 text-[#f5ece2]"
          >
            <div className="w-full max-w-md text-center">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className={`${serif.className} text-[clamp(1.5rem,6vw,3rem)] font-normal leading-tight tracking-[0.2em]`}
              >
                ZERNA{' '}
                <span className="italic text-[#d5b38a]">CAFE</span>
              </motion.p>

              <motion.div
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                className="mx-auto mt-8 h-px w-full max-w-xs origin-left bg-[#d5b38a]"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-6 text-[11px] tracking-[0.25em] text-white/50"
              >
                Specialty Coffee
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}

export default Preloader
