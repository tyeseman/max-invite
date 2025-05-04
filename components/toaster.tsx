"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-center"
      toastOptions={{
        className: "bg-gray-800 text-white border border-gray-700",
        duration: 3000,
      }}
    />
  )
}
