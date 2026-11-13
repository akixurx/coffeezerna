import type { Variants } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1] as const

export const revealViewport = {
  once: true,
  amount: 0.12,
  margin: '0px 0px -32px 0px',
} as const

export function revealVariants(
  reducedMotion: boolean,
  { x = 0, y = 28, scale = 1 } = {},
): Variants {
  return {
    hidden: {
      opacity: 0,
      x: reducedMotion ? 0 : x,
      y: reducedMotion ? 0 : y,
      scale: reducedMotion ? 1 : scale,
    },
    visible: (index: number = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.3 : 0.85,
        delay: reducedMotion ? 0 : Math.min(index, 4) * 0.065,
        ease,
      },
    }),
  }
}

export function staggerVariants(reducedMotion: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0.025 : 0.085,
      },
    },
  }
}
