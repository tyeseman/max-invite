"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface FlipCountdownProps {
  targetDate: Date
}

const FlipCard = ({ value, label, color }: { value: number; label: string; color: string }) => {
  const [key, setKey] = useState(0)
  const [displayValue, setDisplayValue] = useState(value)
  const [prevValue, setPrevValue] = useState(value)

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value)
      setKey((prev) => prev + 1)
      setTimeout(() => {
        setDisplayValue(value)
      }, 250) // Half the animation duration
    }
  }, [value, prevValue])

  return (
    <div className="flex flex-col items-center">
      <div className={`relative w-full h-16 md:h-20 ${color} rounded-lg shadow-lg overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Top half static background */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-black/20"></div>

          {/* Flip animation */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={key}
              initial={{ rotateX: -90, position: "absolute" }}
              animate={{ rotateX: 0 }}
              exit={{ rotateX: 90 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ transformOrigin: "bottom center" }}
              className="flex items-center justify-center w-full h-full"
            >
              <span className="text-2xl md:text-3xl font-bold text-white">{value.toString().padStart(2, "0")}</span>
            </motion.div>
          </AnimatePresence>

          {/* Divider line */}
          <div className="absolute left-0 right-0 h-[1px] bg-black/20 top-1/2"></div>
        </div>
      </div>
      <span className="text-xs mt-1 font-medium text-gray-300">{label}</span>
    </div>
  )
}

export default function FlipCountdown({ targetDate }: FlipCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // If the date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!isClient) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-center font-serif text-xl font-bold mb-4 text-orange-400">Countdown to Graduation</h3>

      <div className="grid grid-cols-4 gap-2">
        <FlipCard value={timeLeft.days} label="DAYS" color="bg-orange-600" />
        <FlipCard value={timeLeft.hours} label="HOURS" color="bg-orange-500" />
        <FlipCard value={timeLeft.minutes} label="MINS" color="bg-orange-400" />
        <FlipCard value={timeLeft.seconds} label="SECS" color="bg-orange-300" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center"
      >
        <p className="text-xs text-gray-400">Join us on May 27, 2025 to celebrate Maxwell's achievement!</p>
      </motion.div>
    </div>
  )
}
