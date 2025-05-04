"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, X, Facebook, Twitter, Send, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface SocialShareButtonsProps {
  title?: string
  description?: string
  hashtags?: string[]
}

export default function SocialShareButtons({
  title = "Maxwell Kotay's Graduation Invitation",
  description = "Join us to celebrate Maxwell's graduation from Rocky River High School!",
  hashtags = ["Graduation2025", "RavensKingdom"],
}: SocialShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Get the current URL (this will work on the client side)
  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href
    }
    return ""
  }

  // Handle native sharing if available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: getShareUrl(),
        })
        toast({
          title: "Shared successfully",
          description: "Thanks for sharing Maxwell's invitation!",
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // If native sharing is not available, open the share menu
      setIsOpen(true)
    }
  }

  // Share on Facebook
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      getShareUrl(),
    )}&quote=${encodeURIComponent(description)}`
    window.open(url, "_blank", "noopener,noreferrer")
    setIsOpen(false)
  }

  // Share on Twitter/X
  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      description,
    )}&url=${encodeURIComponent(getShareUrl())}&hashtags=${hashtags.join(",")}`
    window.open(url, "_blank", "noopener,noreferrer")
    setIsOpen(false)
  }

  // Share on WhatsApp
  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${description} ${getShareUrl()}`)}`
    window.open(url, "_blank", "noopener,noreferrer")
    setIsOpen(false)
  }

  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(getShareUrl())
    setCopied(true)
    toast({
      title: "Link copied",
      description: "Invitation link copied to clipboard!",
    })
    setTimeout(() => setCopied(false), 2000)
    setIsOpen(false)
  }

  return (
    <>
      {/* Main share button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Button
          onClick={handleNativeShare}
          className={`h-14 w-14 rounded-full shadow-lg ${isOpen ? "bg-gray-700" : "bg-orange-600 hover:bg-orange-700"}`}
          aria-label="Share invitation"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Share2 className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Share options menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-30 flex flex-col items-end gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Facebook */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={shareOnFacebook}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* Twitter/X */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={shareOnTwitter}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-black hover:bg-gray-900"
                aria-label="Share on Twitter/X"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={shareOnWhatsApp}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 hover:bg-green-700"
                aria-label="Share on WhatsApp"
              >
                <Send className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* Copy Link */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={copyToClipboard}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 hover:bg-gray-800"
                aria-label="Copy link"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for closing the menu */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-20 bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
