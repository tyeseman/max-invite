"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { ClubIcon as Football, Loader2, CheckCircle, XCircle } from "lucide-react"
import { submitRsvpToSheet } from "@/app/actions/submit-rsvp"

export default function RsvpForm() {
  const [open, setOpen] = useState(false)
  const [attending, setAttending] = useState("yes")
  const [isPending, startTransition] = useTransition()
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean
    success?: boolean
    message?: string
  }>({ submitted: false })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.set("attending", attending)

    startTransition(async () => {
      try {
        const result = await submitRsvpToSheet(formData)

        setFormStatus({
          submitted: true,
          success: result.success,
          message: result.message,
        })

        if (result.success) {
          toast({
            title: "RSVP Submitted",
            description: "Thank you for your response!",
          })

          // Close the dialog after a short delay on success
          setTimeout(() => {
            setOpen(false)
            // Reset form after dialog closes
            setTimeout(() => {
              form.reset()
              setAttending("yes")
              setFormStatus({ submitted: false })
            }, 300)
          }, 2000)
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        setFormStatus({
          submitted: true,
          success: false,
          message: "An unexpected error occurred. Please try again.",
        })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button className="w-full bg-orange-600 text-base font-semibold hover:bg-orange-700 h-12">
            <Football className="mr-2 h-4 w-4" /> RSVP Now
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-400">RSVP to Maxwell's Graduation</DialogTitle>
          <DialogDescription className="text-gray-300">
            Please let us know if you'll be joining us for this special occasion.
          </DialogDescription>
        </DialogHeader>

        {formStatus.submitted && formStatus.success ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-8 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Thank You!</h3>
            <p className="text-gray-300">{formStatus.message}</p>
          </motion.div>
        ) : formStatus.submitted && !formStatus.success ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-8 text-center">
            <div className="flex justify-center mb-4">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Something went wrong</h3>
            <p className="text-gray-300">{formStatus.message}</p>
            <Button
              variant="outline"
              className="mt-4 border-gray-600 text-white hover:bg-gray-700"
              onClick={() => setFormStatus({ submitted: false })}
            >
              Try Again
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="bg-gray-700 border-gray-600 text-white h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-gray-700 border-gray-600 text-white h-10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Will you be attending?</Label>
                <RadioGroup value={attending} onValueChange={setAttending} className="flex gap-4" name="attending">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" className="border-gray-600 text-orange-500" />
                    <Label htmlFor="yes" className="text-gray-300">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" className="border-gray-600 text-orange-500" />
                    <Label htmlFor="no" className="text-gray-300">
                      No
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="maybe" className="border-gray-600 text-orange-500" />
                    <Label htmlFor="maybe" className="text-gray-300">
                      Maybe
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-gray-300">
                  Number of Guests (including yourself)
                </Label>
                <Input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  max="5"
                  defaultValue="1"
                  className="bg-gray-700 border-gray-600 text-white h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300">
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Any special message for Maxwell?"
                  className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 h-12" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit RSVP"
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  )
}
