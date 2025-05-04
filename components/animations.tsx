"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
)

export const FadeInStagger = ({
  children,
  staggerDelay = 0.1,
  className = "",
}: {
  children: ReactNode
  staggerDelay?: number
  className?: string
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
      hidden: {},
    }}
    className={className}
  >
    {children}
  </motion.div>
)

export const FadeInItem = ({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) => (
  <motion.div
    variants={{
      visible: { opacity: 1, y: 0 },
      hidden: { opacity: 0, y: 15 },
    }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
)

export const ScaleOnHover = ({
  children,
  scale = 1.05,
  className = "",
}: {
  children: ReactNode
  scale?: number
  className?: string
}) => (
  <motion.div whileHover={{ scale }} transition={{ duration: 0.2 }} className={className}>
    {children}
  </motion.div>
)

export const FloatingAnimation = ({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) => (
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={{
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      ease: "easeInOut",
    }}
    className={className}
  >
    {children}
  </motion.div>
)

export const PulseAnimation = ({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) => (
  <motion.div
    animate={{ scale: [1, 1.03, 1] }}
    transition={{
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      ease: "easeInOut",
    }}
    className={className}
  >
    {children}
  </motion.div>
)
