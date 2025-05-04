"use client"

// This is a simplified version of the toast hook that matches our dark theme
// The actual implementation would be more complex with Radix UI Toast

import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title: string
  description?: string
}

export function toast({ title, description }: ToastProps) {
  return sonnerToast(title, {
    description,
    className: "bg-gray-800 text-white border border-gray-700",
    position: "bottom-center",
  })
}

function useToast() {
  return {
    toast,
  }
}

export { useToast }
