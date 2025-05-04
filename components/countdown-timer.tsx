"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  targetDate: Date
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
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
      <h3 className="text-center font-serif text-xl font-bold mb-4 text-gray-900">Countdown to Graduation</h3>

      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {/* Days */}
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square bg-orange-600 rounded-lg flex items-center justify-center text-white overflow-hidden">
            <motion.div
              key={timeLeft.days}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute"
            >
              <span className="text-2xl md:text-4xl font-bold">{timeLeft.days}</span>
            </motion.div>
          </div>
          <span className="text-xs md:text-sm mt-1 font-medium text-gray-600">Days</span>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square bg-orange-500 rounded-lg flex items-center justify-center text-white overflow-hidden">
            <motion.div
              key={timeLeft.hours}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute"
            >
              <span className="text-2xl md:text-4xl font-bold">{timeLeft.hours}</span>
            </motion.div>
          </div>
          <span className="text-xs md:text-sm mt-1 font-medium text-gray-600">Hours</span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square bg-orange-400 rounded-lg flex items-center justify-center text-white overflow-hidden">
            <motion.div
              key={timeLeft.minutes}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute"
            >
              <span className="text-2xl md:text-4xl font-bold">{timeLeft.minutes}</span>
            </motion.div>
          </div>
          <span className="text-xs md:text-sm mt-1 font-medium text-gray-600">Minutes</span>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square bg-orange-300 rounded-lg flex items-center justify-center text-white overflow-hidden">
            <motion.div
              key={timeLeft.seconds}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute"
            >
              <span className="text-2xl md:text-4xl font-bold">{timeLeft.seconds}</span>
            </motion.div>
          </div>
          <span className="text-xs md:text-sm mt-1 font-medium text-gray-600">Seconds</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">Join us on May 27, 2025 to celebrate Maxwell's achievement!</p>
      </div>
    </div>
  )
}
