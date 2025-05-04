"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// This will be replaced with actual photos
const photos = [
  {
    src: "/images/football-1.jpg",
    alt: "Maxwell playing football",
    caption: "Football Championship 2024",
  },
  {
    src: "/images/senior-photo.jpg",
    alt: "Graduation photo",
    caption: "Senior Photo",
  },
  {
    src: "/images/team-victory.jpg",
    alt: "Team celebration",
    caption: "Team Victory",
  },
  {
    src: "/images/academic.jpg",
    alt: "Academic achievement",
    caption: "Academic Excellence",
  },
]

export default function PhotoGallery() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setCurrentPhotoIndex(null)
    document.body.style.overflow = "auto"
  }

  const goToPrevious = () => {
    setCurrentPhotoIndex((prev) => (prev === null ? null : prev === 0 ? photos.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentPhotoIndex((prev) => (prev === null ? null : prev === photos.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-5 text-center font-serif text-xl font-bold text-orange-400">Maxwell's Highlights</h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
          hidden: {},
        }}
        className="grid grid-cols-2 gap-2 md:grid-cols-4"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            variants={{
              visible: { opacity: 1, y: 0, scale: 1 },
              hidden: { opacity: 0, y: 20, scale: 0.9 },
            }}
            transition={{ duration: 0.5 }}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-700"
            onClick={() => openLightbox(index)}
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="absolute bottom-0 left-0 right-0 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-xs font-medium">{photo.caption}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {currentPhotoIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full text-white hover:bg-white/10"
              onClick={closeLightbox}
            >
              <X className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full text-white hover:bg-white/10"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="relative h-[80vh] w-full px-10">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                key={currentPhotoIndex}
                transition={{ type: "spring", damping: 25 }}
                className="h-full w-full relative"
              >
                <Image
                  src={photos[currentPhotoIndex].src || "/placeholder.svg"}
                  alt={photos[currentPhotoIndex].alt}
                  fill
                  className="object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-4 left-0 right-0 bg-black/50 p-3 text-center text-white mx-10 rounded-lg"
              >
                <p className="text-sm font-medium">{photos[currentPhotoIndex].caption}</p>
              </motion.div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full text-white hover:bg-white/10"
              onClick={goToNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
