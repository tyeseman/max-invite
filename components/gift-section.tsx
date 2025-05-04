"use client"

import type React from "react"

import { useState } from "react"
import { Gift, Copy, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function GiftSection() {
  const [copied, setCopied] = useState(false)
  const cashAppTag = "MaxwellKotay" // Without the $ prefix for flexibility
  const cashAppDeepLink = `cash://cash.app/$${cashAppTag}`
  const cashAppWebLink = `https://cash.app/$${cashAppTag}`

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent the parent click handler from firing
    navigator.clipboard.writeText(`$${cashAppTag}`)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Cash App tag has been copied!",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const openCashApp = () => {
    // Try to open the Cash App first
    window.location.href = cashAppDeepLink

    // Set a timeout to redirect to the web version if the app doesn't open
    // This is a simple approach - in production you might want to use a more sophisticated method
    setTimeout(() => {
      window.location.href = cashAppWebLink
    }, 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-md rounded-xl bg-gray-700 p-5 shadow-md"
    >
      <motion.div
        className="mb-5 flex items-center justify-center"
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "easeInOut" }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-600">
          <Gift className="h-7 w-7 text-orange-400" />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <h2 className="mb-3 text-center font-serif text-xl font-bold text-orange-400">Send a Gift</h2>

        <p className="mb-5 text-center text-sm text-gray-300">
          Your presence is the greatest gift, but if you'd like to help Maxwell with college expenses, you can send a
          gift via Cash App.
        </p>
      </motion.div>

      <TooltipProvider>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-4 overflow-hidden rounded-lg border border-gray-600 bg-gray-800"
          onClick={openCashApp}
        >
          <div className="flex items-center justify-between p-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium text-white">${cashAppTag}</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} onClick={copyToClipboard}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-gray-300 hover:text-white hover:bg-gray-700"
                    aria-label="Copy Cash App tag"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </motion.div>
      </TooltipProvider>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-4 text-center"
      >
        <p className="text-xs text-gray-400">Tap to open Cash App or click the copy icon to copy the $cashtag</p>
      </motion.div>
    </motion.div>
  )
}
